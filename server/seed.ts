import { db, pool } from "./db";
import { 
  categories, 
  users, 
  articles, 
  products, 
  destinations, 
  challenges 
} from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function seed() {
  console.log("Starting database seeding...");

  // Add categories
  const categoriesData = [
    { name: "Tech", slug: "tech", description: "Latest technology news and reviews" },
    { name: "Products", slug: "products", description: "Product reviews and comparisons" },
    { name: "Travel", slug: "travel", description: "Travel destinations and guides" },
    { name: "Finance", slug: "finance", description: "Financial news and advice" }
  ];

  const [tech, products_, travel, finance] = await Promise.all(
    categoriesData.map(async (category) => {
      const [inserted] = await db.insert(categories).values(category).returning();
      return inserted;
    })
  );

  console.log("Categories added");

  // Add a sample user
  const hashedPassword = await hashPassword("password123");
  const [adminUser] = await db.insert(users).values({
    username: "admin",
    password: hashedPassword,
    email: "admin@minutely.xyz",
    displayName: "Admin User"
  }).returning();

  console.log("Admin user added");

  // Add sample articles
  const articlesData = [
    {
      title: "The Future of AI",
      slug: "future-of-ai",
      content: "<p>Artificial Intelligence is transforming our world in ways we could hardly imagine just a few years ago...</p>",
      excerpt: "How AI is changing the technology landscape",
      categoryId: tech.id,
      authorId: adminUser.id,
      readTime: 5
    },
    {
      title: "Top Investment Strategies for 2025",
      slug: "investment-strategies-2025",
      content: "<p>With market volatility at an all-time high, investors need to adopt new strategies...</p>",
      excerpt: "Smart investment approaches for the current economic climate",
      categoryId: finance.id,
      authorId: adminUser.id,
      readTime: 7
    },
    {
      title: "Must-Visit Destinations in Asia",
      slug: "asia-destinations",
      content: "<p>Asia offers a rich tapestry of cultures, cuisines, and landscapes that every traveler should experience...</p>",
      excerpt: "Explore the hidden gems of the Asian continent",
      categoryId: travel.id,
      authorId: adminUser.id,
      readTime: 8
    }
  ];

  await Promise.all(
    articlesData.map(async (article) => {
      await db.insert(articles).values(article);
    })
  );

  console.log("Articles added");

  // Add sample products
  const productsData = [
    {
      name: "iPhone 16 Pro",
      description: "The latest flagship smartphone with advanced AI capabilities",
      categoryId: tech.id,
      rating: 5,
      price: 99900 // $999.00 in cents
    },
    {
      name: "Samsung Galaxy S24",
      description: "Feature-rich Android smartphone with exceptional camera quality",
      categoryId: tech.id,
      rating: 4,
      price: 89900 // $899.00 in cents
    },
    {
      name: "MacBook Air M3",
      description: "Ultra-thin laptop with powerful performance and all-day battery life",
      categoryId: tech.id,
      rating: 5,
      price: 119900 // $1,199.00 in cents
    }
  ];

  await Promise.all(
    productsData.map(async (product) => {
      await db.insert(products).values(product);
    })
  );

  console.log("Products added");

  // Add sample destinations
  const destinationsData = [
    {
      name: "Kyoto, Japan",
      region: "Asia",
      description: "Historic city with beautiful temples and traditional gardens",
      rating: 5,
      bestTimeToVisit: "April and November",
      tags: ["culture", "history", "food"]
    },
    {
      name: "Barcelona, Spain",
      region: "Europe",
      description: "Vibrant coastal city known for unique architecture and lively culture",
      rating: 5,
      bestTimeToVisit: "May to June",
      tags: ["beach", "architecture", "nightlife"]
    },
    {
      name: "Cape Town, South Africa",
      region: "Africa",
      description: "Stunning coastal city with diverse attractions from mountains to vineyards",
      rating: 4,
      bestTimeToVisit: "October to April",
      tags: ["nature", "adventure", "wine"]
    }
  ];

  await Promise.all(
    destinationsData.map(async (destination) => {
      await db.insert(destinations).values(destination);
    })
  );

  console.log("Destinations added");

  // Add sample challenges
  const challengesData = [
    {
      title: "Tech Trivia Challenge",
      categoryId: tech.id,
      questionCount: 10,
      difficultyLevel: "medium",
      points: 100
    },
    {
      title: "Finance Fundamentals Quiz",
      categoryId: finance.id,
      questionCount: 15,
      difficultyLevel: "hard",
      points: 150
    },
    {
      title: "World Traveler Test",
      categoryId: travel.id,
      questionCount: 12,
      difficultyLevel: "easy",
      points: 75
    }
  ];

  await Promise.all(
    challengesData.map(async (challenge) => {
      await db.insert(challenges).values(challenge);
    })
  );

  console.log("Challenges added");
  console.log("Database seeding completed successfully!");
}

// Run the seed function
seed()
  .catch(error => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    // Exit the process - the connection will close automatically
    process.exit(0);
  });