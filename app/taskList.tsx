import { TextInput, View, Text, Button, FlatList } from "react-native";
import React, { useState } from "react";

export interface Task {
  id: number;
  text: string;
  category: string;
}

export const tasks: Task[] = [
  { id: 1, text: 'Task 1', category: 'Important' },
  { id: 2, text: 'Task 2', category: 'Important' },
  { id: 3, text: 'Task 3', category: 'Important' },
  { id: 4, text: 'Task 4', category: 'Shopping' },
  { id: 5, text: 'Task 5', category: 'Shopping' },
  { id: 6, text: 'Task 6', category: 'TBU' },
];

const TaskComponent = ({
  task,
  onChangeText,
  onDelete,
  onEditTask,
}: {
  task: Task;
  onChangeText: (text: string) => void;
  onDelete: () => void;
  onEditTask: (newTaskText: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [newTaskText, setNewTaskText] = useState(task.text);

  const handleEditTask = () => {
    onEditTask(newTaskText);
    setEditing(false);
  };

  return (
    <View>
      {editing ? (
        <TextInput
          value={newTaskText}
          onChangeText={(text) => setNewTaskText(text)}
          placeholder="New task text"
        />
      ) : (
        <Text>{task.text}</Text>
      )}
      {editing ? (
        <Button title="Save" onPress={handleEditTask} />
      ) : (
        <Button title="Edit" onPress={() => setEditing(true)} />
      )}
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

export const CategoryComponent = ({
  category,
  tasks,
  onDeleteCategory,
  onEditCategory,
  onEditTask,
  onAddList, 
}: {
  category: string;
  tasks: Task[];
  onDeleteCategory: () => void;
  onEditCategory: (newCategoryName: string) => void;
  onEditTask: (taskIndex: number, newTaskText: string) => void;
  onAddList: (newListName: string) => void; 
}) => {
  const [editing, setEditing] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(category);

  const handleEditCategory = () => {
    onEditCategory(newCategoryName);
    setEditing(false);
  };

  return (
    <View>
      {editing ? (
        <TextInput
          value={newCategoryName}
          onChangeText={(text) => setNewCategoryName(text)}
          placeholder="New category name"
        />
      ) : (
        <Text>{category}</Text>
      )}
      {editing ? (
        <Button title="Save" onPress={handleEditCategory} />
      ) : (
        <Button title="Edit" onPress={() => setEditing(true)} />
      )}
      <Button title="Delete" onPress={onDeleteCategory} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskComponent
            task={item}
            onChangeText={(newText) => console.log(newText)}
            onDelete={() => console.log("Task deleted")}
            onEditTask={(newTaskText) => console.log("Task edited:", newTaskText)}
          />
        )}
      />
    </View>
  );
};