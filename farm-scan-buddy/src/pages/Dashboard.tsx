import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Home, FlaskConical, HelpCircle, Leaf, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/auth");
  };

  const navItems = [
    { path: "/dashboard/home", icon: Home, label: "Home" },
    { path: "/dashboard/prediction", icon: FlaskConical, label: "Prediction" },
    { path: "/dashboard/faq", icon: HelpCircle, label: "FAQ" },
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "default" : "ghost"}
          className={`${mobile ? "w-full justify-start" : ""}`}
          onClick={() => {
            navigate(item.path);
            if (mobile) setMobileMenuOpen(false);
          }}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-white">
      <nav className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg hidden sm:inline">CropCare</span>
              </div>

              <div className="hidden md:flex gap-2">
                <NavLinks />
              </div>
            </div>

            <div className="flex items-center gap-3">
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="hidden md:flex"
              >
                <LogOut className="h-5 w-5" />
              </Button>

              <Avatar
                className="cursor-pointer ring-2 ring-primary/20"
                onClick={() => {
                  navigate("/dashboard/profile");
                  setMobileMenuOpen(false);
                }}
              >
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {profile?.full_name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-4 mt-8">
                    <NavLinks mobile />
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
