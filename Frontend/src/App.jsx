import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// =====================================================
// GLOBAL COMPONENTS
// Keep these normal because they are required immediately.
// =====================================================

import Navbar from "./Pages/Navbar/Navbar";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";

// =====================================================
// LAZY GLOBAL COMPONENTS
// These are not required for the first paint.
// =====================================================

const Footer = lazy(() =>
  import("./Component/Footer/Footer")
);

const Floating = lazy(() =>
  import("./Component/Floating/Floating")
);

// =====================================================
// LAZY PAGES
// Route-level code splitting keeps initial JS small.
// =====================================================

const Home = lazy(() =>
  import("./Pages/Home/Home")
);

const About = lazy(() =>
  import("./Pages/About/About")
);

const Honey = lazy(() =>
  import("./Pages/Honey/Honey")
);

const Blog = lazy(() =>
  import("./Pages/Blog/Blog")
);

const BlogDetails = lazy(() =>
  import("./Pages/BlogDetails/BlogDetails")
);

const Faq = lazy(() =>
  import("./Pages/Faq/Faq")
);

const Contact = lazy(() =>
  import("./Pages/Contact/Contact")
);

const PremimuCollection = lazy(() =>
  import(
    "./Pages/PremimuCollection/PremimuCollection"
  )
);

const OurProducts = lazy(() =>
  import(
    "./Component/OurProducts/OurProducts"
  )
);

const MyWishlist = lazy(() =>
  import(
    "./Component/MyWishlist/MyWishlist"
  )
);

const Account = lazy(() =>
  import("./Component/Account/Account")
);

const Cart = lazy(() =>
  import("./Component/Cart/Cart")
);

const PrivacyPolicy = lazy(() =>
  import(
    "./Component/PrivacyPolicy/PrivacyPolicy"
  )
);

const TermsAndConditions = lazy(() =>
  import(
    "./Component/TermsAndConditions/TermsAndConditions"
  )
);

// =====================================================
// LOADING FALLBACK
// Keep this empty so Lighthouse doesn't have to render
// an additional loader element during route loading.
// =====================================================

const PageLoader = () => null;

// =====================================================
// APP
// =====================================================

const App = () => {
  return (
    <BrowserRouter>

      {/* =================================================
          SCROLL POSITION
          ================================================= */}

      <ScrollToTop />

      {/* =================================================
          NAVBAR
          Required immediately.
          ================================================= */}

      <Navbar />

      {/* =================================================
          MAIN CONTENT
          ================================================= */}

      <main>
        <Suspense fallback={<PageLoader />}>

          <Routes>

            {/* ============================================
                HOME
                ============================================ */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* ============================================
                MAIN PAGES
                ============================================ */}

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

            {/* ============================================
                PREMIUM COLLECTION
                ============================================ */}

            <Route
              path="/premiumcollection"
              element={
                <PremimuCollection />
              }
            />

            {/* ============================================
                PRODUCTS
                ============================================ */}

            <Route
              path="/ourproduct"
              element={
                <OurProducts />
              }
            />

            {/* ============================================
                USER
                ============================================ */}

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

            {/* ============================================
                LEGAL
                ============================================ */}

            <Route
              path="/privacypolicy"
              element={<PrivacyPolicy />}
            />

            <Route
              path="/termandcondition"
              element={
                <TermsAndConditions />
              }
            />

          </Routes>

        </Suspense>
      </main>

      {/* =================================================
          FOOTER + FLOATING
          Loaded after the main route.
          ================================================= */}

      <Suspense fallback={null}>
        <Footer />
        <Floating />
      </Suspense>

    </BrowserRouter>
  );
};

export default App;