# ResumeBuilder Pro

A production-ready, responsive resume builder web application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **3-Page User Journey**: Landing → Input Method Selection → Template & Preview
- **Multiple Input Methods**: 
  - Upload existing resume (PDF/DOCX)
  - Manual entry with guided forms
  - LinkedIn profile import (URL validation)
- **Professional Templates**: ATS-friendly, modern professional, and creative designer templates
- **Real-time Preview**: Switch between styled and ATS-friendly views
- **PDF Export**: Download resume as PDF (mock implementation)
- **Dark Mode**: Toggle between light and dark themes

### 🔐 Authentication
- Basic login system with form validation
- Demo credentials: `demo@example.com` / `password`
- Google OAuth integration (mock)
- Persistent user sessions

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Smooth animations and hover states
- Progress indicators and status updates

### 🛠 Technical Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form + Zod validation
- **File Upload**: React Dropzone with drag-and-drop

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Usage

1. **Landing Page**: Choose between "Start from Scratch" or "Upload Existing Resume"
2. **Input Method**: Select upload, manual entry, or LinkedIn import
3. **Templates**: Choose from 3 professional templates and preview your resume
4. **Authentication**: Use `demo@example.com` / `password` to test login

## Project Structure

```
src/
├── app/                    # Next.js 15 App Router pages
│   ├── page.tsx           # Landing page
│   ├── input-method/      # Input method selection
│   ├── templates/         # Template selection & preview
│   ├── auth/             # Authentication
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── store.ts          # Zustand state management
│   └── utils.ts          # Utility functions
└── ...
```

## Key Components

### State Management (`lib/store.ts`)
- Global application state using Zustand
- Persistent storage for resume data and user preferences
- Type-safe actions for data manipulation

### Form Validation
- Zod schemas for type-safe validation
- React Hook Form integration
- Real-time validation feedback

### Resume Templates
- **ATS-Friendly**: Clean, simple format optimized for applicant tracking systems
- **Modern Professional**: Contemporary design with colors and visual hierarchy
- **Creative Designer**: Bold layout for creative professionals

### File Upload
- Drag-and-drop interface using React Dropzone
- Support for PDF and DOCX files
- File size validation and preview

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

All components are designed mobile-first with progressive enhancement.

## Future Enhancements

### Immediate Next Steps
- Real PDF generation using jsPDF or Puppeteer
- Actual file parsing for uploaded resumes
- LinkedIn API integration
- Database integration for user data
- Email verification and password reset

### Advanced Features
- Resume analytics and ATS scoring
- Cover letter generation
- Job application tracking
- Team collaboration features
- Premium template marketplace

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Tailwind CSS classes only (no inline styles)
- Component-based architecture

### Component Patterns
- Server Components where possible
- Client Components for interactivity
- Custom hooks for reusable logic
- Proper error boundaries

### Performance
- Image optimization with Next.js
- Code splitting with dynamic imports
- Minimal bundle size
- Fast page transitions

## Production Deployment

### Build
```bash
npm run build
```

### Environment Variables
Create `.env.local` for production secrets:
```env
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Deployment Platforms
- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Full-stack support
- **AWS**: Using Amplify or manual deployment
- **Docker**: Containerized deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- 📧 Email: support@resumebuilder.pro (mock)
- 💬 Discord: [Join our community](https://discord.gg/resumebuilder) (mock)
- 📚 Documentation: [docs.resumebuilder.pro](https://docs.resumebuilder.pro) (mock)

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS.
