# AutoClipp — Production AI Video Clipping SaaS Platform

AutoClipp is an AI-powered SaaS platform that analyzes long-form videos, generates speaker-diarized transcripts with word-level micro-timestamps, discovers viral high-potential moments using multi-factor algorithmic scoring, auto-reframes horizontal video to vertical formats (9:16), generates animated subtitles, and renders ready-to-publish short-form clips.

Inspired by OpusClip and Gling.

---

## Architecture Overview

```
autoclipp/
├── prisma/
│   └── schema.prisma           # 18+ Relational database models
├── src/
│   ├── app/                    # Next.js App Router (pages & API v1)
│   │   ├── api/v1/             # REST endpoints (health, auth, storage, projects, videos)
│   │   ├── globals.css         # Design system CSS variables & tokens
│   │   ├── layout.tsx          # Root dark-theme layout
│   │   └── page.tsx            # Architecture & showcase landing page
│   ├── components/
│   │   └── ui/                 # Reusable UI primitives (Button, Card, Badge)
│   ├── core/
│   │   ├── ai/                 # AI Provider Layer (Whisper, GPT-4o, Mock)
│   │   ├── errors/             # Typed Domain Errors (NotFoundError, AppError, etc.)
│   │   ├── payments/           # Stripe & Credit Ledger Abstraction
│   │   ├── queue/              # BullMQ / In-Process Worker Pool
│   │   ├── storage/            # Cloudflare R2 / AWS S3 / Local Storage Abstraction
│   │   └── video/              # FFmpeg & Mock Video Processing Pipeline
│   ├── lib/
│   │   ├── env.ts              # Zod runtime environment validation
│   │   ├── logger.ts           # Structured application logger
│   │   └── utils.ts            # Styling utilities (cn) & formatters
│   └── server/
│       ├── auth/               # Auth.js / JWT sessions & RBAC guards
│       ├── db/                 # Global singleton Prisma client
│       └── services/           # ProjectService, VideoService, CreditService
├── .env.example                # Documented configuration template
├── package.json
└── tsconfig.json
```

---

## Design System Tokens

- **Background**: `#0A0A0B`
- **Surface**: `#141416`
- **Card**: `#1B1B1F`
- **Primary**: `#7C5CFC` (Vibrant Purple)
- **Secondary**: `#A78BFA`
- **Border**: `#27272A`
- **Muted Text**: `#A1A1AA`
- **Success**: `#22C55E`

---

## Database Entities

The platform data model in `prisma/schema.prisma` implements all relational entities:
- **User** (User & Admin RBAC)
- **Subscription** (Stripe customer & billing cycle)
- **CreditBalance** & **CreditTransaction** (Transactional double-entry credit ledger)
- **Project** (Multi-tenant isolated workspaces)
- **Video** & **VideoSource** (Source URL or direct upload, resolution, duration)
- **ProcessingJob** (Asynchronous job lifecycle: PENDING, PROCESSING, COMPLETED, FAILED)
- **Transcript**, **TranscriptSegment**, **Speaker** (Diarized speaker transcripts with timestamps)
- **Clip** & **ClipScore** (Multi-factor algorithmic metrics: Hook, Engagement, Clarity, Emotional Impact, Story Completeness)
- **Caption** & **CaptionStyle** (Subtitles, word animation timings, styles)
- **BrandKit** (Watermarks, outro, custom fonts and colors)
- **RenderJob** & **Export** (Final vertical render output, storage key, format, resolution)
- **UsageLog** (Audit trail of platform activity)

---

## Provider Abstractions

All external service dependencies are built behind pluggable provider interfaces:

| Capability | Interface | Production Adapter | Local Development Adapter |
|---|---|---|---|
| **Storage** | `IStorageService` | `S3StorageService` (AWS S3 / Cloudflare R2) | `LocalStorageService` (local disk `./uploads`) |
| **Queue** | `IQueueService` | `BullMQService` (Redis-backed) | `LocalQueueService` (in-process asynchronous) |
| **AI Transcription** | `ITranscriptionProvider` | `OpenAITranscriptionProvider` (Whisper) | `MockTranscriptionProvider` |
| **Clip Detection** | `IClipDetectorProvider` | `OpenAIClipDetectorProvider` (GPT-4o) | `MockClipDetectorProvider` |
| **Hook & Title** | `IHookAndTitleProvider` | `OpenAIHookAndTitleProvider` (GPT-4o) | `MockHookAndTitleProvider` |
| **Video Engine** | `IVideoProcessor` | `FFmpegVideoProcessor` | `MockVideoProcessor` |
| **Payments** | `IPaymentService` | `StripePaymentService` | `MockPaymentService` |

---

## Quick Start / Local Development

### 1. Prerequisites
- **Node.js**: v18+ (tested on v24)
- **npm** or **pnpm**
- **PostgreSQL** (local or hosted e.g. Neon, Supabase)
- **FFmpeg** (optional for local mock mode; required for live rendering)
- **Redis** (optional for local mock mode; required for BullMQ production mode)

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(By default, `.env` is configured with `STORAGE_PROVIDER="local"`, `QUEUE_DRIVER="memory"`, `AI_PROVIDER="mock"`, and `VIDEO_PROCESSOR="mock"` so you can run and test immediately without external API keys or cloud accounts!)*

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Push Database Schema
```bash
npx prisma db push
```

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Verification Commands

- **Typecheck**: `npx tsc --noEmit`
- **Lint**: `npm run lint`
- **Build**: `npm run build`
- **Health Check**: `curl http://localhost:3000/api/v1/health`
