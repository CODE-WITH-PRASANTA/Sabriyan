import React from "react";
import "./Home.css";

import BgOne from "../../assets/bg-1.jpeg";
import BgTwo from "../../assets/bg-2.jpeg";
import Herosection from "../../Component/Herosection/Herosection";
import ChocolateCard from "../../Component/ChocolateCard/ChocolateCard";


const Home = () => {
  return (
    <div
      className="Home"
      style={{
        "--bgOne": `url(${BgOne})`,
        "--bgTwo": `url(${BgTwo})`,
      }}
    >
      {/* Background Layers */}
      <div className="Home-background">

        <div className="Home-bgOne"></div>

        <div className="Home-bgTwo"></div>

        <div className="Home-gradient"></div>

        <div className="Home-overlay"></div>

      </div>

      {/* Website Content */}

      <main className="Home-content">

       <Herosection />
       <ChocolateCard />
      
      </main>
    </div>
  );
};

export default Home;