import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import Challenges from "@/components/challenges";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { Challenge, Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChallengesPage() {
  // Set page title
  useEffect(() => {
    document.title = "Interactive Challenges | Minutely.xyz";
  }, []);
  
  // Fetch challenges
  const { data: challenges, isLoading } = useQuery<Challenge[]>({
    queryKey: ["/api/challenges"],
  });
  
  // Fetch categories for challenge filtering
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl font-bold text-neutral-dark mb-4">Interactive Challenges</h1>
            <p className="text-lg text-neutral-medium">
              Test your knowledge, earn points, and collect badges with our interactive challenges across multiple categories
            </p>
          </header>
          
          <Challenges />
          
          <section className="py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-dark mb-2">All Challenges</h2>
                <p className="text-neutral-medium mb-4 md:mb-0">Browse all available challenges</p>
              </div>
              
              {categories && categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary text-white rounded-full text-sm cursor-pointer">
                    All
                  </span>
                  {categories.map((category) => (
                    <span 
                      key={category.id} 
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {isLoading ? (
              // Skeleton loading state
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <div className="flex justify-between items-center mt-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : challenges && challenges.length > 0 ? (
              // Challenges grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge) => (
                  <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
                    <a className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-neutral-dark mb-1">{challenge.title}</h3>
                        
                        {challenge.categoryId && categories && (
                          <p className="text-primary text-sm mb-3">
                            {categories.find(c => c.id === challenge.categoryId)?.name || "General"}
                          </p>
                        )}
                        
                        <div className="flex items-center mb-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            challenge.difficultyLevel === "easy" ? "bg-green-100 text-green-700" :
                            challenge.difficultyLevel === "medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {challenge.difficultyLevel || "Medium"}
                          </span>
                          
                          {challenge.questionCount && (
                            <span className="ml-2 text-xs text-neutral-medium">
                              {challenge.questionCount} questions
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          {challenge.points && (
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-medium">{challenge.points} pts</span>
                            </div>
                          )}
                          
                          <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors">
                            Take Challenge
                          </button>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              // Empty state
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-medium mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-xl font-bold text-neutral-dark mb-2">No challenges available</h3>
                <p className="text-neutral-medium">Check back soon for new challenges to test your knowledge</p>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}