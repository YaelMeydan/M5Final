import { Text,  View, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { TaskComponent, tasks } from "./taskList";
import { useState, useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";


type HomeRouteParams = {
  newListName: string;
};
export default function Home() {
  const [categories, setCategories] = useState([
    {
      title: 'Important',
      data: tasks.filter((task) => task.category === 'Important'),
    },
    {
      title: 'Shopping',
      data: tasks.filter((task) => task.category === 'Shopping'),
    },
    {
      title: 'TBU',
      data: tasks.filter((task) => task.category === 'TBU'),
    },
  ]);

  const route = useRoute<HomeRouteParams>();
  const newListName = route.params?.newListName;

  useEffect(() => {
    if (newListName) {
      setCategories((prevCategories) => [
        ...prevCategories,
        { title: newListName, data: [] },
      ]);
    }
  }, [newListName]);

    const handleEditCategory = (sectionIndex: number, newCategoryName: string) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories[sectionIndex].title = newCategoryName;
      return newCategories;
    });
  };

  const handleEditTask = (sectionIndex: number, taskIndex: number, newTaskText: string) => {
    setCategories(
      categories.map((category, index) =>
        index === sectionIndex
          ? {
              ...category,
              data: category.data.map((task, taskIndex) =>
                taskIndex === taskIndex ? { ...task, text: newTaskText } : task
              ),
            }
          : category
      )
    );
  };

  const handleDeleteTask = (sectionIndex: number, taskIndex: number) => {
    setCategories(
      categories.map((category, index) =>
        index === sectionIndex
          ? {
              ...category,
              data: category.data.filter((task, taskIndex) => taskIndex !== taskIndex),
            }
          : category
      )
    );
  };

  const handleDeleteCategory = (sectionIndex: number) => {
    setCategories(categories.filter((_, index) => index !== sectionIndex));
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Do not put off until tomorrow, what you can do today.
      </Text>
      <Text style={{ fontSize: 18, fontStyle: 'italic' }}>
        B. Franklin
      </Text>
      <View style={{ marginBottom: 20 }}>
        <Link href="/newList">Create New List</Link>
      </View>

      <SectionList
        sections={categories}
        renderItem={({ item, section, index }) => (
          <TaskComponent
            task={item}
            sectionIndex={categories.indexOf(section)}
            taskIndex={index}
            onEditTask={(newTaskText) => handleEditTask(categories.indexOf(section), index, newTaskText)}
            onDeleteTask={() => handleDeleteTask(categories.indexOf(section), index)}
            onTextChange={(newText) => console.log(newText)}
          />
        )}
        renderSectionHeader={({ section }) => (
          <View style={{ backgroundColor: '#f0f0f0', padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {section.title}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

 