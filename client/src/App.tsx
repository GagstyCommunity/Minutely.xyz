import { Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/news" component={HomePage} />
      <ProtectedRoute path="/products" component={HomePage} />
      <ProtectedRoute path="/travel" component={HomePage} />
      <ProtectedRoute path="/finance" component={HomePage} />
      <ProtectedRoute path="/challenges" component={HomePage} />
      <ProtectedRoute path="/dashboard" component={HomePage} />
      <ProtectedRoute path="/profile" component={HomePage} />
      <ProtectedRoute path="/admin" component={HomePage} />
      
      {/* Auth page for non-authenticated users */}
      <AuthPage path="/auth" />
      
      {/* Fallback to 404 */}
      <NotFound component={NotFound} />
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
