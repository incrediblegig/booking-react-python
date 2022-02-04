import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function App() {
    return (
      <BrowserRouter>
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    );
  }
  
