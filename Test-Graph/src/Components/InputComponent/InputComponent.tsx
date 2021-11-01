import React from "react";
import { InputProps } from "../../models/input";

export default function InputComponent({
  handleChange,
  value,
  title,
  type,
}: InputProps) {
  return (
    <div className="inputWrapper">
      {title ? <div className="title">{title}</div> : null}
      <input
        type={type && value ? type : "text"}
        className="input"
        value={value ? value : ""}
        onChange={handleChange}
      />
    </div>
  );
}
