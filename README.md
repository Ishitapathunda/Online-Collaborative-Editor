#📝 Online Collaborative C++ Code Editor

A real-time collaborative C++ code editor where multiple users can simultaneously edit, compile, and run code. Built with React.js, Node.js, Socket.IO, and Docker, the project ensures secure and scalable execution of C++ code inside sandboxed environments.

🚀 Features

👥 Real-time Collaboration – Multiple users can edit code simultaneously.

🔄 Live Synchronization – Socket.IO keeps all connected clients updated instantly.

⚡ Secure Code Execution – Backend compiler service with Docker for sandboxed execution.

🎨 Modern UI – React-based editor with syntax highlighting and output console.

📱 Responsive Design – Works across desktop, tablet, and mobile devices.

🛠️ Tech Stack

Frontend: React.js, HTML5, CSS3, JavaScript

Backend: Node.js, Express.js, Socket.IO

Compiler: GCC inside Docker containers

Tools: Docker, GitHub, VS Code

📂 Project Structure
/client        -> React frontend  
/server        -> Node.js backend + Socket.IO  
/docker        -> Docker setup for compiler service  

⚙️ How to Run Locally

Clone the repository:
git clone https://github.com/Ishitapathunda/Online-Collaborative-Editor.git
cd Online-Collaborative-Editor

Run Backend:
cd server
npm install
node server.js

Run Frontend:
cd client
npm install
npm start

Ensure Docker is running for compiler service.

Open browser → http://localhost:3000

📈 Future Improvements

Support for multiple languages (Python, Java).

Code saving & sharing features.

Authentication and role-based access.

👩‍💻 Author

Ishita Pathunda
