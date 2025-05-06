import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Moon, Bell, Menu, X, User, LogOut, Settings } from "lucide-react";
import { User as UserType } from "@shared/schema";

export default function Navbar() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<UserType | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/user');
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // Not logged in or session expired
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await apiRequest('POST', '/api/logout');
      if (res.ok) {
        setUser(null);
        toast({
          title: "Logged out",
          description: "You have been logged out successfully."
        });
        // Redirect to home page
        window.location.href = "/";
      }
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "Could not log out",
        variant: "destructive"
      });
    }
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-bold text-2xl mr-1">Minutely</span>
              <span className="text-secondary text-xl font-light">.xyz</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/news" className={`text-neutral-dark hover:text-primary font-medium ${location === '/news' ? 'text-primary' : ''}`}>
                News
              </Link>
              <Link href="/products" className={`text-neutral-dark hover:text-primary font-medium ${location === '/products' ? 'text-primary' : ''}`}>
                Products
              </Link>
              <Link href="/travel" className={`text-neutral-dark hover:text-primary font-medium ${location === '/travel' ? 'text-primary' : ''}`}>
                Travel
              </Link>
              <Link href="/finance" className={`text-neutral-dark hover:text-primary font-medium ${location === '/finance' ? 'text-primary' : ''}`}>
                Finance
              </Link>
              <Link href="/challenges" className={`text-neutral-dark hover:text-primary font-medium ${location === '/challenges' ? 'text-primary' : ''}`}>
                Challenges
              </Link>
            </div>
          </div>
          
          {/* Navigation for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5 text-neutral-dark" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Moon className="h-5 w-5 text-neutral-dark" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5 text-neutral-dark" />
              <span className="absolute top-0 right-0 bg-destructive text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.displayName || user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/auth">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" className="rounded-full mr-2">
              <Search className="h-5 w-5 text-neutral-dark" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-2">
            <nav className="flex flex-col space-y-3 py-3">
              <Link href="/news" className={`px-3 py-2 text-neutral-dark hover:bg-neutral-light rounded-md ${location === '/news' ? 'font-medium' : ''}`}>
                News
              </Link>
              <Link href="/products" className={`px-3 py-2 text-neutral-dark hover:bg-neutral-light rounded-md ${location === '/products' ? 'font-medium' : ''}`}>
                Products
              </Link>
              <Link href="/travel" className={`px-3 py-2 text-neutral-dark hover:bg-neutral-light rounded-md ${location === '/travel' ? 'font-medium' : ''}`}>
                Travel
              </Link>
              <Link href="/finance" className={`px-3 py-2 text-neutral-dark hover:bg-neutral-light rounded-md ${location === '/finance' ? 'font-medium' : ''}`}>
                Finance
              </Link>
              <Link href="/challenges" className={`px-3 py-2 text-neutral-dark hover:bg-neutral-light rounded-md ${location === '/challenges' ? 'font-medium' : ''}`}>
                Challenges
              </Link>
              
              <div className="border-t border-gray-200 pt-3 flex justify-between px-3">
                {user ? (
                  <div className="space-y-2 w-full">
                    <div className="font-medium">{user?.displayName || user?.username}</div>
                    <div className="space-y-1">
                      <Link href="/profile" className="block py-1 text-neutral-dark hover:text-primary">
                        Profile
                      </Link>
                      <Link href="/dashboard" className="block py-1 text-neutral-dark hover:text-primary">
                        Dashboard
                      </Link>
                      <button onClick={handleLogout} className="block py-1 text-destructive">
                        Log out
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link href="/auth" className="text-neutral-dark hover:text-primary">
                      Sign In
                    </Link>
                    <Link href="/auth">
                      <Button size="sm">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
