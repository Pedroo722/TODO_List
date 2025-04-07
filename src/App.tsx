import React from 'react';
import { FlatList, TextInput, StyleSheet, Text, View, Button, Touchable, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


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
  const [tasks, setTasks] = React.useState<ITask[]>(mockTasks);

  const handleCreate = (newTaskTitle: string) => {
    let newTask: ITask = {
      id: tasks[tasks.length - 1].id + 1,
      title: newTaskTitle
    };

    setTasks([...tasks, newTask]);
    onChangeText('');
  }

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  }

  return (
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
            placeholder='Insira sua tarefa'
          />
          <TouchableOpacity onPress={() => handleCreate(text)} style={{ justifyContent: 'center' }}>
            <Entypo name="add-to-list" size={24} color="black" />
          </TouchableOpacity>
        </View>}

      // Lista de Tarefas
      renderItem={({ item }) => (
        <View style={{ backgroundColor: 'cyan', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <Text>{item.title}</Text>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ justifyContent: 'center' }}>
            <FontAwesome5 name="trash-alt" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginRight: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    marginHorizontal: 20
  },
});
