import React from "react";
import Rank from "./rank";

const ImageLinkForm = () => {
  return (
    <div className="application">
      <Rank />
      <h5 className="application-title">
        this Magic Brain will detect face in pictures. Give it a try.
      </h5>
      <form className="application--form">
        <input
          type="text"
          className="application--form-input"
          placeholder="Add a link"
        />
        <button
          type="submit"
          className="application--form-submit"
          onClick={(e) => e.preventDefault()}
        >
          Detect
        </button>
      </form>
    </div>
  );
};

export default ImageLinkForm;
