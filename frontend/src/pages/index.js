// pages/index.js
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const productsHeadingRef = useRef(null); // New ref for the products heading
  const categoriesContainerRef = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Updated to scroll to the products heading instead of the grid
  const scrollToProducts = () => {
    productsHeadingRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' // Ensures we scroll to the start of the heading
    });
  };

  // Handle the transition state
  const handleCategoryToggle = () => {
    setIsTransitioning(true);
    setShowAllCategories(!showAllCategories);
    
    // Scroll to view new categories when expanding
    if (!showAllCategories && categoriesContainerRef.current) {
      setTimeout(() => {
        categoriesContainerRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 100);
    }
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Slightly longer than transition duration
  };

  // All available categories with first letter capitalization
  const categories = [
    { id: 1, name: "Necklaces", image: "/images/necklaces.jpg" },
    { id: 2, name: "Rings", image: "/images/rings.jpg" },
    { id: 3, name: "Earrings", image: "/images/earrings.jpg" },
    { id: 4, name: "Bracelets", image: "/images/bracelets.jpg" },
    { id: 5, name: "Watches", image: "/images/watches.jpg" },
    { id: 6, name: "Anklets", image: "/images/anklets.jpg" }
  ];

  // Get visible categories based on toggle state
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-160 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/premium-photo/luxury-jewelry-black-friday-advertisement-commercial-photography_950002-326749.jpg?w=1060')] bg-cover bg-center"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">TIMELESS ELEGANCE</h1>
          <p className="text-xl text-white max-w-2xl">Discover our exquisite collection of handcrafted jewelry pieces</p>
          <button 
            onClick={scrollToProducts}
            className="mt-8 bg-amber-700 hover:bg-amber-800 text-white py-3 px-8 rounded-md font-medium transition-all duration-500 hover:shadow-lg">
            SHOP COLLECTION
          </button>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center"  id="collections-section">
          <h2 className="text-3xl font-serif font-light text-amber-900 mb-6">OUR COLLECTION</h2>
          <div className="w-26 h-px bg-amber-700 mx-auto"></div>
        </div>
        
        {loading ? (
          <div className="flex justify-center my-16">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-6 rounded-md border border-red-200 my-8 text-center">
            {error}
          </div>
        ) : (
          <>
            {/* Categories Section with Improved Transitions */}
            <div className="mb-8" ref={categoriesContainerRef}>
              {/* First row - always visible */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {categories.slice(0, 3).map(category => (
                  <div 
                    key={category.id} 
                    className="relative h-64 rounded-lg overflow-hidden group cursor-pointer shadow-md transition-all duration-500 hover:shadow-xl"
                    onClick={scrollToProducts}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500 z-10"></div>
                    <div 
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" 
                      style={{ 
                        backgroundImage: `url(${category.image})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }}
                    ></div>
                    {/* Glass reflection effect overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-20"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
                        transform: 'translateY(100%)',
                      }}
                    ></div>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-all duration-700 z-20 overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
                        transformOrigin: 'top left',
                        transform: 'translateX(-100%) translateY(-100%) rotate(45deg)',
                      }}
                    ></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-30 transform transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <h3 className="text-xl font-serif text-white">{category.name}</h3>
                      <div className="w-12 h-px bg-white mt-2 opacity-80 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Second row - with improved transition */}
              <div 
                className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 transition-all duration-700 ease-out
                          ${showAllCategories ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ 
                  transition: 'max-height 0.7s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
                  visibility: showAllCategories ? 'visible' : 'hidden',
                  transitionDelay: showAllCategories ? '0.1s' : '0s'
                }}
              >
                {categories.slice(3).map((category, index) => (
                  <div 
                    key={category.id} 
                    className="relative h-56 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl"
                    onClick={scrollToProducts}
                    style={{ 
                      transform: showAllCategories ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                      opacity: showAllCategories ? 1 : 0,
                      transition: 'transform 0.7s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.7s ease, box-shadow 0.5s ease',
                      transitionDelay: `${index * 150}ms`
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500 z-10"></div>
                    <div 
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" 
                      style={{ 
                        backgroundImage: `url(${category.image})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }}
                    ></div>
                    {/* Glass reflection effect overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-20"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
                        transform: 'translateY(100%)',
                      }}
                    ></div>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-all duration-700 z-20 overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
                        transformOrigin: 'top left',
                        transform: 'translateX(-100%) translateY(-100%) rotate(45deg)',
                      }}
                    ></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                      <h3 className="text-xl font-serif text-white">{category.name}</h3>
                      <div className="w-12 h-px bg-white mt-2 opacity-80 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* View More Toggle Button - Enhanced for luxury feel */}
            <div className="text-center mb-16">
              <button 
                onClick={handleCategoryToggle}
                disabled={isTransitioning}
                className="px-8 py-3 border border-amber-700 text-amber-800 hover:bg-amber-700 hover:text-white rounded-md transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-lg disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50"
                style={{
                  background: 'linear-gradient(to right, transparent 50%, rgba(180, 83, 9, 0.1) 50%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: showAllCategories ? 'left bottom' : 'right bottom',
                  transition: 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
                }}
              >
                <span className="inline-flex items-center font-serif tracking-wider">
                  {showAllCategories ? "SHOW LESS" : "VIEW MORE"}
                  <svg 
                    className={`ml-2 w-4 h-4 transition-transform duration-500 ${showAllCategories ? 'rotate-180' : 'rotate-0'}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)'
                    }}
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
            
            {/* Our Products Title - Added ref for scroll target */}
            <div className="mb-12 text-center" ref={productsHeadingRef} id="products-section">
              <h2 className="text-3xl font-serif font-light text-amber-900 mb-6">OUR PRODUCTS</h2>
              <div className="w-26 h-px bg-amber-700 mx-auto"></div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
              {products.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <p className="text-xl text-amber-800">Our new collection is coming soon.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      
      {/* Testimonial Section */}
      <section className="bg-amber-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-10">WHAT OUR CUSTOMERS SAY</h2>
          <div className="max-w-4xl mx-auto italic text-xl font-light">
            "The craftsmanship of these pieces is truly exceptional. I receive compliments every time I wear my necklace."
            <div className="mt-6 font-normal text-base">— Emily S.</div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">ABOUT US</h3>
              <p className="opacity-80">Crafting timeless jewelry pieces since 1995. Each piece tells a unique story.</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">CUSTOMER CARE</h3>
              <ul className="opacity-80 space-y-2">
                <li>Shipping & Returns</li>
                <li>Care Instructions</li>
                <li>Size Guide</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">CONNECT WITH US</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-amber-800 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <span className="sr-only">Instagram</span>
                  {/* Icon would go here */}
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-amber-800 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <span className="sr-only">Facebook</span>
                  {/* Icon would go here */}
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-amber-800 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <span className="sr-only">Pinterest</span>
                  {/* Icon would go here */}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-10 pt-6 text-center opacity-60 text-sm">
            © 2025 Elegance Jewelry. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}