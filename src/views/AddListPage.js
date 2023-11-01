import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../Colors";
// import tempData from "../tempData";

export default function AddListPage({ addList, closeModal }) {
  const backgroundColors = [
    "#4CD749",
    "#22A5D8",
    "#5759D8",
    "#7F20D8",
    "#C058D7",
    "#D75852",
    "#D77448",
  ];

  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors[0]);

  const createToDo = () => {
    if(!name) return alert("please fill name ")
    const list = { name, color };
    addList(list);

    setName("");
    closeModal();
  };

  const renderColors = () => {
    return backgroundColors.map((colorsBg) => (
      <TouchableOpacity
        key={colorsBg}
        style={[styles.colorSelect, { backgroundColor: colorsBg }]}
        onPress={() => setColor(colorsBg)}
      />
    ));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32 }}
        onPress={closeModal}
      >
        <AntDesign name="close" size={24} color={colors.black}></AntDesign>
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create Todo List</Text>
        <TextInput
          style={styles.input}
          placeholder="Add new List Name"
          onChangeText={(text) => setName(text)}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          {renderColors()}
        </View>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: color }]}
          onPress={createToDo}
        >
          <Text style={{ color: colors.white, fontWeight: "600" }}>
            Lets Create!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.black,
    alignSelf: "center",
  },

  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },

  btn: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
