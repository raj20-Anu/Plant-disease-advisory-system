import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Scan, MessageSquare, Users, TrendingDown, AlertTriangle } from "lucide-react";
import healthyLeaf from "@/assets/healthyyyyyyyy.jpg";
import diseasedLeaf from "@/assets/unhealthy.jpg";

const Home = () => {
  const stats = [
    {
      icon: Users,
      label: "Farmers Impacted Annually",
      value: "120M+",
      description: "Across Indian states and UTs",
    },
    {
      icon: TrendingDown,
      label: "Estimated Annual Losses",
      value: "₹90,000 Cr+",
      description: "Due to crop diseases and pests in India",
    },
    {
      icon: AlertTriangle,
      label: "Crop Yield Loss",
      value: "15–25%",
      description: "From undetected or unmanaged plant diseases",
    },
  ];



  const steps = [
    {
      icon: Upload,
      title: "Upload Image",
      description: "Take a photo of the affected leaf and upload it to our system",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Scan,
      title: "Get Prediction",
      description: "Our AI analyzes the image and identifies potential diseases",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: MessageSquare,
      title: "Ask Questions",
      description: "Chat with our AI assistant for personalized advice and solutions",
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to CropCare
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered crop disease detection to help protect your harvest and maximize yields
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Healthy vs Diseased Crops</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-primary">Healthy Leaf</CardTitle>
              <CardDescription>Example of a disease-free plant</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <img
                src={healthyLeaf}
                alt="Healthy leaf"
                className="w-full h-64 object-cover"
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-destructive/5">
              <CardTitle className="text-destructive">Diseased Leaf</CardTitle>
              <CardDescription>Example of an infected plant</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <img
                src={diseasedLeaf}
                alt="Diseased leaf"
                className="w-full h-64 object-cover"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-muted-foreground">{index + 1}</span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Why CropCare Matters</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          Crop diseases are a major threat to global food security. Early detection and proper treatment can save
          harvests, reduce losses, and improve farmer livelihoods.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-sm">{stat.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
