import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './Colors';
import temporaryData from './src/data/temporaryData';
// import TodoList from './src/views/Todolist';
// import AddListModal from './src/views/Addlist';

export default function App() {
  const [addToDoVisible, setAddToDoVisible] = useState(false);
  const [lists, setLists] = useState(temporaryData);

  const toggleAddToDoModal = () => {
    setAddToDoVisible(!addToDoVisible);
  };

  const closeModalToggle = () => {
    setAddToDoVisible(false);
  };

  const addList = (list) => {
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  };

  const deleteItemById = (id) => {
    const filteredData = lists.filter((item) => item.id !== id);
    setLists(filteredData);
  };

  const updateList = (list) => {
    setLists((prevLists) => {
      return prevLists.map((item) => (item.id === list.id ? list : item));
    });
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" visible={addToDoVisible} onRequestClose={closeModalToggle}>
        <Text>disini add baru</Text>
      </Modal>

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo <Text style={{ fontWeight: '200', color: colors.blue }}> Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity style={styles.addList} onPress={toggleAddToDoModal}>
          <AntDesign name="plus" size={16} color={colors.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{ height: 275, paddingLeft: 32 }}>
       <Text>testing</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    backgroundColor: colors.lightblue,
    flex: 1,
    height: 1,
    alignSelf: 'center',
  },

  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.black,
    paddingHorizontal: 48,
  },

  addList: {
    borderWidth: 2,
    borderColor: colors.lightblue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});
