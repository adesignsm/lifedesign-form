import FESTII_VIDEO from "../../Assets/Media/festii_landing.mp4";
import "./index.css";

export const Landing = () => {
  const handleClick = () => {
    window.location.href = "/signup";
  };

  const handleOnEnded = (e) => {
    e.target.parentElement.classList.add("clickable");
  };

  return (
    <>
      <div className="landing-container">
        <div className="video-container">
          <video
            autoPlay
            muted
            onClick={handleClick}
            onEnded={(e) => handleOnEnded(e)}
          >
            <source src={FESTII_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
};
