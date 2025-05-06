import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import ProductsPage from "@/pages/products-page";
import TravelPage from "@/pages/travel-page";
import FinancePage from "@/pages/finance-page";
import ChallengesPage from "@/pages/challenges-page";
import ArticlePage from "@/pages/article-page";
import ProductPage from "@/pages/product-page";

function Router() {
  return (
    <Switch>
      {/* Home and category pages */}
      <Route path="/" component={HomePage} />
      <Route path="/news" component={HomePage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/travel" component={TravelPage} />
      <Route path="/finance" component={FinancePage} />
      <Route path="/challenges" component={ChallengesPage} />
      
      {/* Individual items pages */}
      <Route path="/news/:slug" component={ArticlePage} />
      <Route path="/products/:id" component={ProductPage} />
      
      {/* Category specific pages */}
      <Route path="/news/category/:categoryId" component={HomePage} />
      <Route path="/products/category/:categoryId" component={ProductsPage} />
      
      {/* User pages */}
      <Route path="/dashboard" component={HomePage} />
      <Route path="/profile" component={HomePage} />
      <Route path="/admin" component={HomePage} />
      
      {/* Auth page for non-authenticated users */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
