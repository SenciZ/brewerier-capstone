import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  let currentuserId;

  const setUserHandler = (info) => {
    const userName = info.name;
    const userId = info.id;
    const userEmail = info.email;
    currentuserId = info.id;
    setUser({ id: userId, name: userName, email: userEmail });
    console.log(user);
  };

  const setLoggedInHandler = () => {
    setIsLoggedIn(true);
  };

  const setLoggedOutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      <NavBar
        currentuser={user}
        isLoggedIn={isLoggedIn}
        setLoggedOutHandler={setLoggedOutHandler}
      />
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/brewerier-capstone" element={<Home />} />
          <Route
            path="home"
            element={<Home isLoggedIn={isLoggedIn} userId={user.id} />}
          />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard currentuser={user} />} />
          <Route
            path="login"
            element={
              <Login
                setUserHandler={setUserHandler}
                setLoggedInHandler={setLoggedInHandler}
                // loggedStatus={isLoggedIn}
                // currentUser={user}
              />
            }
          />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
