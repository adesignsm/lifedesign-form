import { useEffect } from "react";
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

  const generateLdNumber = () => {
    const db_ref = ref(getDatabase());

    get(child(db_ref, "users/")).then((snapshot) => {
      if (snapshot.exists()) {
        const dataSnapshot = snapshot.val();
        let isUnique = false;
        let generatedLdNumber;
        let generatedLdNumberStr;

        while (!isUnique) {
          generatedLdNumber =
            Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
          generatedLdNumberStr = generatedLdNumber.toString();
          isUnique = true;

          for (const data in dataSnapshot) {
            if (generatedLdNumberStr === data) {
              console.log(
                "Invalid number already exists:",
                generatedLdNumberStr
              );
              isUnique = false;
              break;
            }
          }
        }

        context.setLdNumber(generatedLdNumberStr);
        context.setPromptStep(1);
      }
    });
  };

  const writeToFirebase = (_formData) => {
    const db = getDatabase();

    set(ref(db, "users/" + _formData["ld_number"]), {
      _formData,
    });
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
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              {...register(input.name)}
              required
            />
          </div>
        );
      case "select":
        return (
          <div key={input.name}>
            <label>{input.label}</label>
            <select name={input.name} {...register(input.name)} required>
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

  useEffect(() => {
    generateLdNumber();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    context.setPromptStep((prevStep) => prevStep + 1);

    if (context.promptStep >= 8) {
      data.ld_number = context.ldNumber;
      writeToFirebase(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formConfig.inputs
          .filter((input) => input.step === context.promptStep)
          .map((input) => renderInput(input))}
        {context.promptStep != 9 && <button type="submit">Submit</button>}
      </form>
    </>
  );
};
