import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [promptStep, setPromptStep] = useState(1);
  const [ldNumber, setLdNumber] = useState(null);

  const globalStates = {
    promptStep,
    setPromptStep,
    ldNumber,
    setLdNumber,
  };

  return (
    <AppContext.Provider value={{ context: globalStates }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
