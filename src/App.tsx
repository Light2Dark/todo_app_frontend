import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo/Todo";
import Footer from "./components/Footer";
import { getUserId } from "./components/Auth/AuthFuncs";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  // unsure if this will update when a user logs out for example
  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      setSignedIn(true)
    }
  }, [getUserId()])

  return (
    <div className={`h-screen transition-colors ${darkMode ? "dark bg-slate-900" : ""}`}>
      <Navbar darkTheme={darkMode} setDarkTheme={setDarkMode} signedIn={signedIn} />
      <div id ="body" className="flex flex-col items-center align-middle">
        <Todo />
      </div>
      <Footer />
    </div>
  );
}

export default App;
