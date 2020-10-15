import React from 'react';


const Bar = ({ progress, animationDuration }) => {
  return (
    <div
    style={{
      background: "#29d",
      height: "3px",
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: "fixed",
      top: 0,
      transition: `margin-left ${400}ms ease`,
      width: "100%",
      zIndex: 1031
    }}
    >
    </div>
  );
}
 
export default Bar;