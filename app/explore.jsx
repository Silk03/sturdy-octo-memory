import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import pic from "@/assets/images/react-logo.png";
import KeyboardAvoidingWrapper from "@/components/KeyboardAvoidingWrapper";

// Import auth from your firebase config instead of calling getAuth() directly
import { auth } from "../config/firebase";

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      // Navigate to main app
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Failed to sign in";

      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Invalid email or password";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed login attempts. Try again later";
          break;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      setErrors({ ...errors, email: "Please enter your email first" });
      return;
    }

    try {
      await auth().sendPasswordResetEmail(formData.email.trim());
      Alert.alert(
        "Password Reset Email Sent",
        "Check your email for instructions to reset your password"
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send password reset email");
      console.error(error);
    }
  };

  return (
    // <KeyboardAvoidingWrapper>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={pic}
          resizeMode="cover"
          style={styles.image}
        ></ImageBackground>
        <View style={styles.inner}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? (
            <Text style={styles.error}>{errors.email}</Text>
          ) : null}
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            secureTextEntry
          />
          {errors.password ? (
            <Text style={styles.error}>{errors.password}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
    // </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  textInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#007bff",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
