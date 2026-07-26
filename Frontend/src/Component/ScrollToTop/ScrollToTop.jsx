import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls the window to the top instantly whenever the route/path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render any UI
};

export default ScrollToTop;