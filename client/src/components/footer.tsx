import { Link } from "wouter";
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-white font-bold text-2xl mr-1">Minutely</span>
              <span className="text-secondary text-xl font-light">.xyz</span>
            </div>
            <p className="text-gray-400 mb-6">
              AI-powered news and comparison platform focusing on tech, products, travel, and finance for US/UK audiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white">News</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">Products</Link>
              </li>
              <li>
                <Link href="/travel" className="text-gray-400 hover:text-white">Travel</Link>
              </li>
              <li>
                <Link href="/finance" className="text-gray-400 hover:text-white">Finance</Link>
              </li>
              <li>
                <Link href="/challenges" className="text-gray-400 hover:text-white">Challenges</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-gray-400 hover:text-white">API Documentation</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail className="mr-3 h-5 w-5" />
                <a href="mailto:info@minutely.xyz" className="hover:text-white">info@minutely.xyz</a>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="mr-3 h-5 w-5" />
                <span>123 Tech Street, London, UK</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Download Our App</h4>
              <div className="flex space-x-3">
                <a href="#" className="flex items-center justify-center h-10 w-32 bg-neutral-medium/20 hover:bg-neutral-medium/30 rounded text-sm">
                  App Store
                </a>
                <a href="#" className="flex items-center justify-center h-10 w-32 bg-neutral-medium/20 hover:bg-neutral-medium/30 rounded text-sm">
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Minutely.xyz. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
