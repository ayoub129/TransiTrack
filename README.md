# TransportMVP - React Native Transport Marketplace

A modern, production-ready React Native MVP for a transport marketplace similar to inDrive/Uber, built with Expo and featuring a distinct visual identity.

## 🎨 Design System

### Visual Identity
- **Primary Color**: #FF6B00 (vibrant orange)
- **Typography**: Inter font family with system fallbacks
- **Style**: Minimal, card-based design with rounded corners and soft shadows
- **Theme**: Dark mode support with rich dark backgrounds and vibrant accents

### Color Palette
```typescript
colors: {
  primary: '#FF6B00',        // Vibrant orange
  primary600: '#E55F00',     // Darker orange
  primary200: '#FFD3B8',     // Light orange
  ink900: '#0F172A',         // Near-navy text
  ink600: '#475569',         // Medium gray text
  bg0: '#0B0B0C',           // Rich dark background
  bg100: '#0F1115',         // App background
  white: '#FFFFFF',         // Light surfaces
  teal: '#00C2A8',          // Accent teal
  danger: '#EF4444',        // Error states
  warning: '#F59E0B',       // Warning states
  success: '#10B981',       // Success states
}
```

## 🚀 Features

### Core Functionality
- **Authentication**: Welcome, Login, Register, Role Selection
- **Role-based Access**: Client and Transporter interfaces
- **Offer Creation**: Location picker, package details, cost estimation
- **Bidding System**: Real-time bidding with negotiation
- **Messaging**: In-app chat with real-time updates
- **Delivery Tracking**: Live status updates and confirmation
- **Profile Management**: Role-aware settings and KYC

### Technical Features
- **Internationalization**: EN/FR/AR with RTL support
- **Dark Mode**: Automatic theme switching
- **Offline Support**: Graceful offline states
- **Accessibility**: High contrast, scalable text, large touch targets
- **Mock Services**: Complete API and socket simulation

## 📱 Screens

### Authentication Flow
1. **Welcome Screen**: Brand introduction with login/register options
2. **Login Screen**: Email/password authentication
3. **Register Screen**: User registration with validation
4. **Role Picker**: Client vs Transporter selection

### Main Application
1. **Home Screen**: Role-aware dashboard with offers/map toggle
2. **Create Offer**: Package details, location selection, cost estimation
3. **Cost Estimate**: Dynamic pricing with sliders and multipliers
4. **Offer Summary**: Review and confirmation before posting
5. **Bids Sheet**: View and manage transporter bids
6. **Messages**: Conversation list and chat interface
7. **My Trips**: Active deliveries and history
8. **Profile**: Settings, KYC status, and account management

### Delivery Flow
1. **Live Tracking**: Real-time delivery status and map
2. **Confirm Delivery**: PIN-based delivery confirmation

## 🛠 Tech Stack

- **Framework**: Expo SDK 51+
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: Zustand
- **Styling**: NativeWind (Tailwind CSS)
- **Icons**: Expo Vector Icons (Ionicons)
- **Maps**: React Native Maps (ready for integration)
- **Real-time**: Socket.io client (mocked)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd transport-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🎯 Usage

### Development
- The app uses mock data and services for development
- All API calls are simulated with realistic delays
- Socket events are mocked with random intervals
- No backend setup required

### Testing the Flow
1. **Register** a new account
2. **Select role** (Client or Transporter)
3. **Create an offer** (if Client) or browse offers (if Transporter)
4. **Place bids** and negotiate prices
5. **Track deliveries** through the complete lifecycle
6. **Test messaging** between clients and transporters

### Theme Customization
- Modify `lib/theme.ts` for design tokens
- Update `tailwind.config.js` for Tailwind classes
- All components use the centralized theme system

### Internationalization
- Add translations in `lib/i18n.ts`
- Supports RTL languages (Arabic)
- Use `t(key, locale)` function for translations

## 📁 Project Structure

```
├── app/                    # Screen components
│   ├── (auth)/            # Authentication screens
│   ├── (home)/            # Main dashboard
│   ├── (offers)/          # Offer creation flow
│   ├── (bids)/            # Bidding interface
│   ├── (messages)/        # Chat system
│   ├── (chat)/            # Chat thread
│   ├── (trips)/           # Delivery management
│   ├── (delivery)/        # Delivery tracking
│   └── (profile)/         # User profile
├── components/            # Reusable components
│   ├── atoms/             # Basic UI elements
│   ├── molecules/         # Composite components
│   └── organisms/         # Complex components
├── store/                 # State management
├── lib/                   # Utilities and services
│   ├── theme.ts          # Design system
│   ├── i18n.ts           # Internationalization
│   ├── api.mock.ts       # Mock API services
│   └── sockets.mock.ts   # Mock socket events
└── App.tsx               # Main app component
```

## 🎨 Component Library

### Atoms
- **Button**: Primary, secondary, ghost, danger variants
- **Input**: Text input with validation and icons
- **Card**: Container with elevation and padding options
- **Chip**: Selectable tags with multiple variants
- **Badge**: Status indicators and counters
- **StatusPill**: Delivery status with icons

### Molecules
- **OfferCard**: Complete offer display with actions
- **BidCard**: Transporter bid with rating and actions
- **MessageRow**: Chat conversation preview
- **UploadCard**: File upload interface

### Organisms
- **OfferForm**: Complete offer creation form
- **BidListSheet**: Bidding interface modal
- **ConversationThread**: Full chat interface
- **LiveTrackingMap**: Delivery tracking view

## 🔧 Configuration

### Environment Setup
- No environment variables required for development
- Mock services handle all data simulation
- Real API integration points are clearly marked

### Customization
- **Colors**: Update theme colors in `lib/theme.ts`
- **Typography**: Modify font sizes and weights
- **Spacing**: Adjust spacing scale
- **Components**: Extend existing components or create new ones

## 🚀 Deployment

### Expo Build
```bash
# Build for production
expo build:android
expo build:ios
```

### App Store Preparation
- Update `app.json` with proper bundle identifiers
- Add app icons and splash screens
- Configure push notifications
- Set up real API endpoints

## 📋 Next Steps

1. **Backend Integration**: Replace mock services with real API
2. **Map Integration**: Add real map functionality
3. **Push Notifications**: Implement real-time notifications
4. **Payment Integration**: Add payment processing
5. **KYC Verification**: Implement document verification
6. **Advanced Features**: Rating system, reviews, analytics

## 🤝 Contributing

1. Follow the established design system
2. Use TypeScript for all new code
3. Maintain component consistency
4. Add proper error handling
5. Include loading and empty states
6. Test on both iOS and Android

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React Native, Expo, and modern development practices.**

## Phase A – Auth + Roles (Client / Transporteur / Admin)

### Backend (NestJS) – Setup

1) Create `backend/.env` with:

```
PORT=3000
JWT_SECRET=super-secret-change-me
JWT_REFRESH_SECRET=another-super-secret-change-me
MONGO_URI=mongodb://127.0.0.1:27017/transport
```

2) Install & run:

```
cd backend
npm install
npm run start:dev
```

API runs at `http://localhost:3000`.

Endpoints:
- POST `/auth/register` → `{ accessToken, refreshToken, user }`
- POST `/auth/login` → `{ accessToken, refreshToken, user }`
- GET `/auth/me` (Bearer)
- GET `/admin/stats` (Bearer + `admin` role)

PowerShell quick test:
```
$body = @{ email = "admin@example.com"; password = "password123"; role = "admin" } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:3000/auth/register -ContentType 'application/json' -Body $body
$body = @{ email = "admin@example.com"; password = "password123" } | ConvertTo-Json
$login = Invoke-RestMethod -Method Post -Uri http://localhost:3000/auth/login -ContentType 'application/json' -Body $body
$token = $login.accessToken
Invoke-RestMethod -Method Get -Uri http://localhost:3000/auth/me -Headers @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Method Get -Uri http://localhost:3000/admin/stats -Headers @{ Authorization = "Bearer $token" }
```

Notes:
- Users are stored in-memory for Phase A.
- Access token: 5m, Refresh token: 7d.

### Frontend (Expo) – Setup

1) Configure API base URL via Expo env:

```
# Windows PowerShell (new session may be required)
setx EXPO_PUBLIC_API_URL "http://localhost:3000"
```

2) Run Expo app:

```
npm install
npm run start
```

Auth flow:
- Register (default role `client`), then pick role in Role Picker.
- Login persists token and switches to main tabs.