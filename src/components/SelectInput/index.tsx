import React from "react";
import { Select, Option } from "./styles";

interface Props {
  items: any[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<Props> = ({ items, onChange }) => {
  return (
    <Select onChange={onChange}>
      {items.map((item) => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectInput;