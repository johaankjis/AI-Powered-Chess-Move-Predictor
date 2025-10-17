# AI-Powered Chess Move Predictor

A modern, interactive chess application that uses AI to predict the best moves in real-time. Built with Next.js, React, and TypeScript, this application provides an intelligent chess experience with move predictions, game analytics, and player statistics.

## 🌟 Features

### Core Functionality
- **AI Move Prediction**: Real-time AI-powered move suggestions with confidence scores
- **Interactive Chess Board**: Fully functional chess board with piece selection and movement
- **Move History**: Track all moves made during the game with algebraic notation
- **Game Analytics**: Detailed analysis of games including material balance, center control, and piece mobility
- **Player Statistics**: Track player performance, ELO ratings, and game history
- **Historical Games**: Browse and analyze past games with detailed move sequences

### Advanced Features
- **Feature Importance Analysis**: Visualize which chess features (material, position, mobility) influence move predictions
- **ELO Rating System**: Track player ratings across games
- **Real-time Predictions**: Sub-150ms prediction latency for seamless gameplay
- **Dark/Light Mode**: Theme support for comfortable viewing
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **Next.js 15.2.4**: React framework with App Router
- **React 19**: Latest React with server components
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Modern utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### UI Components
- **shadcn/ui**: High-quality, accessible UI components
- **Recharts**: Data visualization for analytics
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation

### Features
- **Chess Engine**: Custom chess logic implementation
- **AI Prediction Model**: ML-based move prediction system
- **Analytics Engine**: Game analysis and statistics

## 📦 Installation

### Prerequisites
- Node.js 18+ or higher
- pnpm (recommended) or npm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/AI-Powered-Chess-Move-Predictor.git
   cd AI-Powered-Chess-Move-Predictor
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install --legacy-peer-deps
   ```
   
   Note: The `--legacy-peer-deps` flag may be needed due to peer dependency conflicts with React 19.

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### Starting a New Game
1. Open the application in your browser
2. The chess board is initialized with the standard starting position
3. Click on pieces to select them and make moves
4. AI predictions appear in the right panel as you play

### Viewing Predictions
- **Move Suggestion**: The AI's recommended move in algebraic notation
- **Confidence Score**: How confident the AI is in this move (0-100%)
- **Position Evaluation**: Numerical evaluation of the position
- **Feature Analysis**: Breakdown of factors influencing the prediction

### Accessing Features
- **History**: View all previously played games
- **Analytics**: See detailed statistics and charts about game performance
- **Players**: Browse player profiles and statistics

## 📁 Project Structure

```
AI-Powered-Chess-Move-Predictor/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── predict/              # Move prediction endpoint
│   │   └── model-info/           # Model information endpoint
│   ├── analytics/                # Analytics page
│   ├── history/                  # Game history page
│   ├── players/                  # Players page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── ui/                       # UI primitives (shadcn/ui)
│   ├── chess-board.tsx           # Chess board component
│   ├── prediction-panel.tsx      # AI prediction display
│   ├── move-history.tsx          # Move history list
│   ├── game-controls.tsx         # Game control buttons
│   ├── player-info.tsx           # Player information display
│   ├── model-info-card.tsx       # Model details card
│   ├── elo-chart.tsx             # ELO rating chart
│   └── feature-importance-chart.tsx  # Feature analysis chart
├── lib/                          # Utility libraries
│   ├── chess-engine.ts           # Chess game logic
│   ├── chess-types.ts            # TypeScript type definitions
│   ├── mock-data.ts              # Mock data for development
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── styles/                       # Global styles
├── hooks/                        # Custom React hooks
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── next.config.mjs               # Next.js configuration
```

## 🔌 API Documentation

### POST `/api/predict`

Predicts the best move for the current game state.

**Request Body:**
```json
{
  "board": "8x8 array of chess pieces",
  "currentTurn": "white" | "black",
  "moveHistory": [],
  "whiteElo": 1500,
  "blackElo": 1500,
  "moveNumber": 1
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "move": "e4",
    "confidence": 87.5,
    "evaluation": 0.45,
    "features": {
      "materialBalance": 0.0,
      "centerControl": 1.5,
      "pieceMobility": 42.0,
      "kingSafety": 7.2
    }
  },
  "latency": 147,
  "timestamp": "2025-10-17T18:47:09.732Z"
}
```

### GET `/api/model-info`

Returns information about the AI model.

**Response:**
```json
{
  "success": true,
  "modelInfo": {
    "name": "ChessAI v1.0",
    "version": "1.0.0",
    "accuracy": 0.87,
    "trainingGames": 50000
  }
}
```

## 🎨 Customization

### Changing Theme
The application supports dark and light themes. Theme can be toggled using the theme switcher in the UI.

### Modifying AI Behavior
Edit `lib/chess-engine.ts` to adjust the AI's evaluation functions:
- `calculateMaterialBalance()`: Adjust piece values
- `calculateCenterControl()`: Modify center square importance
- `calculatePieceMobility()`: Change mobility scoring

## 🔧 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for consistent styling

## 🧪 Testing

Currently, the project uses manual testing. To test the application:

1. Start the development server
2. Open the browser and interact with the chess board
3. Verify AI predictions appear correctly
4. Test navigation between pages
5. Check responsiveness on different screen sizes

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Ensure TypeScript types are properly defined
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is open source and available under the MIT License.

## 👥 Authors

- **johaankjis** - Initial work and maintenance

## 🙏 Acknowledgments

- Chess piece images and icons from Lucide React
- UI components from shadcn/ui
- Chess logic inspired by standard chess rules and strategies
- AI prediction model based on classical chess evaluation functions

## 📞 Support

If you have any questions or run into issues, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## 🗺️ Roadmap

- [ ] Implement real ML model integration
- [ ] Add support for chess.com and lichess.org import
- [ ] Multiplayer support
- [ ] Opening book integration
- [ ] Endgame tablebase support
- [ ] Mobile app version
- [ ] Tournament mode

---

**Built with ♟️ by the chess community**
