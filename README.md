# Tarot Reading App - Next.js + Vertex AI

A modern tarot reading web application built with Next.js 14, React, TypeScript, and Google Vertex AI Gemini Flash-Lite.

## Live Demo

🔮 **[https://taro-ai-ten.vercel.app](https://taro-ai-ten.vercel.app)**

Try the live demo and discover insights into your past, present, and future!

## Features

✨ **Modern Tech Stack**
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Vertex AI Gemini 2.0 Flash-Lite

🎴 **Tarot Reading**
- Draw 3 tarot cards (Past, Present, Future)
- AI-powered interpretation using Gemini
- Beautiful dark theme UI
- Responsive mobile design

🔒 **Secure & Serverless**
- Cookie-based session management
- Serverless API routes (Vercel Functions)
- No database required
- API keys protected server-side

## Project Structure

```
taro-web-nextjs/
├── app/
│   ├── api/
│   │   ├── draw-card/route.ts    # Draw random card
│   │   ├── interpret/route.ts    # Vertex AI interpretation
│   │   └── session/route.ts      # Session reset
│   ├── page.tsx                  # Main page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── QuestionInput.tsx         # Question input field
│   ├── CardSelector.tsx          # Card selection UI
│   ├── TarotCard.tsx             # Single card component
│   └── InterpretationResult.tsx  # AI result display
├── lib/
│   ├── tarot-data.ts             # Tarot card loader
│   ├── vertexai.ts               # Vertex AI client
│   └── session.ts                # Session management
├── types/
│   └── tarot.ts                  # TypeScript types
└── public/
    ├── cards/                    # Card images
    ├── tarot-images.json         # Card data
    └── taro.jpg                  # Card back image
```

## Setup Instructions

### Prerequisites

1. **Node.js 18+** installed
2. **Google Cloud Project** with Vertex AI enabled
3. **Service Account** with Vertex AI permissions

### Installation

1. **Install dependencies**
   ```bash
   cd taro-web-nextjs
   npm install
   ```

2. **Set up Google Cloud**
   ```bash
   # Enable Vertex AI API
   gcloud services enable aiplatform.googleapis.com

   # Create service account
   gcloud iam service-accounts create tarot-app-sa \
       --display-name="Tarot App Service Account"

   # Grant permissions
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
       --member="serviceAccount:tarot-app-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
       --role="roles/aiplatform.user"

   # Create and download key
   gcloud iam service-accounts keys create service-account-key.json \
       --iam-account=tarot-app-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   GCP_PROJECT_ID=your-project-id
   GCP_LOCATION=us-central1
   ```

4. **Set up authentication (for local development)**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Step 1: Prepare Service Account

```bash
# Convert service account JSON to base64
base64 -i service-account-key.json | pbcopy
```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

   Or push to GitHub and connect to Vercel dashboard.

### Step 3: Configure Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

| Name | Value |
|------|-------|
| `GCP_PROJECT_ID` | your-project-id |
| `GCP_LOCATION` | us-central1 |
| `GOOGLE_APPLICATION_CREDENTIALS` | (paste base64 string from Step 1) |

**Important**: For `GOOGLE_APPLICATION_CREDENTIALS`, Vercel needs the service account JSON as a base64-encoded string.

### Step 4: Redeploy

After setting environment variables, trigger a redeploy.

## Cost Estimation

### Monthly Costs (10,000 requests)

| Service | Cost |
|---------|------|
| **Vertex AI Gemini Flash-Lite** | **$0.44** |
| - Input (200 tokens × 10K) | $0.04 |
| - Output (500 tokens × 10K) | $0.40 |
| **Vercel (Free Tier)** | **$0.00** |
| - 150K function calls/month | Free |
| - 6K build minutes/month | Free |
| **Total** | **$0.44/month** 🎉 |

### Scaling to 100,000 requests

| Service | Cost |
|---------|------|
| Vertex AI | $4.40 |
| Vercel | $0.00 (within free tier) |
| **Total** | **$4.40/month** |

## API Routes

### POST /api/draw-card
Draw a random tarot card for a position.

**Request:**
```json
{
  "position": "past" | "present" | "future"
}
```

**Response:**
```json
{
  "card": {
    "name": "The Fool",
    "img": "m00.jpg",
    "meanings": { ... }
  }
}
```

### POST /api/interpret
Get AI interpretation of drawn cards.

**Request:**
```json
{
  "question": "What does my career path look like?"
}
```

**Response:**
```json
{
  "interpretation": "Based on your cards..."
}
```

### DELETE /api/session
Reset session (clear cookies).

**Response:**
```json
{
  "success": true
}
```

## Development

### Project Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Vertex AI Gemini 2.0 Flash-Lite
- **Deployment**: Vercel
- **Session**: HTTP Cookies

## Troubleshooting

### Error: "GCP_PROJECT_ID is not set"
- Make sure `.env.local` file exists with `GCP_PROJECT_ID`
- For Vercel, check environment variables in dashboard

### Error: "Permission denied"
- Verify service account has `roles/aiplatform.user` role
- Check `GOOGLE_APPLICATION_CREDENTIALS` is set correctly

### Error: "No cards available"
- Check `public/tarot-images.json` exists
- Verify `public/cards/` folder has card images

### Images not loading
- Run `npm run build` to check for missing images
- Verify image paths in `tarot-images.json`

## Production Checklist

- [ ] Copy `tarot-images.json` to `public/`
- [ ] Copy card images to `public/cards/`
- [ ] Set up GCP service account
- [ ] Configure environment variables
- [ ] Test locally with `npm run dev`
- [ ] Build successfully with `npm run build`
- [ ] Deploy to Vercel
- [ ] Test production deployment
- [ ] Monitor API usage and costs

## License

MIT

## Support

For issues or questions, check:
1. Vertex AI API is enabled in GCP
2. Service account has proper permissions
3. Environment variables are set correctly
4. Check Vercel function logs for errors

---

**Built with ❤️ using Next.js and Vertex AI**
