import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera, User } from "lucide-react";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("No user found");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") throw error; // ignore "no rows found"

    // Combine Supabase auth email + profile data
    const combinedProfile = {
      ...data,
      id: user.id,
      email: user.email, // <-- add email from auth
    };

    setProfile(combinedProfile);
    setFullName(combinedProfile.full_name || "");
    setPhoneNumber(combinedProfile.phone_number || "");
  } catch (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  }
};
useEffect(() => {
  fetchProfile();

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      fetchProfile(); // re-fetch when user logs in/out
    }
  });

  return () => listener.subscription.unsubscribe();
}, []);


  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setUploading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage (you'd need to set up a storage bucket)
      // For now, we'll use a placeholder URL
      const avatarUrl = URL.createObjectURL(file);

      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", user.id);

      if (error) throw error;

      setProfile({ ...profile, avatar_url: avatarUrl });

      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone_number: phoneNumber,
        })
        .eq("id", user.id);

      if (error) throw error;

      setProfile({
        ...profile,
        full_name: fullName,
        phone_number: phoneNumber,
      });

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
          <CardDescription>Upload or change your profile picture</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="h-32 w-32 ring-4 ring-primary/20">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                {profile?.full_name?.[0]?.toUpperCase() || <User className="h-12 w-12" />}
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
            >
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Click the camera icon to upload a new photo
          </p>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile?.email || "Loading..."}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
