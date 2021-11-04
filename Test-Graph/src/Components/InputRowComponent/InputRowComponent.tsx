import React from "react";
// import Select from "react-select";

import { SHAPES_DATA } from "../../data/shapes";
import { COLORS } from "../../data/colors";

import { InputRowComponentProps } from "../../models/input";
import { InputComponent, SelectComponent } from "../index";

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
  //   const [size, setSize] = useState(sizeValue);
  //   const [shape, setShape] = useState(shapeValue);
  //   const [color, setColor] = useState(colorValue);

  //   const handleAddChanges = () => {
  //     handleChangeSize(size);
  //     handleChangeShape(shape);
  //     handleChangeColor(color);
  //   };

  const handleChangeLinkColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeColor(e.target.value as string);
  };

  const handleOpenShapeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeShape(e.target.value as string);
  };

  return (
    <div className="inputRowWrapper">
      <div className="titleForInputRow">{title}</div>
      <div className="inputsWrapper">
        <InputComponent
          value={sizeValue}
          handleChange={(e) => handleChangeSize(e.target.value as number)}
          type="number"
          title="Size"
          width="40px"
        />
        {/* <div className="shapeWrapper">
          <div className="titleForShape">Shape</div>
          <select
            name=""
            id=""
            onChange={(e) => handleChangeShape(e.target.value as string)}
            defaultValue={shapeValue}
            disabled={isShapeDisabled}
          >
            {SHAPES_DATA.map((item: string, index: number) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div> */}
        <SelectComponent
          value={shapeValue}
          handleChange={handleOpenShapeSelect}
          DATA_CHOOSE={SHAPES_DATA}
          title="Shape"
        />
        {/* <Select
        value={shapeValue?.value ? shapeValue : null}
        onChange={handleChangeShape}
        className="select"
        options={dataOptions}
        placeholder="Choose shape"
        // menuIsOpen={true}
      /> */}
        {/* <InputComponent
          value={color}
          handleChange={(e) => setColor(e.target.value as string)}
          title="Color"
        /> */}
        <SelectComponent
          value={colorValue}
          handleChange={handleChangeLinkColor}
          DATA_CHOOSE={COLORS}
          title="Color"
        />
      </div>
      {/* <button className="addButton" onClick={handleAddChanges}>
        Change
      </button> */}
    </div>
  );
}
