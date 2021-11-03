import React from "react";
import { InputProps } from "../../models/input";
import "./style.css";

export default function InputComponent({
  handleChange,
  value,
  title,
  type,
  width,
}: InputProps) {
  return (
    <div className="inputWrapper">
      {title ? <div className="title">{title}</div> : null}
      <input
        type={type && value ? type : "text"}
        className="input"
        value={value ? value : ""}
        onChange={handleChange}
        style={{ width: width || "auto" }}
      />
    </div>
  );
}
