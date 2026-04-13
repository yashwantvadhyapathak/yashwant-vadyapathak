# Yashwant Vadyapathak - Official Website

A modern, bilingual (English & Marathi) website for **Yashwant Vadyapathak**, a traditional Maharashtrian musical organization dedicated to preserving and promoting classical drumming and musical traditions.

## 🎵 Overview

This website showcases the rich cultural heritage of Yashwant Vadyapathak, featuring their journey, gallery, social activities, and registration system for aspiring musicians. The site is fully responsive and supports both English and Marathi languages.

## ✨ Features

- **Bilingual Support** - Full support for English and Marathi languages with automatic numeral conversion
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Image Gallery** - Showcase of events and performances with organized galleries
- **User Registration** - Easy registration form for aspiring musicians with validation
- **Social Integration** - Connected social media profiles (Facebook, Instagram, YouTube)
- **Smooth Animations** - Framer Motion animations throughout for enhanced UX
- **Dark/Light Compatibility** - Theme-aware design system

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: react-i18next
- **Icons**: Lucide React
- **Routing**: React Router
- **Form Handling**: Custom validation with Google Apps Script backend
- **Linting**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── pages/              # Page components
│   ├── Home.tsx       # Landing page with hero and stats
│   ├── AboutUs.tsx    # About the pathak
│   ├── Gallery.tsx    # Image gallery
│   ├── Registration.tsx  # Member registration
│   ├── ContactUs.tsx   # Contact information
│   ├── OurJourney.tsx # Timeline and history
│   ├── SocialActivities.tsx # Events and activities
│   ├── VadansList.tsx  # Member/artist list
│   └── NotFound.tsx    # 404 page
├── components/         # Reusable components
│   ├── Navbar.tsx     # Navigation with language switch
│   ├── Footer.tsx     # Footer section
│   ├── SocialDock.tsx # Social media floating dock
│   └── ScrollToTop.tsx # Scroll to top button
├── App.tsx            # Main app with routing
├── i18n.ts            # i18n configuration
└── index.css          # Global styles
```

## 🌍 Language Support

- **English** - Full English interface
- **Marathi** - Complete Marathi translation with:
  - Marathi numeral conversion (०-९)
  - RTL-ready typography
  - Cultural context preservation

## 📋 Key Pages

- **Home** - Hero section with CTAs, carousel, and about preview
- **About Us** - Detailed history and organization info
- **Gallery** - Image galleries organized by events and themes
- **Registration** - Form to join the musical organization
- **Our Journey** - Timeline and milestone history
- **Social Activities** - Recent events and performances
- **Contact Us** - Contact information and inquiry form

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/purisaurabh/yashwant-vadyapathak.git
cd yashwant-vadyapathak

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add required environment variables:
# VITE_REGISTRATION_SCRIPT_URL=<your-google-apps-script-url>
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🎨 Styling & Theme

- **Primary Color**: Deep Saffron (#D97706)
- **Framework**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React icons throughout

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite bundler configuration
- `eslint.config.js` - ESLint rules
- `i18n.ts` - i18n language configuration

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔌 External Integrations

- **Google Apps Script** - Backend for form submissions
- **YouTube API** - Embedded videos and channel integration
- **Social Media APIs** - Facebook, Instagram links

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary and designed for Yashwant Vadyapathak.

## 📧 Contact

For inquiries about the organization, visit the website or contact through the Contact Us page.

---

Built with ❤️ for the preservation of Maharashtrian musical traditions.
