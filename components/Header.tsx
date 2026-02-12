import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  //we call useTheme here to get access to the colors from our theme context, which we can then use to style our header component. This way, when we toggle between light and dark mode, the header will automatically update its colors based on the current theme.
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  //this will give us all the todos from our database, we can use this to display the number of todos in our header or something like that.
  const todos = useQuery(api.todos.getTodos);

  //this will give us the number of completed todos,if we have todos, we filter them to only include the ones that are completed and then we get the length of that filtered array to get the count of completed todos. If there are no todos, we return 0.
  const completedCount = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  //this will give us the total number of todos, if we have todos, we get the length of the todos array to get the total count. If there are no todos, we return 0.
  const totalCount = todos ? todos.length : 0;
  //this will give us the percentage of completed todos, we check if the total count is greater than 0 to avoid division by zero, if it is, we divide the completed count by the total count and multiply by 100 to get the percentage. If there are no todos, we return 0.
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color="#fff"></Ionicons>
        </LinearGradient>
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today&apos;s Tasks 👀</Text>
          <Text style={homeStyles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>
      {/* If there are any todos, we display the progress bar and the percentage text. The progress bar is a simple view with a background color that represents the total progress, and another view inside it with a width that represents the completed progress. We use a linear gradient for the completed progress to make it look nicer. The percentage text is displayed next to the progress bar to show the user how much of their tasks they have completed. */}

      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[
                homeStyles.progressFill,
                { width: `${progressPercentage}%` },
              ]}
            />
          </View>
          <Text style={homeStyles.progressText}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
