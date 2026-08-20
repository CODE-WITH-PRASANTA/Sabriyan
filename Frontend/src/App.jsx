import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home/Home";
import Navbar from "./Pages/Navbar/Navbar";
import About from "./Pages/About/About";
import Honey from "./Pages/Honey/Honey";
import Blog from "./Pages/Blog/Blog";
import Faq from "./Pages/Faq/Faq";
import Contact from "./Pages/Contact/Contact";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Honeyaddtocart from "./Component/Honeyaddtocart/Honeyaddtocart";
import PremimuCollection from "./Pages/PremimuCollection/PremimuCollection";

// Components
import Footer from "./Component/Footer/Footer";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";
import Cart from "./Component/Cart/Cart";
import MyWishlist from "./Component/MyWishlist/MyWishlist";
import Account from "./Component/Account/Account";
import OurProducts from "./Component/OurProducts/OurProducts";
import PrivacyPolicy from "./Component/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./Component/TermsAndConditions/TermsAndConditions";
import Floating from "./Component/Floating/Floating";

const App = () => {
  return (
    <BrowserRouter>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/honey" element={<Honey />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogDetails" element={<BlogDetails />} />
       
          <Route path="/about" element={<About />} />

          <Route path="/honey" element={<Honey />} />

          <Route path="/blog" element={<Blog />} />

          <Route path="/faq" element={<Faq />} />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/blogDetails"
            element={<BlogDetails />}
          />

          <Route
            path="/premiumcollection"
            element={<PremimuCollection />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/wishlist"
            element={<MyWishlist />}
          />

          <Route
            path="/account"
            element={<Account />}
          />

          <Route
            path="/ourproduct"
            element={<OurProducts />}
          />

          <Route
            path="/privacypolicy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/termandcondition"
            element={<TermsAndConditions />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating */}
      <Floating />
    </BrowserRouter>
  );
};

export default App;