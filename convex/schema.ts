import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
//here we gonna put all the tables we want to create in our convex database
//  and the schema for each table
//here we only have one table called "todos"
//  but you can add more tables and fields to make your app more complex and fun
export default defineSchema({
  todos: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
});
