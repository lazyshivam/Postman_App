import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import About from "./components/About";
import TabCollections from "./components/TabCollections";

function App() {
  const [userData, setUserData] = useState(null);

  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("https://postman-071b.onrender.com/auth/profile", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          return response.data; // Add this return statement
        } else {
          throw new Error("Authentication failed");
        }
      })
      .then((data) => {
        // console.log(data.user.displayName);
        setUserData(data.user);
        setIsloggedIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} user={userData} />
      <div className="">
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route exact path="/" element={<LandingPage />} />
            </>
          ) : (
            <>
              <Route
                exact
                path="/"
                element={<Home loggedInUser={userData.displayName} />}
              />
            </>
          )}
          <Route path="/workspace" element={<TabCollections />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer className="bg-gray-700  text-white  p-4 text-center">
          <p>&copy; 2023 Postman. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
