
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
Inside your project root search for farm-scan-buddy, inside which create a new file and name it .env<br>
Open .env and add your keys in the format given below,<br>
- Create **Supabase** keys → [https://supabase.com](https://supabase.com/)<br>
- Create **Groq** API keys → [https://console.groq.com](https://console.groq.com/)
<br>
## Supabase connection instructions<br>
inside cd farm-scan-buddy
```bash
npx supabase login
```
```bash
npx supabase link --project-ref <your-project-ref>
```
check the website url at the top<br>
eg:https://xyzcompanyname.supabase.co/project/abcdef12<br>
The part after /project/ (like abcdef12) is your project ref.
```bash
npx supabase db push
```
<br>


<br>
VITE_SUPABASE_PROJECT_ID="your_supabase_id"<br>
VITE_SUPABASE_PUBLISHABLE_KEY="your_supabase_key"<br>
VITE_SUPABASE_URL="your_supabase_url"<br>
VITE_API_UR="your_url"<br><br>

GROQ_API_KEY=your_api_key

<br>
in .env <br>
VITE_SUPABASE_PROJECT_ID is your project-ref (like abcdef12)<br>
VITE_SUPABASE_PUBLISHABLE_KEY is the api key provided by supabase <br>
VITE_SUPABASE_URL is the url provided by supabase (like https://xyzcompanyname.supabase.co)<br>
VITE_API_URL="http://127.0.0.1:5000"<br>

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

