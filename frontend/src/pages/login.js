// pages/login.js
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { loginUser } from "@/utils/api";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const data = await loginUser(formData);  // API call to login
      if (data.access_token) {
        login(data.access_token, data.role);  // Store both token and role
        if (data.role === "admin") {
          router.push("/admin"); // Redirect admins to admin panel
        } else {
          router.push("/"); // Redirect regular users to homepage
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-rose-50">
      <div className="relative w-full max-w-md p-10 bg-white rounded-lg shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-rose-400"></div>
        <h2 className="text-3xl font-serif text-center mb-8 text-rose-900">Account Login</h2>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-center text-sm border border-red-100">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-rose-700 mb-2 text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 text-rose-900"
              required
            />
          </div>
          <div>
            <label className="block text-rose-700 mb-2 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 text-rose-900 pr-12"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rose-500 hover:text-rose-700 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-rose-500 text-white p-3 rounded-md hover:bg-rose-600 transition-colors font-medium"
          >
            Sign In
          </button>
          <div className="text-center text-rose-600 text-sm space-y-2">
            <p>
              Not registered? <Link href="/register" className="underline hover:text-rose-800">Create an account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
