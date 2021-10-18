import React from "react";

import "./style.css";

interface NodeDatePopupProps {
  setIsPopupShow(data: boolean): void;
  currentUserData: string;
  isPopupShow?: boolean;
}

export default function NodeDataPopup({
  setIsPopupShow,
  currentUserData,
  isPopupShow,
}: NodeDatePopupProps) {
  const handleClosePopup = () => {
    setIsPopupShow(false);
  };

  return isPopupShow ? (
    <div className="wrapper">
      <div className="title">Node data:</div>
      <pre className="content">{currentUserData}</pre>
      <div className="closeButton">
        <button onClick={handleClosePopup}>Close</button>
      </div>
    </div>
  ) : null;
}
