import { useAppContext } from "../../context";
import { Prompts } from "../../Components/Prompts";

import VOLCANO from "../../Assets/Media/volcano.jpg";
import "./index.css";

export const Signup = () => {
  const { context } = useAppContext();

  return (
    <>
      <div className="signup-container">
        <img className="volcano-bg" src={VOLCANO} />
        <h1>Welcome LD#{context.ldNumber}</h1>
        <Prompts
          promptStep={context.promptStep}
          setPromptStep={context.setPromptStep}
        />
      </div>
    </>
  );
};
