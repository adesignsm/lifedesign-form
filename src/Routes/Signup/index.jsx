import { useRef } from "react";
import { useAppContext } from "../../context";
import { Prompts } from "../../Components/Prompts";
import ConfettiExplosion from "react-confetti-explosion";

import VOLCANO from "../../Assets/Media/volcano.png";
import FESTII_AUDIO from "../../Assets/Media/bgMusic.mp3";
import "./index.css";

export const Signup = () => {
  const { context } = useAppContext();
  const audioRef = useRef();

  const handleOnClick = () => {
    if (context.promptStep === 1) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  };

  return (
    <>
      <div className="signup-container" onClick={handleOnClick}>
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
              CONGRATULATiONS LiFE DESIGNER <span>#{context.ldNumber}</span>
            </h1>
            <h3>PHiLiPPiNES iS PROUD OF UUUU</h3>
          </div>
        ) : (
          <Prompts
            promptStep={context.promptStep}
            setPromptStep={context.setPromptStep}
          />
        )}
      </div>
      <audio ref={audioRef} id="festii-audio" src={FESTII_AUDIO} loop />
    </>
  );
};
