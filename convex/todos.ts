import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
// this is where we gonna put all the functions that we want to use to interact with our convex database
export const getTodos = query({
  //args here is empty because we don't need any arguments to get all the todos from the database
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});
//create a mutation to add a new todo to the database
export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });
    return todoId;
  },
});
//create a mutation to toggle the isCompleted field of a todo in the database
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");
    await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted });
  },
});

//create a mutation to delete a todo from the database
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
//create a mutation to update the text of a todo in the database
export const updateTodo = mutation({
  args: { id: v.id("todos"), text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { text: args.text });
  },
});
//create a mutation to clear/reset all the todos from the database
export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    // loop through all the todos and delete them one by one
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }
    // return the number of todos that were deleted
    return { deletedCount: todos.length };
  },
});
