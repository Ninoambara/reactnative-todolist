import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import colors from '../../Colors';
import ItemModal from './ItemModal';

export default function TodoList({ list, deleteItemById, updateList }) {
  const [showListVisible, setShowListVisible] = useState(false);

  const toggleListModal = () => {
    setShowListVisible(!showListVisible);
  };

  const completedCount = list.todos.filter(todo => todo.completed).length;
  const remainingCount = list.todos.filter(todo => !todo.completed).length;

  return (
    <View>
      <Modal 
        animationType="slide" 
        visible={showListVisible} 
        onRequestClose={toggleListModal}
      >
        <ItemModal
          list={list} 
          closeModal={() => setShowListVisible(false)} 
          updateList={updateList}
        />
      </Modal>
      <TouchableOpacity 
        style={[styles.listContainer, {backgroundColor: list.color}]} 
        onPress={toggleListModal}
        onLongPress={() => Alert.alert("Remove TodoList", "Do you want remove " + list.name + "?", [
          {text: 'OK', onPress: () => deleteItemById(list.id)},
          {text: 'Cancel'}
        ])}
      >
      <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>

      <View>
        <View style={{alignItems:"center"}}>
          <Text style={styles.count}>{remainingCount}</Text>
          <Text style={styles.subtitile}>Remaining</Text>
        </View>
        <View style={{alignItems:"center"}}>
          <Text style={styles.count}>{completedCount}</Text>
          <Text style={styles.subtitile}>Completed</Text>
        </View>
      </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
  },

  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white,
  },

  subtitile: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  }
});
