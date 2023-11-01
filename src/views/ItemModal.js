import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from "../../Colors";

export default function ItemModal({ list, closeModal, updateList }) {
  const [newToDo, setNewToDo] = useState('');

  const addTodo = () => {
    list.todos.push({ title: newToDo, completed: false });
    updateList(list);
    setNewToDo('');
  };

  const removeTodo = (index) => {
    list.todos.splice(index, 1);
    updateList(list);
  };

  const moveItemUp = (index) => {
    if (index > 0) {
      const temp = list.todos[index];
      list.todos[index] = list.todos[index - 1];
      list.todos[index - 1] = temp;
      updateList(list);
    }
  };

  const moveItemDown = (index) => {
    if (index < list.todos.length - 1) {
      const temp = list.todos[index];
      list.todos[index] = list.todos[index + 1];
      list.todos[index + 1] = temp;
      updateList(list);
    }
  };

  const renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity
          onPress={() => toggleTodoCompleted(index)}
          onLongPress={() =>
            Alert.alert('Remove Task', 'Do you want to remove this task?', [
              { text: 'OK', onPress: () => removeTodo(index) },
              { text: 'Cancel' },
            ])
          }
        >
          <Ionicons
            name={todo.completed ? 'ios-square' : 'ios-square-outline'}
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveItemUp(index)}>
          <Ionicons name="ios-arrow-up" size={24} color={colors.blue} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveItemDown(index)}>
          <Ionicons name="ios-arrow-down" size={24} color={colors.blue} />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              color: todo.completed ? colors.gray : colors.black,
              textDecorationLine: todo.completed ? 'line-through' : 'none',
            },
          ]}
        >
          {todo.title}
        </Text>
      </View>
    );
  };

  const toggleTodoCompleted = (index) => {
    list.todos[index].completed = !list.todos[index].completed;
    updateList(list);
  };

  const taskCount = list.todos.length;
  const completedCount = list.todos.filter((todo) => todo.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
        onPress={closeModal}
      >
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
        <View>
          <Text style={styles.title}>{list.name}</Text>
          <Text style={styles.taskCount}>
            {completedCount} of {taskCount} tasks
          </Text>
        </View>
      </View>

      <View style={[styles.section, { flex: 3 }]}>
        <FlatList
          data={list.todos}
          renderItem={({ item, index }) => renderTodo(item, index)}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={[styles.section, styles.footer]}>
        <TextInput
          style={[styles.input, { borderColor: list.color }]}
          onChangeText={(text) => setNewToDo(text)}
          value={newToDo}
        />
        <TouchableOpacity
          style={[styles.addToDo, { backgroundColor: list.color }]}
          onPress={() => addTodo()}
        >
          <AntDesign name="plus" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  section: {
    flex: 1,
    alignSelf: 'stretch',
  },

  header: {
    justifyContent: 'flex-end',
    marginLeft: 72,
    borderBottomWidth: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.black,
  },

  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: '600',
  },

  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },

  addToDo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  todo: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
});
