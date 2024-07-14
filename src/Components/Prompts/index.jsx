import { useEffect, useState } from "react";
import firebaseClient from "../../firebaseClient";
import { initializeApp } from "firebase/app";
import { get, getDatabase, set, child, ref } from "firebase/database";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../context";

import formConfig from "../../formConfig.json";
import "./index.css";

const app = initializeApp(firebaseClient);

export const Prompts = () => {
  const { context } = useAppContext();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [animate, setAnimate] = useState(true);
  const [showLDButton, setShowLDButton] = useState(false);
  const [generatedLdNumber, setGeneratedLdNumber] = useState(null);

  const validateLdNumber = async (ld_number) => {
    const db_ref = ref(getDatabase());
    const snapshot = await get(child(db_ref, "users/"));

    if (snapshot.exists()) {
      const dataSnapshot = snapshot.val();
      const validatedLdNumberStr = ld_number.toString();

      for (const data in dataSnapshot) {
        if (validatedLdNumberStr === data) {
          if (!showLDButton && !generatedLdNumber) {
            alert("Number taken already");
          }
          setShowLDButton(true);
          return false;
        }
      }
      return true;
    }
    return false;
  };

  const generateUniqueLdNumber = async () => {
    let isUnique = false;
    let newLdNumber;

    while (!isUnique) {
      newLdNumber = Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
      isUnique = await validateLdNumber(newLdNumber);
    }

    return newLdNumber;
  };

  const handleGenerateLdNumber = async () => {
    const newLdNumber = await generateUniqueLdNumber();
    setGeneratedLdNumber(newLdNumber);
    setValue("ld_number", newLdNumber);

    const formData = getValues();
    formData.ld_number = newLdNumber;

    writeToFirebase(formData);
    context.setPromptStep((prevStep) => prevStep + 1);
    context.setLdNumber(newLdNumber);
  };

  const writeToFirebase = (_formData) => {
    const db = getDatabase();

    set(ref(db, "users/" + _formData["ld_number"]), {
      _formData,
    });
  };

  const onSubmit = async (data) => {
    if (context.promptStep === 8) {
      const valid = await validateLdNumber(data.ld_number);

      if (valid) {
        writeToFirebase(data);
        context.setPromptStep((prevStep) => prevStep + 1);
        context.setLdNumber(data.ld_number);
      } else {
        context.setPromptStep(8);
        document.getElementById("type-input").value = "";
      }
    } else {
      context.setPromptStep((prevStep) => prevStep + 1);
      setAnimate(false);

      setTimeout(() => {
        setAnimate(true);
      }, 100);
    }
  };

  const renderInput = (input) => {
    switch (input.type) {
      case "text":
      case "date":
      case "email":
      case "number":
        return (
          <div key={input.name}>
            <label>{input.label}</label>
            <input
              id="type-input"
              type={input.type}
              name={input.name}
              placeholder={
                input.name === "ld_number" && showLDButton && generatedLdNumber
                  ? generatedLdNumber
                  : input.placeholder
              }
              {...register(input.name, {
                required: input.name === "ld_number" ? true : false,
                pattern: input.name === "ld_number" ? /^[0-9]*$/ : undefined,
              })}
            />
          </div>
        );
      case "select":
        return (
          <div key={input.name}>
            <label>{input.label}</label>
            <select
              id="select-input"
              name={input.name}
              {...register(input.name)}
              //   required
            >
              {input.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form
        id="input-form"
        className={`${animate === true ? "animate" : "revert"}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {formConfig.inputs
          .filter((input) => input.step === context.promptStep)
          .map((input) => renderInput(input))}
        {context.promptStep != 9 && !showLDButton && (
          <button type="submit">Next</button>
        )}
        {showLDButton && (
          <button
            type="button"
            className="ld-number-generator"
            onClick={handleGenerateLdNumber}
          >
            TAKE NEXT AVAiLABLE NUMBER
          </button>
        )}
      </form>
    </>
  );
};
