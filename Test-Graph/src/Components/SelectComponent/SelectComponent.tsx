import React from "react";
import { SelectComponentProps } from "../../models/select";

import "./style.css";

export default function SelectComponent({
  value,
  handleChange,
  DATA_CHOOSE,
  title,
}: SelectComponentProps) {
  return (
    <div className="selectComponentWrapper">
      {title ? <div className="selectComponentTitle">{title}</div> : null}
      <select className="select" value={value} onChange={handleChange}>
        {DATA_CHOOSE.map((item: string, index: number) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
