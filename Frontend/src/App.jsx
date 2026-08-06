import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./Pages/Home/Home";
import Navbar from "./Pages/Navbar/Navbar";
import About from "./Pages/About/About";
import Footer from "./Component/Footer/Footer";
import Honey from "./Pages/Honey/Honey";
import Blog from "./Pages/Blog/Blog";
import Faq from "./Pages/Faq/Faq";
import Contact from "./Pages/Contact/Contact";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";



const App = () => {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/honey" element={<Honey />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogDetails" element={<BlogDetails />} />

        

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;