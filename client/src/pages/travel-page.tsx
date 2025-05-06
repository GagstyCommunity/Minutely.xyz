import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import TravelDestinations from "@/components/travel-destinations";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { Destination } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function TravelPage() {
  // Set page title
  useEffect(() => {
    document.title = "Travel Destinations | Minutely.xyz";
  }, []);
  
  // Fetch destinations
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-neutral-dark mb-6">Travel Destinations</h1>
          
          <TravelDestinations />
          
          <section className="py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-dark mb-2">Explore All Destinations</h2>
                <p className="text-neutral-medium mb-4 md:mb-0">Discover amazing places with AI-powered travel insights</p>
              </div>
            </div>
            
            {isLoading ? (
              // Skeleton loading state
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                    <Skeleton className="h-48 w-full rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : destinations && destinations.length > 0 ? (
              // Destinations grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination) => (
                  <Link key={destination.id} href={`/travel/${destination.id}`}>
                    <a className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
                      {destination.imageUrl ? (
                        <img 
                          src={destination.imageUrl} 
                          alt={destination.name} 
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-neutral-light flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-neutral-dark mb-2">{destination.name}</h3>
                        {destination.region && (
                          <p className="text-primary font-medium text-sm mb-2">{destination.region}</p>
                        )}
                        {destination.description && (
                          <p className="text-neutral-medium text-sm line-clamp-2 mb-2">{destination.description}</p>
                        )}
                        {destination.bestTimeToVisit && (
                          <p className="text-sm text-neutral-medium">
                            <span className="font-medium">Best time to visit:</span> {destination.bestTimeToVisit}
                          </p>
                        )}
                        {destination.rating && (
                          <div className="flex items-center mt-2">
                            {Array(5).fill(0).map((_, i) => (
                              <svg 
                                key={i} 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < destination.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        )}
                        {destination.tags && destination.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {destination.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full">
                                {tag}
                              </span>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-neutral-dark mb-2">No destinations yet</h3>
                <p className="text-neutral-medium">Check back soon for travel inspiration</p>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}