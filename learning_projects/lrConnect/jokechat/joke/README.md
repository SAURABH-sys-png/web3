# 💬 Jokechat - Real-time Chat Application

A modern, beautiful real-time chat application built with Next.js, Stream Chat API, and Clerk authentication.

## ✨ Features

- **Real-time Messaging** - Powered by Stream Chat API
- **User Authentication** - Secure sign-in with Clerk
- **Direct Messaging** - Start 1-on-1 conversations
- **Contact Discovery** - Browse and search for users
- **Responsive Design** - Works seamlessly on mobile and desktop
- **Live Updates** - Message status, typing indicators, and presence
- **Beautiful UI** - Modern design with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- GitHub account (for deployment)
- Vercel account (for live deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/jokechat.git
cd jokechat
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file (or update existing one with all variables):
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dm9jYWwtYWxpZW4tNDEuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_WRKaq9klMqAlEUJy9RlwD1APa57W1sp4zmeSz7c4py

# Stream Chat API
NEXT_PUBLIC_STREAM_API_KEY=zpbb8bufn498
STREAM_SECRET_KEY=edqu4rqxqtpuu7jbm2gwuryej349bf8dka83sc65skkybhkhbakwscnz75f7tfzs
STREAM_APP_ID=1587329
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Sign Up / Sign In
- Click "Sign Up" to create a new account
- Authenticate with email or social providers (Google, GitHub, etc.)

### Main Chat Page
- Navigate to `/userchat` to see all your conversations
- Select a conversation from the sidebar
- Type a message and press Send (or click the send button)

### Find Contacts
- Go to `/contacts` to browse all users
- Search for specific users
- Click "Start Chat" to begin a conversation

## 📱 Pages

- `/` - Home/Landing page
- `/userchat` - Main chat interface _(requires authentication)_
- `/contacts` - Browse and search users _(requires authentication)_
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework |
| **React 19** | UI library |
| **Tailwind CSS 4** | Styling |
| **Stream Chat** | Real-time messaging |
| **Clerk** | Authentication |

## 📦 Key Dependencies

```json
{
  "stream-chat": "^9.41.1",
  "stream-chat-react": "^14.0.1",
  "@clerk/nextjs": "^7.2.3",
  "next": "16.2.4",
  "react": "19.2.4",
  "react-dom": "19.2.4"
}
```

## 🌐 Deployment

### Option 1: Deploy to Vercel (Recommended ⭐)

Easiest method - one-click deployment!

```bash
# Push to GitHub first
git add .
git commit -m "Jokechat app"
git push

# Then:
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Import your GitHub repository
# 4. Add environment variables
# 5. Click Deploy!
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Option 2: Deploy with GitHub Actions

Automatic deployment on every push to main branch!

See [.github/workflows/deploy.yml](.github/workflows/deploy.yml) for configuration.

### Quick Deploy Script

```bash
chmod +x deploy.sh
./deploy.sh
```

Then follow instructions in [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📚 Documentation

- [Chat Implementation Guide](./CHAT_IMPLEMENTATION.md) - How the chat system works
- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions
- [Next.js Docs](https://nextjs.org/docs) - Next.js documentation
- [Stream Chat Docs](https://getstream.io/chat/docs/) - Stream Chat API reference
- [Clerk Docs](https://clerk.com/docs) - Authentication documentation

## 🐛 Bug Fixes (Latest)

### v1.1.0 - Message Duplication Fixed ✅
- Fixed duplicate message sending issue
- Proper event listener cleanup
- Improved message deduplication logic
- Better state management for real-time updates

## 🧪 Development

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Run linter
```bash
npm run lint
```

## 🔐 Security

- API keys stored in environment variables
- Stream Chat tokens generated server-side only
- Clerk middleware protects authenticated routes
- User data isolated per authenticated account

## 🚧 Roadmap

- [ ] Voice/Video calls
- [ ] File/Image sharing
- [ ] Message reactions & emojis
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Group channels
- [ ] Channel management
- [ ] Message search
- [ ] Push notifications
- [ ] Dark mode

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💬 Support

If you encounter any issues:

1. Check [CHAT_IMPLEMENTATION.md](./CHAT_IMPLEMENTATION.md) for chat-specific issues
2. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
3. Review browser console (F12) for error messages
4. Check Stream Chat & Clerk dashboards for service status

## 👥 Authors

Built with ❤️ using Next.js and Stream Chat

---

**Ready to deploy?** 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions!

