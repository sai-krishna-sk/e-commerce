// components/AdminPanel.js
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchProducts } from "@/utils/api";

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
      const response = await fetch("http://127.0.0.1:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, price: Number(price), image }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Product added successfully!");
        // Reset form fields
        setName("");
        setPrice("");
        setImage("");
        // Reload products list
        loadProducts();
      } else {
        setMessage(data.error || "Failed to add product");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        // Remove product from local state
        setProducts(products.filter(product => product._id !== productId));
        setMessage("Product deleted successfully!");
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to delete product");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">      
      {/* Add Product Form */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-serif text-amber-900 mb-6">Add New Jewelry Piece</h2>
        {message && (
          <div className={`mb-6 p-4 ${message.includes("success") ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"} rounded-md`}>
            {message}
          </div>
        )}
        <form onSubmit={handleAddProduct} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 p-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 p-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 p-3"
              required
            />
          </div>
          <button 
            type="submit"
            className="bg-amber-700 text-white py-3 px-6 rounded-md hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
      
      {/* Products List */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-serif text-amber-900 mb-6">Manage Inventory</h2>
        {loading ? (
          <div className="flex justify-center my-10">
            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(product => (
              <div key={product._id} className="border border-amber-100 rounded-lg p-4 flex items-center bg-amber-50/50">
                <div className="w-20 h-20 overflow-hidden rounded-md mr-4 bg-white">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-amber-900">{product.name}</h3>
                  <p className="text-amber-700 font-serif">${product.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-amber-700 text-white py-2 px-3 rounded-md hover:bg-amber-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p className="col-span-2 text-center text-amber-600 py-8">No products available in inventory.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;