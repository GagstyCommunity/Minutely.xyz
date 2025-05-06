import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductComparison() {
  const { data: comparisons, isLoading } = useQuery({
    queryKey: ["/api/product-comparisons"],
  });
  
  return (
    <section className="py-12 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-2">Popular Comparisons</h2>
            <p className="text-neutral-medium mb-4 md:mb-0">Compare top products side-by-side with AI-powered insights</p>
          </div>
          <Link href="/comparisons" className="text-primary hover:underline font-medium">
            View All Comparisons
          </Link>
        </div>
        
        {isLoading ? (
          // Skeleton loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <Skeleton className="w-16 h-16 rounded-full mx-auto mb-2" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </div>
                  <Skeleton className="h-6 w-8" />
                  <div className="text-center">
                    <Skeleton className="w-16 h-16 rounded-full mx-auto mb-2" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="flex-grow mx-4 h-2 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="flex-grow mx-4 h-2 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <Skeleton className="h-6 w-36 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          // Sample product comparisons for demo
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Smartphone Comparison */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-neutral-dark">Smartphones</h3>
                  <span className="text-xs font-medium text-primary bg-blue-50 px-2.5 py-0.5 rounded-full">Tech</span>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-neutral-light rounded-full flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">iPhone 14 Pro</div>
                  </div>
                  
                  <div className="text-xl font-bold text-neutral-medium">VS</div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-neutral-light rounded-full flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">Samsung S23 Ultra</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-medium">Camera Quality</span>
                    <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    <span className="text-sm text-neutral-medium">Performance</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-medium">Battery Life</span>
                    <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-sm text-neutral-medium">Battery Life</span>
                  </div>
                </div>
                
                <Link href="/comparisons/iphone-vs-samsung" className="block text-center py-2 text-primary font-medium hover:underline">
                  View Full Comparison
                </Link>
              </div>
            </div>
            
            {/* Laptop Comparison */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-neutral-dark">Laptops</h3>
                  <span className="text-xs font-medium text-primary bg-blue-50 px-2.5 py-0.5 rounded-full">Tech</span>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-neutral-light rounded-full flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">MacBook Pro</div>
                  </div>
                  
                  <div className="text-xl font-bold text-neutral-medium">VS</div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-neutral-light rounded-full flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">Dell XPS 15</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-medium">Performance</span>
                    <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm text-neutral-medium">Performance</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-medium">Build Quality</span>
                    <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <span className="text-sm text-neutral-medium">Build Quality</span>
                  </div>
                </div>
                
                <Link href="/comparisons/macbook-vs-xps" className="block text-center py-2 text-primary font-medium hover:underline">
                  View Full Comparison
                </Link>
              </div>
            </div>
            
            {/* Smart Watch Comparison */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-neutral-dark">Smart Watches</h3>
                  <span className="text-xs font-medium text-primary bg-blue-50 px-2.5 py-0.5 rounded-full">Tech</span>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-neutral-light rounded-full flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">Apple Watch S8</div>
                  </div>
                  
                  <div className="text-xl font-bold text-neutral-medium">VS</div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-neutral-light rounded-full flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">Galaxy Watch</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-medium">Features</span>
                    <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                    <span className="text-sm text-neutral-medium">Features</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-medium">Battery Life</span>
                    <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm text-neutral-medium">Battery Life</span>
                  </div>
                </div>
                
                <Link href="/comparisons/apple-watch-vs-galaxy" className="block text-center py-2 text-primary font-medium hover:underline">
                  View Full Comparison
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
