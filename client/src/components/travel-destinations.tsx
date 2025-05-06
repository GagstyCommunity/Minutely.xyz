import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TravelDestinations() {
  const { data: destinations, isLoading } = useQuery({
    queryKey: ["/api/destinations"],
  });
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-2">Trending Destinations</h2>
            <p className="text-neutral-medium mb-4 md:mb-0">Discover AI-curated travel recommendations and insights</p>
          </div>
          <Link href="/destinations" className="text-primary hover:underline font-medium">
            Explore All Destinations
          </Link>
        </div>
        
        {isLoading ? (
          // Skeleton loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <Skeleton className="h-6 w-16 rounded-full mr-2" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Sample destinations for demo
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Paris */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <Link href="/destinations/paris" className="block">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" 
                    alt="Paris, France" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-neutral-dark">Paris, France</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-neutral-medium mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-secondary" />
                    <span>Western Europe</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1 text-secondary" />
                    <span>Best time: Apr-Oct</span>
                  </div>
                  <p className="text-neutral-medium text-sm mb-4">Experience the charm of the City of Light with its iconic landmarks, world-class cuisine, and artistic heritage.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200">
                        Culture
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-800 hover:bg-green-100 border-green-200">
                        Food
                      </Badge>
                    </div>
                    <span className="text-primary font-medium text-sm">View Details</span>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Kyoto */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <Link href="/destinations/kyoto" className="block">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5" 
                    alt="Kyoto, Japan" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-neutral-dark">Kyoto, Japan</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-neutral-medium mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-secondary" />
                    <span>East Asia</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1 text-secondary" />
                    <span>Best time: Mar-May, Oct-Nov</span>
                  </div>
                  <p className="text-neutral-medium text-sm mb-4">Discover ancient temples, traditional gardens, and authentic Japanese culture in this historic city.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200">
                        History
                      </Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-800 hover:bg-purple-100 border-purple-200">
                        Architecture
                      </Badge>
                    </div>
                    <span className="text-primary font-medium text-sm">View Details</span>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Santorini */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <Link href="/destinations/santorini" className="block">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1500039136221-2d1050f4972d" 
                    alt="Santorini, Greece" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-neutral-dark">Santorini, Greece</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium">4.7</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-neutral-medium mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-secondary" />
                    <span>Mediterranean</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1 text-secondary" />
                    <span>Best time: May-Oct</span>
                  </div>
                  <p className="text-neutral-medium text-sm mb-4">Experience breathtaking views of white-washed buildings set against the deep blue Aegean Sea in this iconic Greek island.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                        Beach
                      </Badge>
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border-indigo-200">
                        Romance
                      </Badge>
                    </div>
                    <span className="text-primary font-medium text-sm">View Details</span>
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
