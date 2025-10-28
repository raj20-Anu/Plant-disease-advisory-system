import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

const crops = [
  "🍅 Tomato",
  "🍒 Cherry",
  "🍎 Apple",
  "🌶️ Pepper",
  "🥔 Potato",
  "🫐 Blueberry",
  "🌽 Corn",
  "🍇 Grape",
  "🍊 Orange",
  "🍑 Peach",
  "🍓 Raspberry",
  "🌱 Soybean",
  "🎃 Squash",
  "🍓 Strawberry",
];


const Prediction = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!selectedCrop || !selectedFile) {
      toast({
        title: "Missing information",
        description: "Please select a crop and upload an image",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);

    // Simulate AI analysis (in production, this would call your backend)
    try {
  const formData = new FormData();
  formData.append("file", selectedFile);

  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    
    body: formData,
  });

  const data = await response.json();

  setResult({
    disease: data.class || "Unknown",
    confidence: `${(data.confidence).toFixed(2)}%`,
    solution: data.solution || "No solution provided.",
    precautions: data.precautions || "No precautions available.",
  });

  toast({
    title: "Analysis complete",
    description: "Disease detected successfully",
  });
} catch (error) {
  console.error(error);
  toast({
    title: "Error",
    description: "Failed to analyze image. Please check your backend.",
    variant: "destructive",
  });
} finally {
  setAnalyzing(false);
};
  };


  
 const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const newChat = [...chatHistory, { role: "user", content: chatMessage }];
    setChatHistory(newChat);
    setChatMessage("");

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: chatMessage,
          language: "en", // optional — if your backend supports multilingual
        }),
      });

      if (!res.ok) throw new Error("Failed to connect to backend");

      const data = await res.json();

      setChatHistory([
        ...newChat,
        { role: "assistant", content: data.response || "No response from AI." },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory([
        ...newChat,
        { role: "assistant", content: "⚠ Unable to connect to AI server. Please check your backend." },
      ]);
    }
  };



  return (
    <div className="space-y-6 pb-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Crop Disease Prediction</h1>
        <p className="text-muted-foreground">
          Upload a leaf image to detect diseases and get expert solutions
        </p>
      </div>


 {/* chnages to button type */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2">
           <CardHeader>
             <CardTitle>Upload & Analyze</CardTitle>
               <CardDescription>
                  Select your crop and upload a clear image of the leaf
               </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
               <div className="space-y-2">
                 <Label>Select Crop</Label>

                {/* Crop Buttons (Translation-safe) */}
                 <div className="flex flex-wrap justify-start gap-3 mt-3">
                   {crops.map((crop) => (
                    <Button
                      key={crop}
                      variant={selectedCrop === crop ? "default" : "outline"}
                      className={`flex-1 sm:flex-none min-w-[100px] px-5 py-3 rounded-xl text-base font-semibold 
          transition-all duration-200 text-white ${
                      selectedCrop === crop
                         ? "bg-green-600 text-white hover:bg-green-700"
                         : "bg-green-700 text-white border border-green-800 hover:bg-green-500"
                    }`}
                    onClick={() => setSelectedCrop(crop)}
                   >
              {crop}
            </Button>
          ))}
        </div>

        {/* Show selected crop */}
        {selectedCrop && (
          <p className="mt-3 text-sm text-muted-foreground">
            Selected Crop:{" "}
            <span className="font-semibold text-green-700">
              {selectedCrop}
            </span>
          </p>
        )}
      </div>
  {/*upload part*/}

            <div className="space-y-2">
              <Label htmlFor="image-upload">Upload Leaf Image</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                  </p>
                </label>
              </div>
            </div>

            {previewUrl && (
              <div className="rounded-lg overflow-hidden border-2">
                <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={!selectedCrop || !selectedFile || analyzing}
              className="w-full"
              size="lg"
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Image"
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {result && (
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Detected Disease</h3>
                  <p className="text-2xl font-bold text-destructive">{result.disease}</p>
                  <p className="text-sm text-muted-foreground">Confidence: {result.confidence}</p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong className="block mb-1">Recommended Solution:</strong>
                    {result.solution}
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="font-semibold mb-2">Precautions</h3>
                  <p className="text-sm text-muted-foreground">{result.precautions}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Ask Questions</CardTitle>
              <CardDescription>Get personalized advice from our AI assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-64 overflow-y-auto space-y-3 border rounded-lg p-4 bg-muted/30">
                {chatHistory.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm">
                    No messages yet. Ask a question to get started!
                  </p>
                ) : (
                  chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground ml-8"
                          : "bg-card mr-8"
                      }`}
                    >
                      {msg.role === "user" ? (
                         <p className="text-sm">{msg.content}</p>
                      ) : (
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{ __html: msg.content }}
                        />
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask about the disease, treatment, or prevention..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={2}
                />
                <Button onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
