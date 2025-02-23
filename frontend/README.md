# Chat App

A real-time chat application built using modern web technologies.

## Features

- 🚀 **Google Login**
  - Users must be able to log in using their Google accounts.
  - Utilize Google's OAuth 2.0 API for authentication.
- 🔐 **Logout**
  - Implement a logout functionality to allow users to safely exit their accounts.
- 👥 **See All Users**
  - Display a list of all registered users in the app.
  - Highlight the currently logged-in user.
- 💬 **One-to-One Chat**
  - Allow users to initiate one-to-one chats with other users.
  - Display messages in a chat UI.
- 🗑️ **Delete Messages**
  - Users must be able to delete their own messages only.
  - Once deleted, the message should no longer appear in the chat.
- 📱 **Responsive Design**
  - The application must work seamlessly on desktops, tablets, and mobile devices.
  - The UI should be clean, modern, and intuitive.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time Communication:** Socket.io
- **Authentication:** Google OAuth 2.0

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nabeelahmed377/chat-app.git
   cd chat-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
4. **Run the server:**
   ```bash
   cd backend
   npm start
   ```
5. **Run the client:**
   ```bash
   cd frontend
   npm start
   ```

## Usage

1. Sign up or log in using Google.
2. Start a new chat or join an existing one.
3. Enjoy real-time messaging with friends and colleagues.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

Happy chatting! 🚀
