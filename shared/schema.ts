import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  points: integer("points").default(0),
  avatarUrl: text("avatar_url"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  articleCount: integer("article_count").default(0),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  categoryId: integer("category_id"),
  authorId: integer("author_id"),
  imageUrl: text("image_url"),
  readTime: integer("read_time"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  categoryId: integer("category_id"),
  imageUrl: text("image_url"),
  rating: integer("rating"),
});

export const productComparisons = pgTable("product_comparisons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  categoryId: integer("category_id"),
  productId1: integer("product_id_1"),
  productId2: integer("product_id_2"),
  comparison: text("comparison"),
});

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  region: text("region"),
  description: text("description"),
  imageUrl: text("image_url"),
  rating: integer("rating"),
  bestTimeToVisit: text("best_time_to_visit"),
  tags: text("tags").array(),
});

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  categoryId: integer("category_id"),
  questionCount: integer("question_count"),
  difficultyLevel: text("difficulty_level"),
  points: integer("points"),
  imageUrl: text("image_url"),
  participantCount: integer("participant_count").default(0),
});

export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  badgeName: text("badge_name"),
  earnedAt: timestamp("earned_at").defaultNow(),
});

export const userChallenges = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  challengeId: integer("challenge_id"),
  score: integer("score"),
  completedAt: timestamp("completed_at").defaultNow(),
});

// Insert Schema Types
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  displayName: true,
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  slug: true,
  content: true,
  excerpt: true,
  categoryId: true,
  authorId: true,
  imageUrl: true,
  readTime: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  description: true,
  imageUrl: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  categoryId: true,
  imageUrl: true,
  rating: true,
});

export const insertDestinationSchema = createInsertSchema(destinations).pick({
  name: true,
  region: true,
  description: true,
  imageUrl: true,
  rating: true,
  bestTimeToVisit: true,
  tags: true,
});

export const insertChallengeSchema = createInsertSchema(challenges).pick({
  title: true,
  categoryId: true,
  questionCount: true,
  difficultyLevel: true,
  points: true,
  imageUrl: true,
});

// Type Exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Challenge = typeof challenges.$inferSelect;
