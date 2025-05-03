import { useState, useEffect } from "react";

export default function SymiOSSection() {
  const [typingText, setTypingText] = useState("Activating system...");
  const [speechText, setSpeechText] = useState(
    "Welcome, initiating assessment..."
  );
  const [blueprintStatus, setBlueprintStatus] = useState("Scan"); // Tracks Blueprint Phase
  const [animationPhase, setAnimationPhase] = useState(0); // Tracks Animation Phase

  const messages = [
    "Activating system...",
    "Analyzing your operations...",
    "Blueprint generated.",
  ];

  const speechMessages = [
    "Welcome, initiating assessment...",
    "Analyzing nodes...",
    "Automation potential: 87%",
  ];

  // Dynamic Typing Text
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTypingText((prevText) => {
        const currentIndex = messages.indexOf(prevText);
        return messages[(currentIndex + 1) % messages.length];
      });
    }, 2000);

    return () => clearInterval(typingInterval);
  }, []);

  // Speech Simulation
  useEffect(() => {
    const speechInterval = setInterval(() => {
      setSpeechText((prevText) => {
        const currentIndex = speechMessages.indexOf(prevText);
        return speechMessages[(currentIndex + 1) % speechMessages.length];
      });
    }, 3000);

    return () => clearInterval(speechInterval);
  }, []);

  // Blueprint Generation Logic (Scan → Analyze → Generate)
  useEffect(() => {
    const blueprintInterval = setInterval(() => {
      if (animationPhase < 3) {
        setBlueprintStatus((prevStatus) => {
          if (prevStatus === "Scan") return "Analyze";
          if (prevStatus === "Analyze") return "Generate";
          return prevStatus;
        });
        setAnimationPhase((prevPhase) => prevPhase + 1);
      }
    }, 2000); // Transition every 2 seconds

    return () => clearInterval(blueprintInterval);
  }, [animationPhase]);

  return (
    <section className="relative overflow-hidden pt-20">
      {/* Full Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-white -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-7xl font-serif mb-6">
            SYMI OS:
            <br />
            Where Intelligence
            <br />
            Converges
          </h1>
          <p className="text-xl sm:text-2xl text-gray-800 mb-8">
            Not just a service. An evolution ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button className="bg-[#3A00F4] text-white px-12 py-3 rounded-full text-lg transition-colors hover:animate-pulse w-full sm:w-auto">
              Join SYMI OS
            </button>
            <button className="bg-transparent border backdrop-blur text-black px-8 py-3 rounded-full text-lg hover:bg-white/90 transition-colors w-full sm:w-auto">
              Explore the Framework
            </button>
          </div>
        </div>

        {/* Typing Text Animation */}
        <div className="text-center mb-6">
          <p className="text-2xl text-gray-800 font-semibold tracking-wide opacity-90 animate-pulse">
            {typingText}
          </p>
        </div>

        {/* Speech Simulation */}
        <div className="text-center mb-6">
          <p className="text-lg italic text-gray-600 font-medium opacity-80 animate-pulse">
            {speechText}
          </p>
        </div>

        {/* Blueprint Generation Flow */}
        <div className="text-center mb-6">
          <p className="text-3xl font-semibold text-gray-800 opacity-90 animate-pulse">
            {blueprintStatus === "Scan" && "Scanning..."}

            {blueprintStatus === "Analyze" && "Analyzing..."}
          </p>
        </div>

        {/* Central Diagram */}
        <div className="relative flex justify-center mb-20">
          <div className="relative">
            <div className="relative flex justify-center items-center">
              <div className="absolute w-80 h-80 bg-purple-500/40 blur-2xl rounded-full z-0"></div>
              <img
                src="/assets/icons/cc26.jpg"
                alt="Automation Diagram"
                className="relative w-60 sm:w-full h-auto max-w-md z-10 rounded fade-mask"
              />
            </div>
          </div>
        </div>

        <p className="text-3xl text-center font-semibold text-gray-800 opacity-90 animate-pulse pb-20">
          {blueprintStatus === "Generate" && "Generating Blueprint..."}
        </p>

        {/* Three Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 mb-20 text-center sm:text-left">
          <div>
            <h2 className="text-3xl font-bold mb-4">Input to Algorithm</h2>
            <p className="text-gray-700 mb-8">
              Transition from time-constrained billable hours to scalable
              automation solutions that generate predictable monthly income
            </p>
            <div className="mb-2">
              <span className="text-6xl font-bold">85%</span>
            </div>
            <p className="text-gray-600">of partners see revenue stability</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Process to Value</h2>
            <p className="text-gray-700 mb-8">
              Implement transformative solutions in days instead of months while
              requiring minimal technical expertise
            </p>
            <div className="mb-2">
              <span className="text-6xl font-bold">75%</span>
            </div>
            <p className="text-gray-600">
              reduction in solution deployment timeline
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Output to Evolution</h2>
            <p className="text-gray-700 mb-8">
              Position your agency as an indispensable business intelligence
              partner through measured performance improvements
            </p>
            <div className="mb-2">
              <span className="text-6xl font-bold">92%</span>
            </div>
            <p className="text-gray-600">
              client retention rate for automation offerings
            </p>
          </div>
        </div>

        {/* CTA and Quote */}
        <div className="text-center">
          <button className="bg-[#3A00F4] text-white px-12 py-4 rounded-full text-xl font-semibold transition-colors hover:animate-pulse  mb-12">
            Access SYMI OS
          </button>
          <blockquote className="text-3xl font-serif italic">
            "An indispensable strategic growth driver."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
