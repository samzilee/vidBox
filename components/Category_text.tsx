import React from "react";
import { Text } from "react-native";

interface props {
  title: string;
  active: boolean;
}

const Category_text = ({ title, active }: props) => {
  return (
    <Text
      className={`${active ? "text-secondary" : "text-gray-500"} text-[1rem] font-extrabold `}
    >
      {title}
    </Text>
  );
};

export default Category_text;
