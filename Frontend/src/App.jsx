import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// =========================================
// GLOBAL COMPONENTS
// Navbar is required immediately.
// ScrollToTop is very small.
// =========================================

import Navbar from "./Pages/Navbar/Navbar";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";

// =========================================
// LAZY LOADED GLOBAL COMPONENTS
// =========================================

const Footer = lazy(() => import("./Component/Footer/Footer"));
const Floating = lazy(() => import("./Component/Floating/Floating"));

// =========================================
// LAZY LOADED PAGES
// =========================================

const Home = lazy(() => import("./Pages/Home/Home"));
const About = lazy(() => import("./Pages/About/About"));
const Honey = lazy(() => import("./Pages/Honey/Honey"));
const Blog = lazy(() => import("./Pages/Blog/Blog"));
const Faq = lazy(() => import("./Pages/Faq/Faq"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));

const BlogDetails = lazy(
  () => import("./Pages/BlogDetails/BlogDetails")
);

const PremimuCollection = lazy(
  () => import("./Pages/PremimuCollection/PremimuCollection")
);

const MyWishlist = lazy(
  () => import("./Component/MyWishlist/MyWishlist")
);

const Account = lazy(
  () => import("./Component/Account/Account")
);

const OurProducts = lazy(
  () => import("./Component/OurProducts/OurProducts")
);

const PrivacyPolicy = lazy(
  () => import("./Component/PrivacyPolicy/PrivacyPolicy")
);

const TermsAndConditions = lazy(
  () => import("./Component/TermsAndConditions/TermsAndConditions")
);

const Cart = lazy(
  () => import("./Component/Cart/Cart")
);

// =========================================
// LOADING FALLBACK
// =========================================

const PageLoader = () => null;

// =========================================
// APP
// =========================================

const App = () => {
  return (
    <BrowserRouter>
      {/* Scroll position handler */}
      <ScrollToTop />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Main Pages */}
            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/honey"
              element={<Honey />}
            />

            <Route
              path="/blog"
              element={<Blog />}
            />

            <Route
              path="/blogDetails"
              element={<BlogDetails />}
            />

            <Route
              path="/faq"
              element={<Faq />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Collection */}
            <Route
              path="/premiumcollection"
              element={<PremimuCollection />}
            />

            {/* Products */}
            <Route
              path="/ourproduct"
              element={<OurProducts />}
            />

            {/* User */}
            <Route
              path="/wishlist"
              element={<MyWishlist />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/account"
              element={<Account />}
            />

            {/* Legal */}
            <Route
              path="/privacypolicy"
              element={<PrivacyPolicy />}
            />

            <Route
              path="/termandcondition"
              element={<TermsAndConditions />}
            />

          </Routes>
        </Suspense>
      </main>

      {/* Lazy-loaded Footer and Floating Button */}
      <Suspense fallback={null}>
        <Footer />
        <Floating />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;