import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaView
      style={{
        height: "100%",

      }}
    >
      <Stack screenOptions={{
        headerShown: false,
      }}/>
    </SafeAreaView>
  );
}