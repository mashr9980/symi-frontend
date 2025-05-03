// components/Diagram.jsx
import React from 'react';

const Diagram = () => {
  return (
    <div className="flex items-center relative " style={{marginTop:"0"}}>
      {/* Circle */}
      <div className="w-8 h-8 rounded-full bg-[#0047FF]" style={{marginRight:"-12px"}} />

      {/* Rounded L-shaped connector */}
      <svg width="40" height="100" className="overflow-visible">
        <path
          d="M20 0 V40 Q20 50 30 50 H40"
          stroke="#6b727f"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Square */}
      <div className="w-8 h-8 border border-[#6b727f] rounded-md"  style={{borderRadius:"6px"}}/>
    </div>
  );
};

export default Diagram;
