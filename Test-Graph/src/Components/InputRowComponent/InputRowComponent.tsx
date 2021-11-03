import React, { useState } from "react";
// import Select from "react-select";

import { SHAPES_DATA } from "../../data/shapes";

import { InputRowComponentProps } from "../../models/input";
import { InputComponent } from "../index";

import "./style.css";

export default function InputRowComponent({
  handleChangeSize,
  handleChangeShape,
  handleChangeColor,
  sizeValue,
  shapeValue,
  colorValue,
  title,
  isShapeDisabled,
}: InputRowComponentProps) {
  //   const dataOptions: { value: string | number; label: string | number }[] =
  //     SHAPES_DATA
  //       ? SHAPES_DATA.map((item: any) =>
  //           item.value
  //             ? { value: item.value, label: item.label }
  //             : { value: item, label: item }
  //         )
  //       : [];
  const [size, setSize] = useState(1);
  const [shape, setShape] = useState("");
  const [color, setColor] = useState("");

  const handleAddChanges = () => {
    handleChangeSize(size);
    handleChangeShape(shape);
    handleChangeColor(color);
  };

  return (
    <div className="inputRowWrapper">
      <div className="titleForInputRow">{title}</div>
      <div className="inputsWrapper">
        <InputComponent
          value={size}
          handleChange={(e) => setSize(e.target.value as number)}
          type="number"
          title="Size"
          width="40px"
        />
        <div className="shapeWrapper">
          <div className="titleForShape">Shape</div>
          <select
            name=""
            id=""
            onChange={(e) => setShape(e.target.value as string)}
            defaultValue={shapeValue}
            disabled={isShapeDisabled}
          >
            {SHAPES_DATA.map((item: string, index: number) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* <Select
        value={shapeValue?.value ? shapeValue : null}
        onChange={handleChangeShape}
        className="select"
        options={dataOptions}
        placeholder="Choose shape"
        // menuIsOpen={true}
      /> */}
        <InputComponent
          value={color}
          handleChange={(e) => setColor(e.target.value as string)}
          title="Color"
        />
      </div>
      <button className="addButton" onClick={handleAddChanges}>
        Change
      </button>
    </div>
  );
}
