import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.18.83:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        router.replace("/(tabs)/home");
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={{
            uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Log in to your Account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Fontisto
              style={{ marginLeft: 8, marginRight: 6 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 18,
              }}
              placeholder="Enter your Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Entypo
              style={{ marginLeft: 8, marginRight: 6 }}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 18 : 18,
              }}
              placeholder="Enter your Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007fff", fontWeight: "500" }}>
            Forgot Password
          </Text>
        </View>
        <View style={{ marginTop: 80 }} />
        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#0072b1",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          style={{
            marginTop: 15,
          }}
          onPress={() => router.replace("/register")}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
});
