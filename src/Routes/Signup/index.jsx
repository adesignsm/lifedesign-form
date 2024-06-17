import { useAppContext } from "../../context";
import { Prompts } from "../../Components/Prompts";
import ConfettiExplosion from "react-confetti-explosion";

import VOLCANO from "../../Assets/Media/volcano.png";
import "./index.css";

export const Signup = () => {
  const { context } = useAppContext();

  return (
    <>
      <div className="signup-container">
        {context.ldNumber && (
          <ConfettiExplosion
            zIndex={9}
            height={"100vh"}
            particleCount={200}
            color={["#E56831", "FFF798", "#BBE8F2", "#284877"]}
          />
        )}
        {context.promptStep !== 9 && (
          <h1 className="prompt-counter">{context.promptStep} / 8</h1>
        )}
        <img className="volcano-bg" src={VOLCANO} />
        {context.ldNumber !== null ? (
          <div className="congrats-container">
            <h1>
              Congratulations LD <span>#{context.ldNumber}</span>
            </h1>
            <h3>welcome to the team!</h3>
          </div>
        ) : (
          <Prompts
            promptStep={context.promptStep}
            setPromptStep={context.setPromptStep}
          />
        )}
      </div>
    </>
  );
};
