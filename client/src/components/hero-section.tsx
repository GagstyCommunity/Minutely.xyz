import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="inline-block bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              AI-Powered Insights
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-neutral-dark leading-tight mb-4">
              Stay ahead with <span className="text-primary">intelligent</span> news & comparisons
            </h1>
            <p className="text-lg text-neutral-medium mb-6">
              Minutely delivers personalized news, product comparisons, and AI-generated insights tailored to your interests. Engage, compare, and make informed decisions in minutes.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg">
                Get started for free
              </Button>
              <Button variant="outline" size="lg">
                <Play className="mr-2 h-4 w-4" />
                See how it works
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl h-72 md:h-96">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="AI-powered news and comparison platform" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-secondary text-white">
                    Trending
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">How AI Is Transforming Product Reviews in 2023</h3>
                  <p className="text-white/80 text-sm mt-2">5 min read • Tech News</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
