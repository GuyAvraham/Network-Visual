import React from "react";

import "./style.css";

interface NodeDatePopupProps {
  setIsPopupShow(data: boolean): void;
  currentUserData: string;
}

export default function NodeDataPopup({
  setIsPopupShow,
  currentUserData,
}: NodeDatePopupProps) {
  const handleClosePopup = () => {
    setIsPopupShow(false);
  };

  return (
    <div className="wrapper">
      <div>{currentUserData}</div>
      <button onClick={handleClosePopup}>Close</button>
    </div>
  );
}
