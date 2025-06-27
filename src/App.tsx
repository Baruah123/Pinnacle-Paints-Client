
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { AnimationManager } from "@/lib/performance";
import { ShopProvider } from "@/contexts/ShopContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Story from "./pages/Story";
import Sustainability from "./pages/Sustainability";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import OrganicPaints from "./pages/OrganicPaints";
import WoodFinishes from "./pages/WoodFinishes";
import IndustrialPaints from "./pages/IndustrialPaints";
import TraditionalPaints from "./pages/TraditionalPaints";
import Collections from "./pages/PaintCollectionsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import FloorCoatings from "./pages/FloorCoatings";
import SprayEquipment from "./pages/SprayEquipment";
import CommercialResidential from "./pages/CommercialResidential";
import { AdminProvider } from "@/contexts/AdminContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CategoryProvider } from "@/contexts/CategoryContext";

// Product Category Pages
import DecorativePaints from "./pages/products/DecorativePaints";
import EcoFriendlyPaints from "./pages/products/EcoFriendlyPaints";
import IndustrialSolutions from "./pages/products/IndustrialSolutions";

// Vendor Pages
import PremeraFloorCoatings from "./pages/vendors/PremeraFloorCoatings";
import EndurableFloorCoatings from "./pages/vendors/EndurableFloorCoatings";
import Rustoleum from "./pages/vendors/Rustoleum";
import Zinsser from "./pages/vendors/Zinsser";
import InternationalPaints from "./pages/vendors/InternationalPaints";
import DevoeCoatings from "./pages/vendors/DevoeCoatings";
import DiamondCollection from "./pages/vendors/DiamondCollection";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in newer versions)
    },
  },
});

const App = () => {
  useEffect(() => {
    // Cleanup animations on app unmount
    return () => {
      AnimationManager.getInstance().cleanup();
    };
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CategoryProvider>
        <ShopProvider>
          <Toaster />
          <Sonner />
          <PerformanceMonitor />
          <BrowserRouter>
          <Routes>            <Route path="/" element={<Index />} />
            <Route path="/story" element={<Story />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/organic-paints" element={<OrganicPaints />} />
            <Route path="/wood-finishes" element={<WoodFinishes />} />
            <Route path="/industrial-paints" element={<IndustrialPaints />} />
            <Route path="/traditional-paints" element={<TraditionalPaints />} />
            <Route path="/floor-coatings" element={<FloorCoatings />} />
            <Route path="/spray-equipment" element={<SprayEquipment />} />
            <Route path="/commercial-residential" element={<CommercialResidential />} />

            {/* Product Category Routes */}
            <Route path="/products/decorative-paints" element={<DecorativePaints />} />
            <Route path="/products/eco-friendly-paints" element={<EcoFriendlyPaints />} />
            <Route path="/products/industrial-solutions" element={<IndustrialSolutions />} />

            {/* Vendor Routes */}
            <Route path="/vendors/premera-floor-coatings" element={<PremeraFloorCoatings />} />
            <Route path="/vendors/endurable-floor-coatings" element={<EndurableFloorCoatings />} />
            <Route path="/vendors/rustoleum" element={<Rustoleum />} />
            <Route path="/vendors/zinsser" element={<Zinsser />} />
            <Route path="/vendors/international-paints" element={<InternationalPaints />} />
            <Route path="/vendors/devoe-coatings" element={<DevoeCoatings />} />
            <Route path="/vendors/diamond-collection" element={<DiamondCollection />} />

            {/* Checkout Routes */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={
          <AdminProvider>
            <AdminLogin />
          </AdminProvider>
        } />
        <Route path="/admin/dashboard" element={
          <AdminProvider>
            <AdminDashboard />
          </AdminProvider>
        } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ShopProvider>
      </CategoryProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
