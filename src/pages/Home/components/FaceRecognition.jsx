import React from "react";

const FaceRecognition = (props) => {
  return (
    <div className="container">
      {props.vector}
      <img src={props.inputUrl} alt="" id="container__img" />
      <div
        style={{
          top: props.box.topCol,
          left: props.box.leftCol,
          bottom: props.box.bottomCol,
          right: props.box.rightCol,
        }}
        className="container__box"
      ></div>
    </div>
  );
};

export default FaceRecognition;
