import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertArticleSchema, insertCategorySchema, insertProductSchema, insertDestinationSchema, insertChallengeSchema } from "@shared/schema";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-dev",
  });
  
  // API Routes
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  
  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create category" });
      }
    }
  });
  
  // Articles
  app.get("/api/articles", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const articles = await storage.getArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });
  
  app.get("/api/articles/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const articles = await storage.getArticlesByCategory(categoryId, limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles by category" });
    }
  });
  
  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });
  
  app.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create article" });
      }
    }
  });
  
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const products = await storage.getProducts(limit);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create product" });
      }
    }
  });
  
  // Product Comparisons
  app.get("/api/product-comparisons", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const comparisons = await storage.getProductComparisons(limit);
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product comparisons" });
    }
  });
  
  // Destinations
  app.get("/api/destinations", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const destinations = await storage.getDestinations(limit);
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });
  
  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destinationId = parseInt(req.params.id);
      const destination = await storage.getDestinationById(destinationId);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });
  
  app.post("/api/destinations", async (req, res) => {
    try {
      const validatedData = insertDestinationSchema.parse(req.body);
      const destination = await storage.createDestination(validatedData);
      res.status(201).json(destination);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create destination" });
      }
    }
  });
  
  // Challenges
  app.get("/api/challenges", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const challenges = await storage.getChallenges(limit);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch challenges" });
    }
  });
  
  app.get("/api/challenges/:id", async (req, res) => {
    try {
      const challengeId = parseInt(req.params.id);
      const challenge = await storage.getChallengeById(challengeId);
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch challenge" });
    }
  });
  
  app.post("/api/challenges", async (req, res) => {
    try {
      const validatedData = insertChallengeSchema.parse(req.body);
      const challenge = await storage.createChallenge(validatedData);
      res.status(201).json(challenge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create challenge" });
      }
    }
  });
  
  // User badges
  app.get("/api/users/:userId/badges", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.id !== parseInt(req.params.userId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = parseInt(req.params.userId);
      const badges = await storage.getUserBadges(userId);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user badges" });
    }
  });
  
  app.post("/api/users/:userId/badges", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.id !== parseInt(req.params.userId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = parseInt(req.params.userId);
      const { badgeName } = req.body;
      
      if (!badgeName) {
        return res.status(400).json({ message: "Badge name is required" });
      }
      
      const badge = await storage.addUserBadge(userId, badgeName);
      res.status(201).json(badge);
    } catch (error) {
      res.status(500).json({ message: "Failed to add user badge" });
    }
  });
  
  // User challenges
  app.get("/api/users/:userId/challenges", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.id !== parseInt(req.params.userId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = parseInt(req.params.userId);
      const challenges = await storage.getUserChallenges(userId);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user challenges" });
    }
  });
  
  app.post("/api/users/:userId/challenges", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.id !== parseInt(req.params.userId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = parseInt(req.params.userId);
      const { challengeId, score } = req.body;
      
      if (!challengeId || score === undefined) {
        return res.status(400).json({ message: "Challenge ID and score are required" });
      }
      
      const userChallenge = await storage.addUserChallenge(userId, challengeId, score);
      
      // Get the challenge to determine points earned
      const challenge = await storage.getChallengeById(challengeId);
      if (challenge && challenge.points) {
        // Calculate points earned based on score percentage
        const pointsEarned = Math.round((score / 100) * challenge.points);
        await storage.updateUserPoints(userId, pointsEarned);
      }
      
      res.status(201).json(userChallenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to add user challenge" });
    }
  });
  
  // OpenAI content generation
  app.post("/api/generate/content", async (req, res) => {
    try {
      const { prompt, type } = req.body;
      
      if (!prompt || !type) {
        return res.status(400).json({ message: "Prompt and type are required" });
      }
      
      let systemPrompt = "";
      
      switch (type) {
        case "article":
          systemPrompt = "You are an AI writer for a news platform focused on tech, products, travel, and finance. Write an engaging article with a natural human-like tone. Include some subtle imperfections for authenticity. Format with HTML headings and paragraphs.";
          break;
        case "comparison":
          systemPrompt = "You are an AI product comparison expert. Create a balanced comparison of two products highlighting strengths and weaknesses of each. Be objective but incorporate a natural human tone. Include some subtle imperfections for authenticity.";
          break;
        case "destination":
          systemPrompt = "You are an AI travel writer. Write an engaging description of a travel destination with local insights, highlights, and practical tips. Use a natural human-like tone with some subtle imperfections for authenticity.";
          break;
        case "challenge":
          systemPrompt = "You are an AI quiz creator. Create engaging quiz questions about the topic with multiple choice answers. Mark the correct answer. Create questions of varying difficulty.";
          break;
        default:
          systemPrompt = "You are an AI writer for a news platform. Write with a natural human-like tone and include some subtle imperfections for authenticity.";
      }
      
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
      
      res.json({ content: response.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate content" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
