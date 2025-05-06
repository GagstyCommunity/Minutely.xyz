import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Article, Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlePage() {
  const { slug } = useParams<{slug: string}>();
  
  // Fetch article by slug
  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ["/api/articles", slug],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${slug}`);
      if (!res.ok) {
        throw new Error("Failed to fetch article");
      }
      return res.json();
    },
  });
  
  // Fetch categories to display article category
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Fetch related articles in the same category
  const { data: relatedArticles } = useQuery<Article[]>({
    queryKey: ["/api/articles/category", article?.categoryId],
    enabled: !!article?.categoryId,
  });
  
  // Filter out current article from related articles
  const filteredRelatedArticles = relatedArticles?.filter(
    (relatedArticle) => relatedArticle.id !== article?.id
  ).slice(0, 3);
  
  // Set page title
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Minutely.xyz`;
    } else {
      document.title = "Article | Minutely.xyz";
    }
  }, [article]);
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            // Skeleton loading state
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-64 w-full mb-6 rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ) : error ? (
            // Error state
            <div className="max-w-3xl mx-auto text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-medium mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-bold text-neutral-dark mb-2">Article Not Found</h2>
              <p className="text-neutral-medium mb-6">The article you're looking for doesn't exist or has been removed.</p>
              <Link href="/news">
                <a className="inline-flex items-center text-primary hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to News
                </a>
              </Link>
            </div>
          ) : article ? (
            // Article content
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <article className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                    {article.categoryId && categories && (
                      <Link href={`/news/category/${article.categoryId}`}>
                        <a className="inline-block px-3 py-1 bg-blue-50 text-primary rounded-full text-sm mb-4 hover:bg-blue-100 transition-colors">
                          {categories.find(c => c.id === article.categoryId)?.name || "General"}
                        </a>
                      </Link>
                    )}
                    
                    <h1 className="text-3xl font-bold text-neutral-dark mb-4">{article.title}</h1>
                    
                    <div className="flex items-center text-neutral-medium mb-6">
                      {article.readTime && (
                        <span className="flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {article.readTime} min read
                        </span>
                      )}
                      
                      {article.createdAt && (
                        <span className="ml-4 text-sm">
                          {new Date(article.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </span>
                      )}
                    </div>
                    
                    {article.imageUrl && (
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-auto rounded-xl mb-6 object-cover"
                      />
                    )}
                    
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                    
                    <div className="flex justify-center mt-8 pt-4 border-t border-gray-100">
                      <div className="flex space-x-3">
                        <button className="flex items-center text-neutral-medium hover:text-neutral-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          Like
                        </button>
                        <button className="flex items-center text-neutral-medium hover:text-neutral-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Share
                        </button>
                        <button className="flex items-center text-neutral-medium hover:text-neutral-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          Save
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
                
                <div>
                  {filteredRelatedArticles && filteredRelatedArticles.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                      <h3 className="text-xl font-bold text-neutral-dark mb-4">Related Articles</h3>
                      
                      <div className="space-y-4">
                        {filteredRelatedArticles.map((relatedArticle) => (
                          <Link key={relatedArticle.id} href={`/news/${relatedArticle.slug}`}>
                            <a className="block hover:bg-neutral-light rounded-lg p-2 transition-colors">
                              <div className="flex items-start">
                                {relatedArticle.imageUrl && (
                                  <img 
                                    src={relatedArticle.imageUrl} 
                                    alt={relatedArticle.title} 
                                    className="w-16 h-16 object-cover rounded-lg mr-3"
                                  />
                                )}
                                <div>
                                  <h4 className="font-medium text-neutral-dark line-clamp-2">{relatedArticle.title}</h4>
                                  {relatedArticle.readTime && (
                                    <span className="text-xs text-neutral-medium">
                                      {relatedArticle.readTime} min read
                                    </span>
                                  )}
                                </div>
                              </div>
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-neutral-dark text-white rounded-xl overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">Newsletter</h3>
                      <p className="text-gray-300 mb-4">Get the latest news and updates delivered to your inbox</p>
                      
                      <form>
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}