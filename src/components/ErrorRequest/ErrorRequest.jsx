import React from "react";

export default function ErrorRequest({ errorMessage }) {
    // console.log(errorMessage)
  return (
    <div className="error-message">
      {errorMessage}
    </div>
  );
}
