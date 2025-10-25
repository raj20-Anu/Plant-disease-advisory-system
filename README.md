In VS Code terminal
## 1.Install dependies
```bash
npm install
pip install -r requirements.txt
```
## 2. Insertion of API Key
In your project root (same folder as app.py), create a new file and name it .env
Open .env in a text editor and add your keys in this format:
GROQ_API_KEY=your_groq_api_key_here

## 3. Run the app.py in terminal
```bash
python app.py
```
## 4. Open new PowerShell
```bash
cd farm-scan-buddy
npm run dev
```
If you get Scripts error give 
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

