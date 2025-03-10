// utils/withAuthAdminProtection.js
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const withAuthAdminProtection = (Component) => {
  const ProtectedComponent = (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Check auth on component mount
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      } else if (user.role !== 'admin') {
        router.push("/"); // Redirect to home if not an admin
      }
    }, [user, router]);

    // Don't render component until we've checked auth
    if (!user || user.role !== 'admin') {
      return null;
    }

    return <Component {...props} />;
  };

  // Copy display name for better debugging
  ProtectedComponent.displayName = `withAuthAdminProtection(${Component.displayName || Component.name || 'Component'})`;
  
  return ProtectedComponent;
};

export default withAuthAdminProtection;