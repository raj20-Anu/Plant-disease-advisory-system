import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import GoogleTranslate from "./components/ui/GoogleTranslate";
const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8  animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
         <GoogleTranslate />
        <BrowserRouter>
          <Routes>
            <Route
              path="/auth"
              element={!session ? <Auth /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={session ? <Dashboard /> : <Navigate to="/auth" />}
            >
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="prediction" element={<Prediction />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route
              path="/"
              element={<Navigate to={session ? "/dashboard" : "/auth"} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
