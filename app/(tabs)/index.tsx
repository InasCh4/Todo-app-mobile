import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//this is the home page of the app, you can add more components here to make it more interactive and fun
export default function Index() {
  const { toggleDarkMode } = useTheme();
  // this is how we use the convex hooks to fetch data from the convex database
  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodo);
  console.log(todos);
  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>hey ines </Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Dark Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({ text: "Learn Python" })}>
        <Text>Add a new Todo!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({ text: "Learn Python" })}>
        <Text>Add a new Todo!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearAllTodos()}>
        <Text>Clear All Todos</Text>
      </TouchableOpacity>
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
