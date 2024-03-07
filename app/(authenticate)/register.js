import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const clearState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setImage("");
  };

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      profileImage: image,
    };

    axios
      .post("http://192.168.18.83:8081/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        clearState();
      })
      .catch((error) => {
        Alert.alert(
          "Registration failed",
          "An error occured while registering"
        );
        console.log("Error", error);
      });
  };
  //images.unsplash.com/photo-1633332755192-727a05c4013d
  https: return (
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
            Register to your Account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
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
              name="person"
              size={24}
              color="gray"
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 18 : 18,
              }}
              placeholder="Enter your Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>
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
          <Feather
            style={{ marginLeft: 8, marginRight: 6 }}
            name="image"
            size={24}
            color="gray"
          />

          <TextInput
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              fontSize: image ? 18 : 18,
            }}
            placeholder="Enter your Image URL"
            value={image}
            onChangeText={(text) => setImage(text)}
          />
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
          style={{
            width: 200,
            backgroundColor: "#0072b1",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
          onPress={handleRegister}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable
          style={{
            marginTop: 15,
          }}
          onPress={() => router.replace("/login")}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Already have an account? Sign in
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

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
