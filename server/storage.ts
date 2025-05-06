import { users, type User, type InsertUser } from "@shared/schema";
import { articles, type Article, type InsertArticle } from "@shared/schema";
import { categories, type Category, type InsertCategory } from "@shared/schema";
import { products, type Product, type InsertProduct } from "@shared/schema";
import { destinations, type Destination, type InsertDestination } from "@shared/schema";
import { challenges, type Challenge, type InsertChallenge } from "@shared/schema";
import { userBadges, userChallenges } from "@shared/schema";
import { db } from "./db";
import { eq, desc, count } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: number, points: number): Promise<User | undefined>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Article operations
  getArticles(limit?: number): Promise<Article[]>;
  getArticlesByCategory(categoryId: number, limit?: number): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Product operations
  getProducts(limit?: number): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Product comparison operations
  getProductComparisons(limit?: number): Promise<any[]>;
  
  // Destination operations
  getDestinations(limit?: number): Promise<Destination[]>;
  getDestinationById(id: number): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Challenge operations
  getChallenges(limit?: number): Promise<Challenge[]>;
  getChallengeById(id: number): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  
  // User badge operations
  getUserBadges(userId: number): Promise<any[]>;
  addUserBadge(userId: number, badgeName: string): Promise<any>;
  
  // User challenge operations
  getUserChallenges(userId: number): Promise<any[]>;
  addUserChallenge(userId: number, challengeId: number, score: number): Promise<any>;
  
  // Session store
  sessionStore: session.SessionStore;
}

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUserPoints(userId: number, pointsToAdd: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const newPoints = (user.points || 0) + pointsToAdd;
    const [updatedUser] = await db
      .update(users)
      .set({ points: newPoints })
      .where(eq(users.id, userId))
      .returning();
    
    return updatedUser;
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }
  
  // Article operations
  async getArticles(limit?: number): Promise<Article[]> {
    const query = db.select().from(articles).orderBy(desc(articles.createdAt));
    
    if (limit) {
      query.limit(limit);
    }
    
    return query;
  }
  
  async getArticlesByCategory(categoryId: number, limit?: number): Promise<Article[]> {
    const query = db
      .select()
      .from(articles)
      .where(eq(articles.categoryId, categoryId))
      .orderBy(desc(articles.createdAt));
    
    if (limit) {
      query.limit(limit);
    }
    
    return query;
  }
  
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article;
  }
  
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db.insert(articles).values(insertArticle).returning();
    
    if (insertArticle.categoryId) {
      // Update the article count for the category
      await db
        .update(categories)
        .set({
          articleCount: count(articles.id)
        })
        .where(eq(categories.id, insertArticle.categoryId));
    }
    
    return article;
  }
  
  // Product operations
  async getProducts(limit?: number): Promise<Product[]> {
    const query = db.select().from(products);
    
    if (limit) {
      query.limit(limit);
    }
    
    return query;
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  
  // Product comparison operations
  async getProductComparisons(limit?: number): Promise<any[]> {
    const query = db.select().from(products);
    
    if (limit) {
      query.limit(limit);
    }
    
    return query;
  }
  
  // Destination operations
  async getDestinations(limit?: number): Promise<Destination[]> {
    const query = db.select().from(destinations);
    
    if (limit) {
      query.limit(limit);
    }
    
    return query;
  }
  
  async getDestinationById(id: number): Promise<Destination | undefined> {
    const [destination] = await db.select().from(destinations).where(eq(destinations.id, id));
    return destination;
  }
  
  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const [destination] = await db.insert(destinations).values(insertDestination).returning();
    return destination;
  }
  
  // Challenge operations
  async getChallenges(limit?: number): Promise<Challenge[]> {
    const query = db.select().from(challenges);
    
    if (limit) {
      query.limit(limit);
    }
    
    return query;
  }
  
  async getChallengeById(id: number): Promise<Challenge | undefined> {
    const [challenge] = await db.select().from(challenges).where(eq(challenges.id, id));
    return challenge;
  }
  
  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const [challenge] = await db.insert(challenges).values(insertChallenge).returning();
    return challenge;
  }
  
  // User badge operations
  async getUserBadges(userId: number): Promise<any[]> {
    return db.select().from(userBadges).where(eq(userBadges.userId, userId));
  }
  
  async addUserBadge(userId: number, badgeName: string): Promise<any> {
    const [badge] = await db
      .insert(userBadges)
      .values({ userId, badgeName })
      .returning();
    return badge;
  }
  
  // User challenge operations
  async getUserChallenges(userId: number): Promise<any[]> {
    return db.select().from(userChallenges).where(eq(userChallenges.userId, userId));
  }
  
  async addUserChallenge(userId: number, challengeId: number, score: number): Promise<any> {
    const [userChallenge] = await db
      .insert(userChallenges)
      .values({ userId, challengeId, score })
      .returning();
    
    // Update participant count for the challenge
    await db
      .update(challenges)
      .set({
        participantCount: count(userChallenges.id)
      })
      .where(eq(challenges.id, challengeId));
    
    return userChallenge;
  }
}

export const storage = new DatabaseStorage();