// context/CartContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { getCart, removeFromCart, addToCart } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

// Create CartContext
export const CartContext = createContext();

// Create CartProvider component to manage cart state
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.token) {
      // Fetch cart items when the user is logged in
      loadCart();
    } else {
      // Clear cart when user logs out
      setCartItems([]);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user?.token) return;
    
    setLoading(true);
    try {
      const items = await getCart(user.token);
      setCartItems(items);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
    setLoading(false);
  };

  const addProductToCart = async (product) => {
    if (!user?.token) {
      // Redirect to login or show login message if not logged in
      alert("Please log in to add items to your cart");
      return;
    }

    try {
      await addToCart(product._id, user.token);
      await loadCart(); // Reload the entire cart to ensure consistency
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeProductFromCart = async (productId) => {
    if (!user?.token) return;
    
    try {
      await removeFromCart(productId, user.token);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addProductToCart,
        removeProductFromCart,
        loading,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => {
  return useContext(CartContext);
};