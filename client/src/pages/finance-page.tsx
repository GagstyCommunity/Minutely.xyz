import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { Article, Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import NewsletterCTA from "@/components/newsletter-cta";

export default function FinancePage() {
  // Set page title
  useEffect(() => {
    document.title = "Finance News | Minutely.xyz";
  }, []);
  
  // Find finance category ID
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  const financeCategory = categories?.find(cat => cat.slug === "finance");
  
  // Fetch finance articles if category exists
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/category", financeCategory?.id],
    enabled: !!financeCategory?.id,
  });
  
  // Fetch all articles as fallback
  const { data: allArticles, isLoading: isLoadingAll } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    enabled: !financeCategory?.id,
  });
  
  const displayArticles = financeCategory?.id ? articles : allArticles;
  const isLoadingArticles = financeCategory?.id ? isLoading : isLoadingAll;
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark mb-4">Finance News</h1>
            <p className="text-lg text-neutral-medium">Latest insights, market trends, and personal finance advice</p>
          </header>
          
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2">
                <h2 className="text-2xl font-bold text-neutral-dark mb-6">Latest Finance Stories</h2>
                
                {isLoadingArticles ? (
                  // Skeleton loading state for articles
                  <div className="space-y-6">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex mb-4">
                          <Skeleton className="h-24 w-24 rounded-lg" />
                          <div className="ml-4 flex-grow">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    ))}
                  </div>
                ) : displayArticles && displayArticles.length > 0 ? (
                  // Articles list
                  <div className="space-y-6">
                    {displayArticles.map((article) => (
                      <Link key={article.id} href={`/news/${article.slug}`}>
                        <a className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row">
                              {article.imageUrl && (
                                <div className="w-full md:w-24 h-40 md:h-24 mb-4 md:mb-0 flex-shrink-0">
                                  <img 
                                    src={article.imageUrl} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </div>
                              )}
                              <div className={article.imageUrl ? "md:ml-4" : ""}>
                                <h3 className="font-bold text-neutral-dark text-xl mb-2">{article.title}</h3>
                                {article.excerpt && (
                                  <p className="text-neutral-medium text-sm line-clamp-2 mb-2">{article.excerpt}</p>
                                )}
                                <div className="flex items-center text-sm text-neutral-medium">
                                  {article.readTime && (
                                    <span className="flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      {article.readTime} min read
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                ) : (
                  // Empty state
                  <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-medium mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <h3 className="text-xl font-bold text-neutral-dark mb-2">No finance articles yet</h3>
                    <p className="text-neutral-medium">Check back soon for the latest financial insights</p>
                  </div>
                )}
              </div>
              
              <div>
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">Market Insights</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="font-medium">S&P 500</span>
                      <div className="flex items-center text-green-500">
                        <span>4,783.45</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="font-medium">NASDAQ</span>
                      <div className="flex items-center text-green-500">
                        <span>16,741.52</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="font-medium">Dow Jones</span>
                      <div className="flex items-center text-red-500">
                        <span>37,430.19</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="font-medium">Bitcoin</span>
                      <div className="flex items-center text-green-500">
                        <span>$65,832.47</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Gold</span>
                      <div className="flex items-center text-green-500">
                        <span>$2,319.85</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-neutral-medium text-right">
                    <span>Last updated: May 6, 2025</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">Financial Topics</h3>
                  
                  <div className="space-y-2">
                    <a href="#" className="block py-2 px-3 rounded-lg bg-neutral-light hover:bg-primary hover:text-white transition-colors">
                      Personal Finance
                    </a>
                    <a href="#" className="block py-2 px-3 rounded-lg bg-neutral-light hover:bg-primary hover:text-white transition-colors">
                      Investing
                    </a>
                    <a href="#" className="block py-2 px-3 rounded-lg bg-neutral-light hover:bg-primary hover:text-white transition-colors">
                      Retirement
                    </a>
                    <a href="#" className="block py-2 px-3 rounded-lg bg-neutral-light hover:bg-primary hover:text-white transition-colors">
                      Cryptocurrencies
                    </a>
                    <a href="#" className="block py-2 px-3 rounded-lg bg-neutral-light hover:bg-primary hover:text-white transition-colors">
                      Real Estate
                    </a>
                    <a href="#" className="block py-2 px-3 rounded-lg bg-neutral-light hover:bg-primary hover:text-white transition-colors">
                      Taxes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <NewsletterCTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}