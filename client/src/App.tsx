import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";

function Router() {
  return (
    <Switch>
      {/* Temporarily using regular Routes instead of ProtectedRoutes */}
      <Route path="/" component={HomePage} />
      <Route path="/news" component={HomePage} />
      <Route path="/products" component={HomePage} />
      <Route path="/travel" component={HomePage} />
      <Route path="/finance" component={HomePage} />
      <Route path="/challenges" component={HomePage} />
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
