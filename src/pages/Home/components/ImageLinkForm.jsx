import React, { useState } from "react";
import Rank from "./rank";

const ImageLinkForm = (props) => {
  const [url, setUrl] = useState("");
    
  return (
    <div className="application">
      <Rank userInformation={{ props }} />
      <h5 className="application-title">
        this Magic Brain will detect face in pictures. Give it a try.
      </h5>
      <form className="application--form">
        <input
          type="text"
          className="application--form-input"
          placeholder="Add a link"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="application--form-submit"
          onClick={(e) => {
            e.preventDefault();
            props.clarifaiExe();
            props.setInputUrl((prevState) => ({ ...prevState, imageUrl: url }));
          }}
        >
          Detect
        </button>
      </form>
    </div>
  );
};

export default ImageLinkForm;
