import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Register() {
    return (
        <SafeAreaView>
            <View>
                <Text>Register Screen</Text>
            </View>
            <Link href="/login" >
                Go to Login
            </Link>
        </SafeAreaView>
    );
}