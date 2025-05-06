import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Challenges() {
  const { data: challenges, isLoading } = useQuery({
    queryKey: ["/api/challenges"],
  });
  
  return (
    <section className="py-12 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-2">Weekly Challenges</h2>
            <p className="text-neutral-medium mb-4 md:mb-0">Test your knowledge and earn badges with our interactive challenges</p>
          </div>
          <Link href="/challenges" className="text-primary hover:underline font-medium">
            View All Challenges
          </Link>
        </div>
        
        {isLoading ? (
          // Skeleton loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Skeleton className="h-32 w-full" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-5 w-full mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        <Skeleton className="w-6 h-6 rounded-full" />
                        <Skeleton className="w-6 h-6 rounded-full" />
                        <Skeleton className="w-6 h-6 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-16 ml-2" />
                    </div>
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Sample challenges for demo
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tech Challenge */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-gray-100">
              <Link href="/challenges/ai-technology-trends" className="block">
                <div className="h-32 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f" 
                    alt="Tech Challenge" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-bold">Tech Quiz</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">10 questions</span>
                    <span className="text-xs text-neutral-medium">500 points</span>
                  </div>
                  <h3 className="font-bold text-neutral-dark mb-3">AI Technology Trends</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                      </div>
                      <span className="text-xs text-neutral-medium ml-2">+218 played</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-800 hover:bg-green-100 border-green-200">
                      Easy
                    </Badge>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Finance Challenge */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-gray-100">
              <Link href="/challenges/cryptocurrency-basics" className="block">
                <div className="h-32 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1512403754473-27835f7b9984" 
                    alt="Finance Challenge" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-bold">Finance Quiz</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">15 questions</span>
                    <span className="text-xs text-neutral-medium">750 points</span>
                  </div>
                  <h3 className="font-bold text-neutral-dark mb-3">Cryptocurrency Basics</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                      </div>
                      <span className="text-xs text-neutral-medium ml-2">+142 played</span>
                    </div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                      Medium
                    </Badge>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Travel Challenge */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-gray-100">
              <Link href="/challenges/hidden-destinations" className="block">
                <div className="h-32 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" 
                    alt="Travel Challenge" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-bold">Travel Quiz</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">12 questions</span>
                    <span className="text-xs text-neutral-medium">600 points</span>
                  </div>
                  <h3 className="font-bold text-neutral-dark mb-3">Hidden Destinations</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                      </div>
                      <span className="text-xs text-neutral-medium ml-2">+93 played</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-800 hover:bg-green-100 border-green-200">
                      Easy
                    </Badge>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Product Challenge */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-gray-100">
              <Link href="/challenges/tech-gadgets-2023" className="block">
                <div className="h-32 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
                    alt="Product Challenge" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-bold">Product Quiz</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">20 questions</span>
                    <span className="text-xs text-neutral-medium">1000 points</span>
                  </div>
                  <h3 className="font-bold text-neutral-dark mb-3">Tech Gadgets 2023</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                        <div className="w-6 h-6 rounded-full border border-white bg-neutral-light"></div>
                      </div>
                      <span className="text-xs text-neutral-medium ml-2">+176 played</span>
                    </div>
                    <Badge variant="outline" className="bg-red-50 text-red-800 hover:bg-red-100 border-red-200">
                      Hard
                    </Badge>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
