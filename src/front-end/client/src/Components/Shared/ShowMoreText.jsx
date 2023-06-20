import React, { useState } from "react";
import "./style/shared.scss"

const ShowMoreText = ({ text, maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  const displayText = showFullText ? text : text.substring(0, maxLength);

  return (
    <div className="d-flex">
      {text.length > maxLength && (
        <p onClick={handleToggleText} className="">
          {displayText}{showFullText ? "" : "..."}
        </p>
      )}
    </div>
  );
};

export default ShowMoreText;
