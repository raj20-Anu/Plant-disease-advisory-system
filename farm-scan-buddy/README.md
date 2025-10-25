CropCare Project

Project Info

Description:
CropCare is an AI-powered crop disease detection application. Upload leaf images to get instant diagnoses along with solutions and preventive measures.

How to Edit This Code

There are several ways to edit your application:

1. Using Your Preferred IDE

You can work locally using any IDE, such as VS Code.

Steps:

# Step 1: Clone the repository using the Git URL
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install   # for frontend
pip install -r requirements.txt   # for backend

# Step 4: Start the development servers
# Backend (Flask)
python main.py

# Frontend (if using Vite/React)
npm run dev

2. Edit Files Directly on GitHub

- Navigate to the desired file(s) in the repository.  
- Click the "Edit" button (pencil icon) to modify the file.  
- Commit your changes directly to the repository.

3. Using GitHub Codespaces

- Navigate to your repository on GitHub.  
- Click the "Code" button and select the "Codespaces" tab.  
- Click "New codespace" to launch a full development environment in the browser.  
- Edit files and commit changes from within Codespaces.

Technologies Used

This project is built with:

- Python (Flask)  
- TensorFlow / Keras  
- Vite + React  
- TypeScript  
- Tailwind CSS  
- shadcn-ui  

How to Deploy

- Deploy the backend on any server that supports Python (Flask).  
- Deploy the frontend on any static site host (Vercel, Netlify, etc.).  
- Ensure the frontend is configured to call the backend API endpoints (/predict and /chat).

Optional: Custom Domain

If deploying the frontend, you can connect a custom domain through your hosting provider.
