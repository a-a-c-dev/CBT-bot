# CBT-Friendly Bot 🤖

A Cognitive Behavioral Therapy (CBT) chatbot application built with Next.js, designed to provide therapeutic support through AI-powered conversations. The bot follows the Beck Institute model and offers structured CBT sessions with accessibility features.

## 🌟 Features

### Core Functionality
- **AI-Powered CBT Sessions**: Guided conversations following the Beck Institute model
- **Multi-Phase Therapy Process**: 
  - Assessment & Engagement
  - Cognitive Formulation
  - Action Planning & Response
  - Maintenance & Relapse Prevention
  - Termination & Evaluation
- **Hebrew Language Support**: Native Hebrew conversation with proper grammar and gender-aware responses
- **Context-Aware Conversations**: Maintains conversation history and prevents repetition

### Accessibility Features
- **Font Size Control**: Small, medium, and large text options
- **Dyslexia-Friendly Font**: Special font option for users with dyslexia
- **Dark/Light Theme**: Toggle between light and dark modes
- **Responsive Design**: Works seamlessly across desktop and mobile devices

### Technical Features
- **Real-time Chat Interface**: Modern, intuitive chat UI
- **Vector Database Integration**: Supabase for storing and retrieving CBT knowledge
- **Mistral AI Integration**: Advanced language model for natural conversations
- **Security Headers**: Built-in security protections
- **TypeScript**: Full type safety throughout the application

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.3.3** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety
- **CSS Modules** - Styled components

### Backend & AI
- **LangChain** - AI/LLM framework
- **Mistral AI** - Language model for conversations
- **Supabase** - Vector database for knowledge storage
- **Next.js API Routes** - Backend API endpoints

### Development Tools
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Turbopack** - Fast development bundler

## 📋 Prerequisites

- **Node.js 20.0.0** or higher
- **npm 10.8.2** or higher
- **Supabase Account** - For vector database
- **Mistral AI API Key** - For language model access

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cbt-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
SUPABASE_URL_CHATBOT=your_supabase_url
SUPABASE_API_KEY=your_supabase_api_key

# Mistral AI Configuration
MISTRAL_API_KEY=your_mistral_api_key
```

### 4. Database Setup
The application uses Supabase as a vector database. You'll need to:
- Create a Supabase project
- Set up a `documents` table for vector storage
- Configure the `match_documents` function for similarity search

### 5. Seed Data (Optional)
If you have seed data prepared:
```bash
npm run db:seed
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## 🎯 Usage

### Starting a Session
1. Open the application in your browser
2. The bot will ask for your name and welcome you
3. Share your current concerns or emotional state
4. Follow the guided CBT process through the conversation

### Accessibility Options
- Click the ⚙️ icon to open accessibility settings
- Adjust font size (Small, Medium, Large)
- Toggle dyslexia-friendly font
- Switch between light and dark themes

### Conversation Flow
The bot follows a structured 5-phase approach:
1. **Assessment**: Understanding your current situation
2. **Cognitive Formulation**: Identifying thought-feeling-behavior patterns
3. **Action Planning**: Offering specific CBT techniques
4. **Maintenance**: Developing coping strategies
5. **Evaluation**: Reviewing progress and planning ahead

## 🏗️ Project Structure

```
cbt-app/
├── src/
│   ├── components/          # React components
│   │   ├── accessibilityPanel/  # Accessibility controls
│   │   ├── chatbotContainer/    # Main chat interface
│   │   ├── form/               # Chat form and messages
│   │   ├── headerContainer/    # App header
│   │   ├── footerContainer/    # App footer
│   │   └── ...
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Next.js pages and API routes
│   ├── services/           # Business logic and AI chains
│   ├── data/               # Static data and knowledge base
│   └── styles/             # CSS modules and global styles
├── public/                 # Static assets
└── ...
```

## 🔧 Configuration

### Next.js Configuration
The application includes security headers and CORS configuration in `next.config.ts`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy: restricted camera/microphone/geolocation

### AI Chain Configuration
The CBT bot uses a sophisticated LangChain setup with:
- Standalone question generation
- Vector retrieval from knowledge base
- Context-aware response generation
- Hebrew language correction

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or questions about the CBT bot:
- Email: eran1201@eran.org.il
- Create an issue in the repository

## ⚠️ Important Notes

- This bot is designed for therapeutic support but is not a replacement for professional mental health care
- For crisis situations, please contact emergency services or a crisis support line
- The bot includes safety measures to detect and respond appropriately to crisis situations
- All conversations are processed through secure AI services with appropriate privacy measures

## 🔄 Version History

- **v0.1.0** - Initial release with core CBT functionality and accessibility features

---

Built with ❤️ for mental health support and accessibility
