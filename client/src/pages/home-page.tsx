import { useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import TrendingTopics from "@/components/trending-topics";
import LatestNews from "@/components/latest-news";
import ProductComparison from "@/components/product-comparison";
import TravelDestinations from "@/components/travel-destinations";
import Challenges from "@/components/challenges";
import NewsletterCTA from "@/components/newsletter-cta";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const [location] = useLocation();
  
  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });
  
  // Set page title based on current route
  useEffect(() => {
    let pageTitle = "Minutely.xyz | AI-Powered News & Comparison Platform";
    
    switch (location) {
      case "/news":
        pageTitle = "Latest News | Minutely.xyz";
        break;
      case "/products":
        pageTitle = "Product Comparisons | Minutely.xyz";
        break;
      case "/travel":
        pageTitle = "Travel Destinations | Minutely.xyz";
        break;
      case "/finance":
        pageTitle = "Finance News | Minutely.xyz";
        break;
      case "/challenges":
        pageTitle = "Interactive Challenges | Minutely.xyz";
        break;
      case "/dashboard":
        pageTitle = "User Dashboard | Minutely.xyz";
        break;
      case "/profile":
        pageTitle = "User Profile | Minutely.xyz";
        break;
    }
    
    document.title = pageTitle;
  }, [location]);
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <TrendingTopics categories={categories || []} />
        <LatestNews />
        <ProductComparison />
        <TravelDestinations />
        <Challenges />
        <NewsletterCTA />
      </main>
      
      <Footer />
    </div>
  );
}
