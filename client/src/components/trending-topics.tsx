import { Link } from "wouter";
import { Category } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface TrendingTopicsProps {
  categories?: Category[];
}

export default function TrendingTopics({ categories }: TrendingTopicsProps) {
  const { isLoading } = useQuery({
    queryKey: ["/api/categories"],
    enabled: !categories || categories.length === 0,
  });

  return (
    <section className="py-8 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-dark">Trending Topics</h2>
          <Link href="/categories" className="text-primary hover:underline font-medium text-sm hidden md:block">
            View All Topics
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-3 pb-4 -mx-1 px-1 scrollbar-hide">
          {isLoading ? (
            // Skeleton loading state
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="min-w-[150px] flex-shrink-0">
                <Skeleton className="h-24 w-full rounded-lg mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))
          ) : categories && categories.length > 0 ? (
            // Actual categories
            categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="min-w-[150px] flex-shrink-0 group">
                <div className="relative rounded-lg overflow-hidden h-24 mb-2">
                  <img 
                    src={category.imageUrl} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white font-medium">{category.name}</div>
                </div>
                <div className="text-sm text-neutral-medium">{category.articleCount || 0} articles</div>
              </Link>
            ))
          ) : (
            // Fallback categories if no data available
            <div className="text-neutral-medium py-4">No trending topics available at the moment.</div>
          )}
        </div>
        
        <Link href="/categories" className="block text-center text-primary hover:underline font-medium text-sm mt-4 md:hidden">
          View All Topics
        </Link>
      </div>
    </section>
  );
}
