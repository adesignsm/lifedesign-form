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
  const { register, handleSubmit } = useForm();
  const [animate, setAnimate] = useState(true);

  const validateLdNumber = async (ld_number) => {
    const db_ref = ref(getDatabase());
    const snapshot = await get(child(db_ref, "users/"));

    if (snapshot.exists()) {
      const dataSnapshot = snapshot.val();
      const validatedLdNumberStr = ld_number.toString();

      for (const data in dataSnapshot) {
        if (validatedLdNumberStr === data) {
          alert("Number taken already");
          return false;
        }
      }
      return true;
    }
    return false;
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
        return (
          <div key={input.name}>
            <label>{input.label}</label>
            <input
              id="type-input"
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              {...register(input.name)}
              required={input.name === "ld_number" ? true : false}
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
        {context.promptStep != 9 && <button type="submit">Next</button>}
      </form>
    </>
  );
};
