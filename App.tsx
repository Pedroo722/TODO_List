import React from 'react';
import { FlatList, TextInput, Text, View, Modal, Pressable, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

import styles from './styles.js';

interface ITask {
  id: number,
  title: string
}

const mockTasks: ITask[] = [
  {
    id: 1,
    title: 'Estudar React'
  },
  {
    id: 2,
    title: 'Estudar Node.js'
  },
];

export default function App() {
  const [text, onChangeText] = React.useState('');
  const [editText, onChangeEditText] = React.useState('');
  const [tasks, setTasks] = React.useState<ITask[]>(mockTasks);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);

  const handleCreate = (newTaskTitle: string) => {
    let newTask: ITask = {
      id: tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 1,
      title: newTaskTitle
    };

    setTasks([...tasks, newTask]);
    onChangeText('');
  };

  const handleEdit = () => {
    if (editTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, title: text } : task
      );
      setTasks(updatedTasks);
      setModalVisible(false);
      onChangeText('');
      setEditTaskId(null);

      let taskCopy = [...tasks];
      let taskToEdit = taskCopy.find((item, i) => item.id == editTaskId);
      if (taskToEdit) {
        taskToEdit.title = editText;
        console.log(taskToEdit);
        taskCopy.map((item) => item.id == taskToEdit.id ? item = taskToEdit : item = item);
        setTasks(taskCopy);
      }
    }
  };

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  };

  const openEditModal = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditTaskId(id);
      setModalVisible(true);
      onChangeEditText(taskToEdit.title);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}

        // Barra de Input
        ListHeaderComponent={
          <View style={{ marginBottom: 10, flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Insira sua tarefa"
            />
            <TouchableOpacity onPress={() => handleCreate(text)} style={{ justifyContent: 'center' }}>
              <Entypo name="add-to-list" size={24} color="black" />
            </TouchableOpacity>
          </View>
        }

        // Exibição da Lista de Tarefas
        renderItem={({ item }) => (
          <View style={{ backgroundColor: 'cyan', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Text>{item.title}</Text>
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <TouchableOpacity onPress={() => openEditModal(item.id)} style={{ justifyContent: 'center' }}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ justifyContent: 'center' }}>
                <FontAwesome5 name="trash-alt" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        contentContainerStyle={styles.container}
      />

      {/* Modal para Edições */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditTaskId(null);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Insira a nova tarefa</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={onChangeEditText}
              value={editText}
              placeholder="Insira sua tarefa"
            />

            <View style={{ flexDirection: 'row', gap: 15 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleEdit}
              >
                <Text style={styles.textStyle}>Salvar Edição</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Fechar Modal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
