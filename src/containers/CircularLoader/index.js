import React from "react";

import './circularLoader.css';

const CircularLoader = ({ background, isLoading, size, otherStyles = {} }) => {
  const loaderStyles = {};
  if (size) {
    loaderStyles.width = size;
    loaderStyles.height = size;
  }
  return (
    <div
      className={`loader-wrapper${ isLoading ? '' : ' hide'}`}
      style={{
        width: size,
        height: size, ...otherStyles,
        background: background ? background : '#99999933',
      }}
    >
      <div className="loader" style={{...loaderStyles}}></div>
    </div>
  );
}

export default CircularLoader;
