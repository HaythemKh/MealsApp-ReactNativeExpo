import { View, Text, StyleSheet } from "react-native";
import React from "react";

const List = ({ data }) => {
  return data.map((dataObject) => (
    <View key={dataObject} style={styles.listItem}>
      <Text style={styles.itemText}>{dataObject}</Text>
    </View>
  ));
};

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});
