Hive Mind: A Crowd Wisdom Experiment 🐝
A social psychology experiment disguised as a game. This app tests the Wisdom of Crowds theory by analyzing how social influence (seeing other people's guesses) affects the accuracy of a group's collective judgment.

🧪 The Science
The app randomly assigns users to one of two conditions:

Independent Group: Users guess the number of jellybeans based solely on visual evidence.

Social Group: Users are shown the 'Current Crowd Average' before guessing, introducing anchoring bias and herding behavior.

Real-time visualizations reveal whether the 'Independent' crowd remains accurate (Galton's Ox principle) while the 'Social' crowd skews away from the truth (Information Cascading).

✨ Features
Dual-Condition Logic: Randomized A/B testing logic (Independent vs. Social).

Real-time Visualization: Dynamic Bell Curves using Recharts to show data distribution.

Backend: Firebase Firestore for persisting global guess data.

Internationalization: Full English & Simplified Chinese support (i18next).

Scientific Context: Integrated educational resources on Crowd Wisdom vs. Madness.

Simulation Engine: Includes a Box-Muller transform utility to seed the database with normal distributions for demo purposes.

🛠️ Tech Stack
Frontend: React 18, Vite, Tailwind CSS v4

Backend: Firebase Firestore (NoSQL)

Visualization: Recharts

Analytics: Vercel Analytics

Deployment: Vercel

🚀 Local Development
Clone the repo

Bash

git clone https://github.com/YOUR_USERNAME/hive-mind.git
cd hive-mind
Install dependencies

Bash

npm install
Setup Environment Variables Create a .env.local file in the root directory and add your Firebase config:

Code snippet

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
Run the app

Bash

npm run dev
🔒 Security Note
The database is currently locked to Create Only mode. Public users can add guesses but cannot modify or delete existing data.

📄 License
MIT
