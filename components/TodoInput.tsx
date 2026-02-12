import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
//here we will use our mutation
const TodoInput = () => {
  //first we get our colors & styles
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  //then we set up our state for the new todo input, this will allow us to keep track of the text that the user is entering for their new todo item. We can use this state to update the input field and eventually send the new todo to our backend when the user submits it.
  const [newTodo, setNewTodo] = useState("");

  //next we set up our mutation to add a new todo, this will allow us to send the new todo item to our backend and have it added to our database. We can call this mutation when the user submits their new todo, and it will handle the logic of adding the todo to the database and updating our UI accordingly.
  const addTodo = useMutation(api.todos.addTodo);

  //this is the function that will be called when the user submits their new todo, we will call our addTodo mutation here and pass in the newTodo state as the input. This function will handle the logic of sending the new todo to our backend and updating our UI based on the response.
  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo({ text: newTodo.trim() });
        setNewTodo("");
      } catch (error) {
        console.error("Error adding a todo:", error);
        Alert.alert(
          "Error",
          "There was an error adding your todo. Please try again.",
        );
      }
    }
  };
  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="What's on your mind?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={[
              homeStyles.addButton,
              !newTodo.trim() && homeStyles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add-outline" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
