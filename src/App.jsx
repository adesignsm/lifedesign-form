import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./Routes/Landing";
import { Signup } from "./Routes/Signup";
import { AppProvider } from "./context";

import HEX from "./Assets/Media/hex.jpg";

import "./root.css";

const App = () => {
  return (
    <>
      <AppProvider>
        <main className="main">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
          <h1 className="hex-tagline">
            Powered by hexstudio.io <img src={HEX} />{" "}
          </h1>
        </main>
      </AppProvider>
    </>
  );
};

export default App;
