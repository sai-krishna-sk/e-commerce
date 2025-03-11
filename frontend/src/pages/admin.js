// pages/admin.js
import AdminPanel from "@/components/AdminPanel";
import withAuthAdminProtection from "@/utils/withAuthAdminProtection";
import Navbar from "@/components/Navbar";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50">
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-serif font-light text-rose-800 mb-4">Admin Dashboard</h1>
          <div className="w-24 h-px bg-rose-300 mx-auto"></div>
        </div>
        <AdminPanel />
      </div>
    </div>
  );
};

// Wrap the component with the admin protection HOC
export default withAuthAdminProtection(AdminPage);
