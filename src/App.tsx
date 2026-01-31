import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import VolunteerSignup from "./pages/VolunteerSignup";
import SponsorAnimal from "./pages/SponsorAnimal";
import SponsorAnimalDetail from "./pages/SponsorAnimalDetail";
import AdminPanel from "./pages/AdminPanel";
import GiftPage from "./pages/GiftPage";
import MarketPage from "./pages/MarketPage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MadeHereForUsPage from "./pages/MadeHereForUsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/volunteer-signup" element={<VolunteerSignup />} />
            <Route path="/sponsor-animal" element={<SponsorAnimal />} />
            <Route path="/sponsor/:animalId" element={<SponsorAnimalDetail />} />
            <Route path="/gift" element={<GiftPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:slug" element={<ProductDetailPage />} />
            <Route path="/made-here-for-us" element={<MadeHereForUsPage />} />
            <Route path="/admin" element={
              <AuthGuard requireAuth>
                <AdminPanel />
              </AuthGuard>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;