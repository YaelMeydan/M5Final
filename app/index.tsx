import { Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { CategoryComponent, tasks } from "./taskList";
import { useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([
    { name: 'Important', tasks: tasks.filter((task) => task.category === 'Important') },
    { name: 'Shopping', tasks: tasks.filter((task) => task.category === 'Shopping') },
    { name: 'TBU', tasks: tasks.filter((task) => task.category === 'TBU') },
  ]);

    const handleAddList = (newListName: string) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { name: newListName, tasks: [] },
    ]);
  };

  const handleEditCategory = (categoryIndex: number, newCategoryName: string) => {
    setCategories(
      categories.map((category, index) =>
        index === categoryIndex ? { ...category, name: newCategoryName } : category
      )
    );
  };

  const handleEditTask = (categoryIndex: number, taskIndex: number, newTaskText: string) => {
    setCategories(
      categories.map((category, index) =>
        index === categoryIndex
          ? {
              ...category,
              tasks: category.tasks.map((task, taskIndex) =>
                taskIndex === taskIndex ? { ...task, text: newTaskText } : task
              ),
            }
          : category
      )
    );
  };

  return (
    <SafeAreaView>
      <Text> Do not put off until tomorrow, what you can do today.</Text>
      <Text>B. Franklin</Text>
      <Link href="/newList">Create New List</Link>

       
          <FlatList
  data={categories}
  renderItem={({ item, index }) => (
          <CategoryComponent
            key={item.name}
            category={item.name}
            tasks={item.tasks}
            onDeleteCategory={() => console.log("Category deleted")}
            onEditCategory={(newCategoryName) => handleEditCategory(index, newCategoryName)}
            onEditTask={(taskIndex, newTaskText) => handleEditTask(index, taskIndex, newTaskText)}
            onAddList={(newListName) => handleAddList(newListName)}
        />
  )}
          keyExtractor={(item) => item.name}
/>
     
    </SafeAreaView>
  );
}

 