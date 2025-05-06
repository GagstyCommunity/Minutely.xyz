import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type CategoryType = "all" | "tech" | "products" | "travel" | "finance";

export default function LatestNews() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  
  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/articles"],
  });
  
  const handleCategoryChange = (category: CategoryType) => {
    setSelectedCategory(category);
  };
  
  const filteredArticles = articles || [];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-neutral-dark">Latest News</h2>
          <div className="hidden md:flex space-x-2">
            <Button 
              variant={selectedCategory === "all" ? "default" : "outline"} 
              onClick={() => handleCategoryChange("all")}
            >
              All
            </Button>
            <Button 
              variant={selectedCategory === "tech" ? "default" : "outline"} 
              onClick={() => handleCategoryChange("tech")}
            >
              Tech
            </Button>
            <Button 
              variant={selectedCategory === "products" ? "default" : "outline"} 
              onClick={() => handleCategoryChange("products")}
            >
              Products
            </Button>
            <Button 
              variant={selectedCategory === "travel" ? "default" : "outline"} 
              onClick={() => handleCategoryChange("travel")}
            >
              Travel
            </Button>
            <Button 
              variant={selectedCategory === "finance" ? "default" : "outline"} 
              onClick={() => handleCategoryChange("finance")}
            >
              Finance
            </Button>
          </div>
          <select 
            className="bg-neutral-light text-neutral-dark px-4 py-2 rounded-md md:hidden"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value as CategoryType)}
          >
            <option value="all">All Categories</option>
            <option value="tech">Tech</option>
            <option value="products">Products</option>
            <option value="travel">Travel</option>
            <option value="finance">Finance</option>
          </select>
        </div>
        
        {isLoading ? (
          // Skeleton loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <Skeleton className="h-48 w-full rounded-t-xl" />
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-4 w-20 ml-3" />
                    <Skeleton className="h-4 w-24 ml-auto" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-3" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Sample articles for demo
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <Link href="/article/future-of-ai" className="block">
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Tech news" className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-primary bg-blue-50 px-2.5 py-0.5 rounded-full">Tech</span>
                    <span className="text-xs text-neutral-medium ml-3">6 min read</span>
                    <span className="text-xs text-neutral-medium ml-auto">2 hours ago</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-neutral-dark line-clamp-2">The Future of AI: How Machine Learning is Revolutionizing Industries</h3>
                  <p className="text-neutral-medium text-sm mb-4 line-clamp-3">AI technologies continue to advance at a rapid pace, transforming how businesses operate and deliver value to customers across various sectors.</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-light mr-3"></div>
                    <span className="text-sm font-medium text-neutral-dark">James Wilson</span>
                  </div>
                </div>
              </Link>
            </article>
            
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <Link href="/article/smart-home-comparison" className="block">
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0" alt="Product comparison" className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-secondary bg-green-50 px-2.5 py-0.5 rounded-full">Products</span>
                    <span className="text-xs text-neutral-medium ml-3">8 min read</span>
                    <span className="text-xs text-neutral-medium ml-auto">4 hours ago</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-neutral-dark line-clamp-2">Ultimate Comparison: The Top 5 Smart Home Systems of 2023</h3>
                  <p className="text-neutral-medium text-sm mb-4 line-clamp-3">We've tested and compared the latest smart home systems to help you find the perfect match for your connected lifestyle.</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-light mr-3"></div>
                    <span className="text-sm font-medium text-neutral-dark">Emily Johnson</span>
                  </div>
                </div>
              </Link>
            </article>
            
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <Link href="/article/european-destinations" className="block">
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd" alt="Travel destination" className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">Travel</span>
                    <span className="text-xs text-neutral-medium ml-3">5 min read</span>
                    <span className="text-xs text-neutral-medium ml-auto">Yesterday</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-neutral-dark line-clamp-2">Hidden Gems: 10 Underrated European Destinations to Visit This Summer</h3>
                  <p className="text-neutral-medium text-sm mb-4 line-clamp-3">Skip the tourist crowds and discover these stunning European locations that offer authentic experiences without the overwhelming visitor numbers.</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-light mr-3"></div>
                    <span className="text-sm font-medium text-neutral-dark">Sophia Martinez</span>
                  </div>
                </div>
              </Link>
            </article>
            
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <Link href="/article/crypto-trends" className="block">
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" alt="Finance news" className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2.5 py-0.5 rounded-full">Finance</span>
                    <span className="text-xs text-neutral-medium ml-3">7 min read</span>
                    <span className="text-xs text-neutral-medium ml-auto">2 days ago</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-neutral-dark line-clamp-2">Cryptocurrency Trends: What Investors Should Watch in Q3 2023</h3>
                  <p className="text-neutral-medium text-sm mb-4 line-clamp-3">With market volatility continuing to challenge investors, these key indicators may help predict cryptocurrency movements in the coming months.</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-light mr-3"></div>
                    <span className="text-sm font-medium text-neutral-dark">Michael Chen</span>
                  </div>
                </div>
              </Link>
            </article>
            
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <Link href="/article/gaming-industry" className="block">
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f" alt="Tech news" className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-primary bg-blue-50 px-2.5 py-0.5 rounded-full">Tech</span>
                    <span className="text-xs text-neutral-medium ml-3">4 min read</span>
                    <span className="text-xs text-neutral-medium ml-auto">3 days ago</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-neutral-dark line-clamp-2">Gaming Industry Revolution: How Cloud Technology is Changing the Landscape</h3>
                  <p className="text-neutral-medium text-sm mb-4 line-clamp-3">Cloud gaming services are gaining momentum, offering players high-quality gaming experiences without expensive hardware requirements.</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-light mr-3"></div>
                    <span className="text-sm font-medium text-neutral-dark">David Thompson</span>
                  </div>
                </div>
              </Link>
            </article>
            
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <Link href="/article/wireless-earbuds" className="block">
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1" alt="Product comparison" className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-secondary bg-green-50 px-2.5 py-0.5 rounded-full">Products</span>
                    <span className="text-xs text-neutral-medium ml-3">9 min read</span>
                    <span className="text-xs text-neutral-medium ml-auto">4 days ago</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-neutral-dark line-clamp-2">Wireless Earbuds Showdown: Which Brand Offers the Best Value in 2023?</h3>
                  <p className="text-neutral-medium text-sm mb-4 line-clamp-3">We tested over 20 different wireless earbuds models to determine which ones deliver the best combination of sound quality, battery life, and value.</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-light mr-3"></div>
                    <span className="text-sm font-medium text-neutral-dark">Sarah Williams</span>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            Load More Articles
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
