import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Product, Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define interface for price comparison data
interface PriceComparison {
  store: string;
  price: number;
  link: string;
  inStock: boolean;
  shipping: string;
  logo: string;
}

export default function ProductPage() {
  const { id } = useParams<{id: string}>();
  const productId = id ? parseInt(id) : 0;
  
  // Fetch product by id
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      const res = await fetch(`/api/products/${productId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      return res.json();
    },
    enabled: !isNaN(productId) && typeof productId === 'number',
  });
  
  // Fetch categories to display product category
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Mock price comparison data
  // In a real app, this would come from an API that scrapes prices
  const [priceComparisons, setPriceComparisons] = useState<PriceComparison[]>([]);
  
  // Set mock price comparison data for demo purposes
  useEffect(() => {
    if (product) {
      // Generate random prices around a base price
      const basePrice = 699.99;
      const mockPriceComparisons: PriceComparison[] = [
        {
          store: "Amazon",
          price: parseFloat((basePrice - Math.random() * 50).toFixed(2)),
          link: "https://amazon.com",
          inStock: true,
          shipping: "Free shipping",
          logo: "/amazon-logo.svg" // This would be an actual logo path in production
        },
        {
          store: "Apple",
          price: parseFloat((basePrice + 20).toFixed(2)),
          link: "https://apple.com",
          inStock: true,
          shipping: "Free shipping",
          logo: "/apple-logo.svg"
        },
        {
          store: "Best Buy",
          price: parseFloat((basePrice - Math.random() * 20).toFixed(2)),
          link: "https://bestbuy.com",
          inStock: true,
          shipping: "$4.99 shipping",
          logo: "/bestbuy-logo.svg"
        },
        {
          store: "eBay",
          price: parseFloat((basePrice - Math.random() * 100).toFixed(2)),
          link: "https://ebay.com",
          inStock: true,
          shipping: "$9.99 shipping",
          logo: "/ebay-logo.svg"
        },
        {
          store: "Walmart",
          price: parseFloat((basePrice - Math.random() * 70).toFixed(2)),
          link: "https://walmart.com",
          inStock: false,
          shipping: "Free shipping",
          logo: "/walmart-logo.svg"
        }
      ];
      
      // Sort by price (lowest first)
      mockPriceComparisons.sort((a, b) => 
        a.inStock === b.inStock ? a.price - b.price : a.inStock ? -1 : 1
      );
      
      setPriceComparisons(mockPriceComparisons);
    }
  }, [product]);
  
  // Set page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Minutely.xyz`;
    } else {
      document.title = "Product | Minutely.xyz";
    }
  }, [product]);
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            // Skeleton loading state
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Skeleton className="aspect-square rounded-xl" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="pt-4">
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            // Error state
            <div className="max-w-3xl mx-auto text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-medium mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-bold text-neutral-dark mb-2">Product Not Found</h2>
              <p className="text-neutral-medium mb-6">The product you're looking for doesn't exist or has been removed.</p>
              <Link href="/products">
                <a className="inline-flex items-center text-primary hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Products
                </a>
              </Link>
            </div>
          ) : product ? (
            // Product content
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Product Image */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="max-w-full max-h-80 object-contain"
                    />
                  ) : (
                    <div className="w-64 h-64 bg-neutral-light rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  {product.categoryId && categories && (
                    <Link href={`/products/category/${product.categoryId}`}>
                      <a className="inline-block px-3 py-1 bg-blue-50 text-primary rounded-full text-sm mb-4 hover:bg-blue-100 transition-colors">
                        {categories.find(c => c.id === product.categoryId)?.name || "General"}
                      </a>
                    </Link>
                  )}
                  
                  <h1 className="text-3xl font-bold text-neutral-dark mb-4">{product.name}</h1>
                  
                  {product.rating && (
                    <div className="flex items-center mb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-neutral-medium ml-2">
                        {product.rating} / 5
                      </span>
                    </div>
                  )}
                  
                  {product.description && (
                    <p className="text-neutral-medium mb-6">{product.description}</p>
                  )}
                  
                  {/* Best Price */}
                  {priceComparisons.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm text-neutral-medium mb-1">Best Price:</p>
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-primary mr-2">
                          ${priceComparisons[0].price}
                        </span>
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          Best Deal
                        </span>
                      </div>
                      <p className="text-sm text-neutral-medium mt-1">
                        at {priceComparisons[0].store} • {priceComparisons[0].shipping}
                      </p>
                    </div>
                  )}
                  
                  <a 
                    href={priceComparisons[0]?.link || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg text-center transition-colors mb-4"
                  >
                    View Best Deal
                  </a>
                  
                  <a 
                    href="#price-comparison" 
                    className="block w-full bg-white hover:bg-neutral-light border border-neutral-medium text-neutral-dark font-medium py-3 px-4 rounded-lg text-center transition-colors"
                  >
                    Compare All Prices
                  </a>
                </div>
              </div>
              
              {/* Price Comparison Table */}
              <div id="price-comparison" className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-neutral-dark mb-6">Price Comparison</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="pb-2 text-left">Store</th>
                        <th className="pb-2 text-left">Price</th>
                        <th className="pb-2 text-left">Shipping</th>
                        <th className="pb-2 text-left">Stock Status</th>
                        <th className="pb-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceComparisons.map((comparison, index) => (
                        <tr 
                          key={comparison.store} 
                          className={`border-b border-gray-100 ${index === 0 ? 'bg-green-50' : ''}`}
                        >
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-neutral-light rounded-full flex items-center justify-center mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                              </div>
                              <span className="font-medium">{comparison.store}</span>
                              {index === 0 && (
                                <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                  Best Deal
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 font-bold">${comparison.price}</td>
                          <td className="py-4 text-neutral-medium">{comparison.shipping}</td>
                          <td className="py-4">
                            {comparison.inStock ? (
                              <span className="text-green-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                In Stock
                              </span>
                            ) : (
                              <span className="text-red-500 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Out of Stock
                              </span>
                            )}
                          </td>
                          <td className="py-4">
                            <a 
                              href={comparison.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
                            >
                              View Deal
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-xs text-neutral-medium">
                  <p>Prices last updated: May 6, 2025</p>
                  <p>Minutely.xyz may earn a commission on sales made from links on this page.</p>
                </div>
              </div>
              
              {/* Product Details Tabs */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <Tabs defaultValue="specifications">
                  <TabsList className="mb-4">
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="specifications">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-neutral-light p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Display</h4>
                          <p className="text-neutral-medium">6.7-inch Super Retina XDR display</p>
                        </div>
                        <div className="bg-neutral-light p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Processor</h4>
                          <p className="text-neutral-medium">A17 Pro chip</p>
                        </div>
                        <div className="bg-neutral-light p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Camera</h4>
                          <p className="text-neutral-medium">48MP main, 12MP ultra wide, 12MP telephoto</p>
                        </div>
                        <div className="bg-neutral-light p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Battery</h4>
                          <p className="text-neutral-medium">Up to 29 hours video playback</p>
                        </div>
                        <div className="bg-neutral-light p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Storage</h4>
                          <p className="text-neutral-medium">128GB, 256GB, 512GB, 1TB</p>
                        </div>
                        <div className="bg-neutral-light p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Water Resistance</h4>
                          <p className="text-neutral-medium">IP68 (maximum depth of 6 meters up to 30 minutes)</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                          J
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium mr-2">John D.</span>
                            <div className="flex">
                              {Array(5).fill(0).map((_, i) => (
                                <svg 
                                  key={i} 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className={`h-4 w-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-neutral-medium mb-1">
                            Absolutely love this device! The camera quality is amazing and battery life exceeds expectations.
                          </p>
                          <span className="text-xs text-neutral-medium">Posted on May 2, 2025</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold mr-3">
                          S
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium mr-2">Sarah M.</span>
                            <div className="flex">
                              {Array(5).fill(0).map((_, i) => (
                                <svg 
                                  key={i} 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-neutral-medium mb-1">
                            Great phone overall, but I think it's a bit too expensive for what you get. The camera is excellent though.
                          </p>
                          <span className="text-xs text-neutral-medium">Posted on April 28, 2025</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Advanced Camera System</h4>
                          <p className="text-neutral-medium">
                            48MP main camera with multiple lenses for wide, ultra-wide, and telephoto photography options.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">All-Day Battery Life</h4>
                          <p className="text-neutral-medium">
                            Up to 29 hours of video playback and fast charging capabilities.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Durability and Water Resistance</h4>
                          <p className="text-neutral-medium">
                            IP68 water resistance (up to 6 meters for 30 minutes) and Ceramic Shield front cover.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ) : null}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}