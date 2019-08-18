import React from "react";

import "./index.scss";

function Feedback({ message, onCross }) {
  return (
    <main className="feedback">
      <div className="feedback__container">
        <span className="feedback__times" onClick={() => onCross()}>
          <i class="fas fa-times" />
        </span>
        <div className="feedback__text">
          <p>{message}</p>
        </div>
      </div>
    </main>
  );
}

export default Feedback;
