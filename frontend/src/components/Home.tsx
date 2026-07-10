import React from "react";
import ScrollZoomHero from "./ScrollZoomHero";
import image from "../assets/Heroimage.jpg";
const Home = () => {
  return <>
  
   <ScrollZoomHero
      image={image}
      eyebrow="Est. 2026"
      title="Read Stories That Matter"
      subtitle="Discover insightful articles written by talented writers across technology, AI, business, health, travel, education, and more."
    >
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-xl text-neutral-600">Your next section goes here.</p>
      </div>
    </ScrollZoomHero>
  </>;
};

export default Home;
