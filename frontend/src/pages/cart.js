// pages/cart.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
  const { cartItems, removeProductFromCart, loading, refreshCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Refresh cart data when page loads
    if (user?.token) {
      refreshCart();
    }
  }, [user]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + Number(item.price), 0);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-serif font-light text-amber-900 mb-4">Your Shopping Bag</h1>
          <div className="w-24 h-px bg-amber-700 mx-auto"></div>
        </div>
        
        {loading ? (
          <div className="flex justify-center my-16">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white/60 rounded-lg shadow-sm max-w-xl mx-auto">
            <p className="text-xl text-amber-800 mb-6">Your shopping bag is empty</p>
            <button
              onClick={() => router.push('/')}
              className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-md transition-all font-medium"
            >
              Explore Our Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  removeFromCart={removeProductFromCart} 
                />
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md h-fit">
              <h2 className="text-2xl font-serif mb-6 text-amber-900">Order Summary</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-amber-100">
                <div className="flex justify-between text-amber-800">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-800">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xl font-medium mb-8 text-amber-900">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <button 
                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-md transition-all font-medium"
              >
                Proceed to Checkout
              </button>
              
              <p className="text-center text-amber-700 mt-4 text-sm">
                Secure checkout • Free returns
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}