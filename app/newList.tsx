import { Text, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

export default function NewList() {
  const router = useRouter();
  const [newListName, setNewListName] = useState("");

    const handleAddList = () => {
    router.push({
      pathname: "/",
      params: { newListName },
    });
  };

  return (
    <SafeAreaView>
      <Text>Add New List</Text>
      <TextInput
        value={newListName}
        onChangeText={(text) => setNewListName(text)}
        placeholder="Enter new list name"
      />
      <Button title="Add List" onPress={handleAddList} />
      <Link href="/">Go to Home page</Link>
    </SafeAreaView>
  );
}