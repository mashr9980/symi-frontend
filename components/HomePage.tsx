import React from "react";

function HomePage() {
  return (
    <div className="relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-white to-purple-100 -z-10"></div>

      {/* Hero Section */}
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        {/* Animated Orb */}
        <div className="symi-orb mb-10">
          {/* Placeholder for animation (can be replaced with SVG or canvas) */}
          <div className="w-24 h-24 bg-purple-300 rounded-full animate-pulse mx-auto"></div>
        </div>

        {/* Headline */}
        <h1
          className="text-center font-medium"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            lineHeight: "1.2",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          Build your intelligent business system in 48 hours.
        </h1>

        {/* Three-Part Offer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 my-16 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Audit</h3>
            <p>Understand inefficiencies</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Custom Blueprint</h3>
            <p>Strategic plan for your systems</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Included Automation</h3>
            <p>Start with a working automated workflow</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-black text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-900 transition">
            Create My Blueprint
          </button>
          <span className="ml-4 text-sm opacity-70">
            Delivered in 48h — €199
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;



