import DashboardBottomTab from "@/components/main/DashboardBottomTab";
import DashboardSidebar from "@/components/main/DashboardSidebar";
import ProtectedRoute from "@/components/main/ProtectedRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="h-screen flex bg-white text-sm">
        {/* Desktop Sidebar (fixed) */}
        <DashboardSidebar />

        {/* Main content (scrollable) */}
        <div className="w-full lg:ml-20 overflow-y-auto">{children}</div>

        {/* Mobile Bottom Nav */}
        <DashboardBottomTab />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
