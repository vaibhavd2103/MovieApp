import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors, Font, Sizes } from "../Constants/Constants";

const PlanTile = ({ item, selected, setSelected }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(item.id);
      }}
      style={styles.planTile}
    >
      <Text style={{ ...Font.light, textAlign: "center" }}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export { PlanTile };

const styles = StyleSheet.create({
  planTile: {
    width: Sizes.width / 2,
    alignItems: "center",
    backgroundColor: Colors.dPurple,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
});
