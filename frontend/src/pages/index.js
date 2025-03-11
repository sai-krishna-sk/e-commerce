// pages/index.js
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/utils/api";
import ImageCarousel from "@/components/ImageCarousel";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const productsHeadingRef = useRef(null);
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

  const scrollToProducts = () => {
    productsHeadingRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleCategoryToggle = () => {
    setIsTransitioning(true);
    setShowAllCategories(!showAllCategories);
    
    // If we're showing more categories, scroll to make them visible
    if (!showAllCategories && categoriesContainerRef.current) {
      setTimeout(() => {
        categoriesContainerRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'  // Changed from 'nearest' to 'start'
        });
      }, 100);
    }
    
    // If we're hiding categories, scroll up to see the beginning of the categories
    if (showAllCategories && categoriesContainerRef.current) {
      setTimeout(() => {
        categoriesContainerRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const categories = [
    { id: 1, name: "Necklaces", image: "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/necklace.jpg" },
    { id: 2, name: "Rings", image: "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/ring.jpg" },
    { id: 3, name: "Earrings", image: "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/earring.jpg" },
    { id: 4, name: "Bracelets", image: "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/braclets.jpg" },
    { id: 5, name: "Watches", image: "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/watches.jpg" },
    { id: 6, name: "Anklets", image: "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/anklets.jpg" },
    { id: 7, name: "Hairpins ", image: "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/hairpin.webp" },
    { id: 8, name: "Pendants", image: "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/Pendants.avif" }
  ];

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 3);

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* Soft white background */}
      <div className="fixed inset-0 z-0">
        {/* Plain white background */}
        <div className="absolute inset-0 bg-white"></div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-white opacity-30"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative h-160 w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/DeWatermark.ai_1741710171184.png')] bg-cover bg-center opacity-90"></div>
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-serif text-white-800 mb-4">TIMELESS ELEGANCE</h1>
            <p className="text-xl text-white-300 max-w-2xl">Discover our exquisite collection of handcrafted jewelry pieces</p>
            <button 
              onClick={scrollToProducts}
              className="mt-8 bg-rose-400 hover:bg-rose-500 text-white py-3 px-8 rounded-md font-medium transition-all duration-500 hover:shadow-[0_10px_15px_-3px_rgba(244,63,94,0.1)]">
              SHOP PRODUCTS
            </button>
          </div>
        </div>
        
        <main className="container mx-auto px-4 py-16">
          <div className="mb-16 text-center" id="collections-section">
            <h2 className="text-3xl font-serif font-light text-rose-700 mb-6">OUR COLLECTION</h2>
            <div className="w-26 h-px bg-rose-300 mx-auto"></div>
          </div>
          
          {loading ? (
            <div className="flex justify-center my-16">
              <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-400 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-6 rounded-md border border-red-200 my-8 text-center">
              {error}
            </div>
          ) : (
            <>
              {/* Categories Section */}
              <div className="mb-8" ref={categoriesContainerRef}>
                {/* First row - always visible */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {categories.slice(0, 3).map(category => (
                    <div 
                      key={category.id} 
                      className="relative h-64 rounded-lg overflow-hidden group cursor-pointer shadow-[0_4px_6px_-1px_rgba(244,63,94,0.1)] transition-all duration-500 hover:shadow-[0_20px_25px_-5px_rgba(244,63,94,0.1)]"
                      onClick={scrollToProducts}
                    >
                      {/* Changed to rose overlay on hover instead of dimming */}
                      <div className="absolute inset-0 bg-transparent group-hover:bg-rose-500/40 transition-all duration-500 z-10"></div>
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
                        <h3 className="text-xl font-serif text-rose-500 group-hover:text-white">{category.name}</h3>
                        <div className="w-12 h-px bg-white mt-2 opacity-80 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Second row - with improved transition */}
                <div 
                  className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 transition-all duration-700 ease-out
                            ${showAllCategories ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}
                  style={{ 
                    transition: 'max-height 0.7s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1), margin-bottom 0.7s ease',
                    visibility: showAllCategories ? 'visible' : 'hidden',
                    transitionDelay: showAllCategories ? '0.1s' : '0s',
                    overflow: 'hidden'  // Add this to control the content during transition
                  }}
                >
                  {categories.slice(3).map((category, index) => (
                    <div 
                      key={category.id} 
                      className="relative h-64 rounded-lg overflow-hidden group cursor-pointer shadow-[0_4px_6px_-1px_rgba(244,63,94,0.1)] hover:shadow-[0_20px_25px_-5px_rgba(244,63,94,0.1)]"
                      onClick={scrollToProducts}
                      style={{ 
                        transform: showAllCategories ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                        opacity: showAllCategories ? 1 : 0,
                        transition: 'transform 0.7s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.7s ease, box-shadow 0.5s ease',
                        transitionDelay: `${index * 150}ms`
                      }}
                    >
                      {/* Changed to rose overlay on hover instead of dimming */}
                      <div className="absolute inset-0 bg-transparent group-hover:bg-rose-500/40 transition-all duration-500 z-10"></div>
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
                        <h3 className="text-xl font-serif text-rose-500 group-hover:text-white">{category.name}</h3>
                        <div className="w-12 h-px bg-white mt-2 opacity-80 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* View More Toggle Button */}
              <div className="text-center mb-16">
                <button 
                  onClick={handleCategoryToggle}
                  disabled={isTransitioning}
                  className="px-8 py-3 border border-rose-300 text-rose-600 bg-white hover:bg-rose-300 hover:text-white rounded-md transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-[0_10px_15px_-3px_rgba(244,63,94,0.1)] disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-opacity-50"
                >
                  <span className="inline-flex items-center font-serif tracking-wider">
                    {showAllCategories ? "SHOW LESS" : "VIEW MORE"}
                    <svg 
                      className={`ml-2 w-4 h-4 transition-transform duration-500 ${showAllCategories ? 'rotate-180' : 'rotate-0'}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-serif font-light text-rose-700 mb-6">FEATURED ELEGANCE</h2>
                  <div className="w-26 h-px bg-rose-300 mx-auto"></div>
                </div>
                <ImageCarousel 
                  images={[
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/1.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/12.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/10.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/2.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/11.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/5.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/7.avif",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/8.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/9.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/3.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/6.jpg",
                    "https://raw.githubusercontent.com/sai-krishna-sk/e-commerce/refs/heads/main/public/images/featured/4.jpg",
                  ]} 
                />
              </div>
              
              {/* Our Products Title */}
              <div className="mb-12 text-center" ref={productsHeadingRef} id="products-section">
                <h2 className="text-3xl font-serif font-light text-rose-700 mb-6">OUR PRODUCTS</h2>
                <div className="w-26 h-px bg-rose-300 mx-auto"></div>
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
                {products.length === 0 && (
                  <div className="col-span-full text-center py-16">
                    <p className="text-xl text-rose-600">Our new collection is coming soon.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
        
        {/* Testimonial Section */}
        <section className="bg-rose-100 text-rose-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif mb-10">WHAT OUR CUSTOMERS SAY</h2>
            <div className="max-w-4xl mx-auto italic text-xl font-light">
              "The craftsmanship of these pieces is truly exceptional. I receive compliments every time I wear my necklace."
              <div className="mt-6 font-normal text-base">— Emily S.</div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-rose-50 text-rose-700 py-12">
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
                  <a href="#" className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="sr-only">Instagram</span>
                    {/* Icon would go here */}
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="sr-only">Facebook</span>
                    {/* Icon would go here */}
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="sr-only">Pinterest</span>
                    {/* Icon would go here */}
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-rose-200 mt-10 pt-6 text-center opacity-60 text-sm">
              © 2025 Elegance Jewelry. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
