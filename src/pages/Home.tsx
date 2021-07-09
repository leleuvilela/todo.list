import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTask = tasks.find(task => task.title === newTaskTitle)
    if (hasTask) {
      return Alert.alert('Você não pode cadastrar uma task com o mesmo nome')
    }

    const task: Task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    }
    setTasks(oldTasks => [...oldTasks, task])
  }

  function handleToggleTaskDone(id: number) {
    const tasksUpdated = tasks.map(task => {
      if (task.id === id) task.done = !task.done
      return task
    })
    setTasks(tasksUpdated)
  }

  function removeTask(id: number) {
    const tasksUpdated = tasks.filter(task => task.id !== id)
    setTasks(tasksUpdated)
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {
        text: "Não",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Sim", onPress: () => removeTask(id) }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const tasksUpdated = tasks.map(task => {
      if (task.id === taskId) task.title = taskNewTitle
      return task
    })
    setTasks(tasksUpdated)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})