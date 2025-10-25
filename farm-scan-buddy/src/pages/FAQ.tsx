import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate is the disease detection?",
      answer: "Our AI model has been trained on thousands of images and achieves 90-95% accuracy in detecting common crop diseases. However, for critical decisions, we always recommend consulting with agricultural experts.",
    },
    {
      question: "What image quality is needed for best results?",
      answer: "For optimal results, take clear, well-lit photos of the affected leaf. Ensure the leaf fills most of the frame and is in focus. Natural daylight works best. Avoid blurry, dark, or heavily shadowed images.",
    },
    {
      question: "Which crops and diseases are supported?",
      answer: "We currently support 14 major crops including tomatoes, corn, grapes, and more. Our system can detect over 50 common diseases including early blight, leaf rust, powdery mildew, and bacterial spot.",
    },
    {
      question: "How quickly will I get results?",
      answer: "Analysis typically takes 2-5 seconds. You'll receive instant results showing the detected disease, confidence level, recommended solutions, and preventive measures.",
    },
    {
      question: "Is my data kept private and secure?",
      answer: "Yes, absolutely. All uploaded images and personal data are encrypted and stored securely. We never share your information with third parties. You can delete your data at any time from your profile settings.",
    },
    {
      question: "Can I use this app offline?",
      answer: "The disease detection requires an internet connection as analysis happens on our servers. However, you can view previously analyzed results and saved recommendations offline.",
    },
    {
      question: "How do I get personalized advice?",
      answer: "After receiving your analysis results, use the Q&A chat feature to ask specific questions about treatment, prevention, or crop management. Our AI assistant provides tailored guidance based on your situation.",
    },
    {
      question: "What should I do if the app identifies a disease?",
      answer: "Follow the recommended solution provided in the results. This typically includes specific treatments, application schedules, and preventive measures. For severe cases or unfamiliar diseases, consult local agricultural experts.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <HelpCircle className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about using CropCare
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Common Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-2 bg-primary/5">
        <CardHeader>
          <CardTitle>Still have questions?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you couldn't find the answer you were looking for, feel free to use the Chatbot feature in the
            Prediction page.
          </p>
          <p className="text-sm text-muted-foreground">
            We're continuously updating our FAQ based on user feedback. Your questions help us improve!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;
