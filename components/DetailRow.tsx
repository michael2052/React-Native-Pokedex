import { View, Text } from "react-native";
import React from "react";

interface DetailRowProps {
  title: string;
  description: string;
}

const DetailRow = ({ title, description }: DetailRowProps) => {
  return (
    <View>
      <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
        {title}
      </Text>
      <Text style={{ textTransform: "capitalize" }}>{description}</Text>
    </View>
  );
};

export default DetailRow;
