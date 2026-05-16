# Parampara Review Assistant

A premium, mobile-first AI review assistant web application designed for Parampara Decor & Events. Built with Next.js 15, Tailwind CSS, Framer Motion, and Google's Gemini API.

## Features
- **Ultra Modern UI**: Dark mode, gold accents, glassmorphism, and smooth Framer Motion animations.
- **Mobile First**: Built specifically to feel like a high-end iOS application.
- **AI-Powered**: Uses Gemini to transform rough feedback into polished, human-sounding reviews.
- **Multiple Tones**: Choose between Luxury, Professional, Emotional, or Simple tones.
- **One-Click Copy**: Easily copy the generated review to clipboard.
- **Google Integration**: Direct link to post the review on Google.

## Tech Stack
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (Icons)
- Google Gen AI SDK

## Setup & Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY="your-api-key-here"
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

## Customization
- To update the Google Review link, edit `src/app/page.tsx` and change the URL in the `handlePostOnGoogle` function.
- Colors and typography can be customized in `src/app/globals.css` and `tailwind.config.ts`.
