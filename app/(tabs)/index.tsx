import { StyleSheet, Text, View } from "react-native";
//this is the home page of the app, you can add more components here to make it more interactive and fun
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>hey ines love u </Text>
      <Text style={styles.content}>mwh</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  content: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
