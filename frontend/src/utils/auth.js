export const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };
  
  export const saveToken = (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  };
  
  export const removeToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };
  
  export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      return { id: payload.sub, role: payload.role }; // Extract user ID and role
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };
  