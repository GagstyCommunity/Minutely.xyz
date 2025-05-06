import { users, categories, articles, products, productComparisons, destinations, challenges, userBadges, userChallenges, type User, type InsertUser, type Category, type InsertCategory, type Article, type InsertArticle, type Product, type InsertProduct, type Destination, type InsertDestination, type Challenge, type InsertChallenge } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private products: Map<number, Product>;
  private productComparisons: Map<number, any>;
  private destinations: Map<number, Destination>;
  private challenges: Map<number, Challenge>;
  private userBadges: Map<number, any>;
  private userChallenges: Map<number, any>;
  
  sessionStore: session.SessionStore;
  
  private currentIds: {
    users: number;
    categories: number;
    articles: number;
    products: number;
    productComparisons: number;
    destinations: number;
    challenges: number;
    userBadges: number;
    userChallenges: number;
  };

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.products = new Map();
    this.productComparisons = new Map();
    this.destinations = new Map();
    this.challenges = new Map();
    this.userBadges = new Map();
    this.userChallenges = new Map();
    
    this.currentIds = {
      users: 1,
      categories: 1,
      articles: 1,
      products: 1,
      productComparisons: 1,
      destinations: 1,
      challenges: 1,
      userBadges: 1,
      userChallenges: 1,
    };
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
    
    // Initialize with some demo data
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categories = [
      { id: this.currentIds.categories++, name: 'Tech', slug: 'tech', description: 'Technology news and updates', imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485', articleCount: 143 },
      { id: this.currentIds.categories++, name: 'Products', slug: 'products', description: 'Product reviews and comparisons', imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b', articleCount: 98 },
      { id: this.currentIds.categories++, name: 'Travel', slug: 'travel', description: 'Travel destinations and guides', imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee', articleCount: 76 },
      { id: this.currentIds.categories++, name: 'Finance', slug: 'finance', description: 'Financial news and advice', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3', articleCount: 54 },
      { id: this.currentIds.categories++, name: 'Smartphones', slug: 'smartphones', description: 'Latest smartphone reviews', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', articleCount: 122 },
    ];
    
    categories.forEach(category => {
      this.categories.set(category.id, category as Category);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user: User = { ...insertUser, id, points: 0 };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserPoints(userId: number, points: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { 
      ...user, 
      points: (user.points || 0) + points 
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentIds.categories++;
    const category: Category = { ...insertCategory, id, articleCount: 0 };
    this.categories.set(id, category);
    return category;
  }
  
  // Article operations
  async getArticles(limit?: number): Promise<Article[]> {
    const articles = Array.from(this.articles.values());
    return limit ? articles.slice(0, limit) : articles;
  }
  
  async getArticlesByCategory(categoryId: number, limit?: number): Promise<Article[]> {
    const articles = Array.from(this.articles.values())
      .filter(article => article.categoryId === categoryId);
    return limit ? articles.slice(0, limit) : articles;
  }
  
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug,
    );
  }
  
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentIds.articles++;
    const article: Article = { 
      ...insertArticle, 
      id, 
      createdAt: new Date() 
    };
    this.articles.set(id, article);
    
    // Update article count for category
    if (article.categoryId) {
      const category = this.categories.get(article.categoryId);
      if (category) {
        const updatedCategory = {
          ...category,
          articleCount: (category.articleCount || 0) + 1
        };
        this.categories.set(article.categoryId, updatedCategory);
      }
    }
    
    return article;
  }
  
  // Product operations
  async getProducts(limit?: number): Promise<Product[]> {
    const products = Array.from(this.products.values());
    return limit ? products.slice(0, limit) : products;
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentIds.products++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  // Product comparison operations
  async getProductComparisons(limit?: number): Promise<any[]> {
    const comparisons = Array.from(this.productComparisons.values());
    return limit ? comparisons.slice(0, limit) : comparisons;
  }
  
  // Destination operations
  async getDestinations(limit?: number): Promise<Destination[]> {
    const destinations = Array.from(this.destinations.values());
    return limit ? destinations.slice(0, limit) : destinations;
  }
  
  async getDestinationById(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }
  
  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentIds.destinations++;
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }
  
  // Challenge operations
  async getChallenges(limit?: number): Promise<Challenge[]> {
    const challenges = Array.from(this.challenges.values());
    return limit ? challenges.slice(0, limit) : challenges;
  }
  
  async getChallengeById(id: number): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }
  
  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const id = this.currentIds.challenges++;
    const challenge: Challenge = { ...insertChallenge, id, participantCount: 0 };
    this.challenges.set(id, challenge);
    return challenge;
  }
  
  // User badge operations
  async getUserBadges(userId: number): Promise<any[]> {
    return Array.from(this.userBadges.values())
      .filter(badge => badge.userId === userId);
  }
  
  async addUserBadge(userId: number, badgeName: string): Promise<any> {
    const id = this.currentIds.userBadges++;
    const badge = { 
      id, 
      userId, 
      badgeName, 
      earnedAt: new Date() 
    };
    this.userBadges.set(id, badge);
    return badge;
  }
  
  // User challenge operations
  async getUserChallenges(userId: number): Promise<any[]> {
    return Array.from(this.userChallenges.values())
      .filter(challenge => challenge.userId === userId);
  }
  
  async addUserChallenge(userId: number, challengeId: number, score: number): Promise<any> {
    const id = this.currentIds.userChallenges++;
    const userChallenge = { 
      id, 
      userId, 
      challengeId, 
      score, 
      completedAt: new Date() 
    };
    this.userChallenges.set(id, userChallenge);
    
    // Update participant count for the challenge
    const challenge = this.challenges.get(challengeId);
    if (challenge) {
      const updatedChallenge = {
        ...challenge,
        participantCount: (challenge.participantCount || 0) + 1
      };
      this.challenges.set(challengeId, updatedChallenge);
    }
    
    return userChallenge;
  }
}

export const storage = new MemStorage();
