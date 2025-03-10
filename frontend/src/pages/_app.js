// pages/_app.js
import { AuthProvider } from "@/context/AuthContext";  // Import AuthContext
import { CartProvider } from "@/context/CartContext";  // Import CartContext
import "@/styles/globals.css";  // Your global styles

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
