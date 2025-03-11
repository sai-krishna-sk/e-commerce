// components/Navbar.js
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Initialize router
  
  // Function to scroll to collections section
  const scrollToCollections = () => {
    // If we're not on the homepage, navigate to it first
    if (router.pathname !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          document.getElementById('collections-section')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      });
    } else {
      // If already on homepage, just scroll
      document.getElementById('collections-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  // Function to scroll to products section
  const scrollToProducts = () => {
    // If we're not on the homepage, navigate to it first
    if (router.pathname !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          document.getElementById('products-section')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      });
    } else {
      // If already on homepage, just scroll
      document.getElementById('products-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="bg-white text-gray-800 py-3 px-8 shadow-md border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-serif tracking-wider mr-8 flex items-center group">
            <span className="text-3xl font-light mr-1 text-rose-400 group-hover:text-rose-500 transition-colors duration-300">E</span>
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">legance Jewelry</span>
          </Link>
          
          {/* Desktop Menu - Modern jewelry styling */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="px-4 py-2 hover:bg-gray-50 rounded-sm transition-colors duration-300 font-light tracking-wide text-sm border-b border-transparent hover:border-rose-300">
              Home
            </Link>
            
            <button 
              onClick={scrollToCollections}
              className="px-4 py-2 rounded-sm transition-all duration-300 font-light tracking-wide text-sm text-gray-700 cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">Our Collections</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-50/0 to-gray-50/0 group-hover:from-gray-50 group-hover:to-gray-50 transform duration-300 ease-out"></span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-rose-300 group-hover:w-full transition-all duration-300 ease-out"></span>
            </button>
            
            <button 
              onClick={scrollToProducts}
              className="px-4 py-2 rounded-sm transition-all duration-300 font-light tracking-wide text-sm text-gray-700 cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">Our Products</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-50/0 to-gray-50/0 group-hover:from-gray-50 group-hover:to-gray-50 transform duration-300 ease-out"></span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-rose-300 group-hover:w-full transition-all duration-300 ease-out"></span>
            </button>
            
            {user?.role === "admin" && (
              <Link href="/admin" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-sm transition-colors duration-300 font-light tracking-wide text-sm text-gray-700 border border-gray-200 hover:border-gray-300">
                Admin
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-gray-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/cart" className="hover:text-rose-400 transition-colors duration-300 relative group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6 group-hover:stroke-rose-400 transition-colors duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-400 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {cartItems.length}
              </span>
            )}
          </Link>
          {user ? (
            <button 
              onClick={logout} 
              className="bg-white px-5 py-2 rounded-sm hover:bg-gray-50 transition-all duration-300 text-gray-700 font-light tracking-wide shadow-sm text-sm border border-gray-200 hover:border-gray-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign Out</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-rose-200 transition-opacity duration-300"></span>
            </button>
          ) : (
            <div className="space-x-4">
              <Link 
                href="/register" 
                className="px-4 py-2 rounded-sm transition-all duration-300 font-light tracking-wide text-sm relative overflow-hidden group text-gray-700"
              >
                <span className="relative z-10">Register</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-rose-300 group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
              <Link 
                href="/login" 
                className="bg-rose-400 px-5 py-2 rounded-sm hover:bg-rose-500 transition-all duration-300 text-white font-light tracking-wide shadow-md text-sm border border-rose-300 hover:border-rose-400 relative overflow-hidden group"
              >
                <span className="relative z-10">Sign In</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></span>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu - Modern jewelry styling */}
      {isMenuOpen && (
        <div className="md:hidden pt-3 pb-2 border-t border-gray-100 mt-3 space-y-2">
          <Link href="/" className="block px-3 py-2 hover:bg-gray-50 rounded-sm transition-colors duration-300 font-light text-sm">
            Home
          </Link>
          
          <button 
            onClick={scrollToCollections}
            className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-sm transition-all duration-300 font-light text-sm text-gray-700 cursor-pointer border-l-2 border-transparent hover:border-rose-300"
          >
            Our Collections
          </button>
          
          <button 
            onClick={scrollToProducts}
            className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-sm transition-all duration-300 font-light text-sm text-gray-700 cursor-pointer border-l-2 border-transparent hover:border-rose-300"
          >
            Our Products
          </button>
          
          {user?.role === "admin" && (
            <Link href="/admin" className="block px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-sm transition-colors duration-300 font-light text-sm text-gray-700 border border-gray-200">
              Admin
            </Link>
          )}
          
          <div className="pt-3 flex items-center justify-between border-t border-gray-100">
            <Link href="/cart" className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-sm">Cart {cartItems.length > 0 && `(${cartItems.length})`}</span>
            </Link>
            {user ? (
              <button 
                onClick={logout} 
                className="bg-white px-4 py-2 rounded-sm hover:bg-gray-50 transition-all duration-300 text-gray-700 font-light text-sm shadow-sm border border-gray-200"
              >
                Sign Out
              </button>
            ) : (
              <div className="space-x-2">
                <Link 
                  href="/register" 
                  className="px-3 py-2 hover:bg-gray-50 rounded-sm transition-colors duration-300 font-light text-sm"
                >
                  Register
                </Link>
                <Link 
                  href="/login" 
                  className="bg-rose-400 px-4 py-2 rounded-sm hover:bg-rose-500 transition-all duration-300 text-white font-light text-sm shadow-md border border-rose-300"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
