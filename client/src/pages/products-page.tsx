import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import ProductComparison from "@/components/product-comparison";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  // Set page title
  useEffect(() => {
    document.title = "Product Comparisons | Minutely.xyz";
  }, []);
  
  // Fetch products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-neutral-dark mb-6">Products</h1>
          
          <ProductComparison />
          
          <section className="py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-dark mb-2">All Products</h2>
                <p className="text-neutral-medium mb-4 md:mb-0">Browse our catalog of products with AI-powered reviews</p>
              </div>
            </div>
            
            {isLoading ? (
              // Skeleton loading state
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                    <Skeleton className="h-40 w-full rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              // Products grid
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <a className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-neutral-light flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-neutral-dark mb-2">{product.name}</h3>
                        {product.description && (
                          <p className="text-neutral-medium text-sm line-clamp-2 mb-2">{product.description}</p>
                        )}
                        {product.rating && (
                          <div className="flex items-center">
                            {Array(5).fill(0).map((_, i) => (
                              <svg 
                                key={i} 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        )}
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              // Empty state
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-medium mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-xl font-bold text-neutral-dark mb-2">No products yet</h3>
                <p className="text-neutral-medium">Check back soon for the latest products</p>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}