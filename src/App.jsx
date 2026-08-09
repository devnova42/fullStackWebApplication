import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Header from "./components/Header";
import SetInstructions from "./components/SetInstructions";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setinstructions" element={<SetInstructions />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
