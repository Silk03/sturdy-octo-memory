import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import pic from "@/assets/images/react-logo.png";

const app = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={pic}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Welcome to Tala!</Text>
          <Text style={styles.subText}>Hello, Tala!</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  backgroundImageStyle: {
    opacity: 0.2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#123",
    marginBottom: 16,
    textAlign: "center",
  },
  subText: {
    fontSize: 20,
    color: "#123",
    textAlign: "center",
  },
});

export default app;
