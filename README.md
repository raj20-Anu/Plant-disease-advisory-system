
### 🌾 CropCare – AI-Powered Plant Disease Detection System

CropCare is an intelligent web application that helps farmers and agricultural users detect plant diseases with 93% test accuracy using AI and deep learning. The system analyzes leaf images with clean backgrounds to identify diseases and provides expert treatment recommendations and preventive measures.

It also includes an integrated AI Chatbot for personalized farming advice and a Google Translation widget for multilingual accessibility, ensuring a seamless experience for users worldwide.

<br><br>
In VS Code terminal
## 1.Install dependencies
```bash
pip install -r requirements.txt
```
## 2. Insertion of API Key
Inside your project root search for farm-scan-buddy, inside which create a new file and name it .env
Open .env and add your keys in the format given below,
[![To create Supabase keys go to](https://supabase.com/)]
[![To create Groq API keys go to](https://groq.com/)]
<br>
VITE_SUPABASE_PROJECT_ID="your_supabase_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_supabase_key"
VITE_SUPABASE_URL="your_supabase_url"
VITE_API_UR="your_url"

GROQ_API_KEY=your_api_key

## 3. Run the app.py in terminal
```bash
python app.py
```
## 4. Open new PowerShell
```bash
cd farm-scan-buddy
npm install
npm run dev
```
If you get Scripts error give 
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

