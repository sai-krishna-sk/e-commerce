// components/AdminPanel.js
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchProducts, addProduct, deleteProduct } from "@/utils/api";

const AdminPanel = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products on component mount
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load products:", error);
      setMessage("Failed to load products: " + error.message);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      setMessage("You must be logged in as admin to add products");
      return;
    }

    try {
      await addProduct({ name, price: Number(price), image }, user.token);
      
      setMessage("Product added successfully!");
      // Reset form fields
      setName("");
      setPrice("");
      setImage("");
      // Reload products list
      loadProducts();
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!user?.token) {
      setMessage("You must be logged in as admin to delete products");
      return;
    }

    try {
      await deleteProduct(productId, user.token);
      
      // Remove product from local state
      setProducts(products.filter(product => product._id !== productId));
      setMessage("Product deleted successfully!");
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">      
      {/* Add Product Form */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-serif text-rose-900 mb-6">Add New Jewelry Piece</h2>
        {message && (
          <div className={`mb-6 p-4 ${message.includes("success") ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"} rounded-md`}>
            {message}
          </div>
        )}
        <form onSubmit={handleAddProduct} className="space-y-6">
          <div>
            <label className="block text-rose-700 mb-2 text-sm">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 text-rose-900"
              required
            />
          </div>
          <div>
            <label className="block text-rose-700 mb-2 text-sm">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 text-rose-900"
              required
            />
          </div>
          <div>
            <label className="block text-rose-700 mb-2 text-sm">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 text-rose-900"
              required
            />
          </div>
          <button 
            type="submit"
            className="bg-rose-500 text-white py-3 px-6 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
      
      {/* Products List */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-serif text-rose-900 mb-6">Manage Inventory</h2>
        {loading ? (
          <div className="flex justify-center my-10">
            <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(product => (
              <div key={product._id} className="border border-rose-100 rounded-lg p-4 flex items-center bg-rose-50/30">
                <div className="w-20 h-20 overflow-hidden rounded-md mr-4 bg-white">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-rose-900">{product.name}</h3>
                  <p className="text-rose-600 font-serif">${product.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-rose-500 text-white py-2 px-3 rounded-md hover:bg-rose-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p className="col-span-2 text-center text-rose-500 py-8">No products available in inventory.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
