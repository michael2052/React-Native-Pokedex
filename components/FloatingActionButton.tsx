import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";

interface IFABProps {
  onPress: () => void;
}

export default function FloatingActionButton({ onPress }: IFABProps) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "orange",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  btnText: {
    fontSize: 30,
    color: "white",
  },
});
