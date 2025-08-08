# CLAUDE.md - Development Documentation

## 🚨 CRITICAL NOTES - READ FIRST

### Package Manager
**ALWAYS USE BUN, NOT NPM OR YARN**
- Install packages: `bun add <package>`
- Install dev dependencies: `bun add -D <package>`
- Run scripts: `bun run <script>`
- Execute binaries: `bunx <command>`

### Important Versions
- **Tailwind CSS**: Using v3 (NOT v4) for CLI compatibility
- **React**: v19.1.1
- **TypeScript**: Strict mode enabled
- **Vite**: v7.1.0

## Project Overview

Professional resume website for Vince Vasile showcasing AI engineering expertise with a refined Dark Onyx & Metallics theme.

### Location
- **Directory**: `/Users/vincevasile/Documents/dev/github-io/vinnyvangogh.github.io/`
- **GitHub Pages URL**: https://vinnyvangogh.github.io/

## Tech Stack

### Core Technologies
- **React 18+** with TypeScript (strict mode)
- **Vite** for build tooling and dev server
- **Bun** as package manager (NOT npm!)
- **Tailwind CSS v3** for styling
- **Framer Motion** for animations (use sparingly)
- **React Router DOM** for SPA routing
- **Lucide React** for icons

### Development Commands
```bash
# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type checking
bun run type-check

# Linting
bun run lint
```

## Design System

### Color Palette (Dark Onyx & Metallics)
```css
/* Primary Colors */
--platinum: #8B9DC3;
--champagne: #F7E7CE;

/* Onyx Background */
--onyx-pure: #0F0F0F;

/* Metallic Accents */
--metallic-silver: #E5E4E2;
```

### Component Variants (Keep it Clean - 4-5 max)
- **Buttons**: primary, secondary, ghost, text
- **Cards**: default, elevated, glass
- **Badges**: skill, metric, status, highlight

## Project Structure
```
vinnyvangogh.github.io/
├── src/
│   ├── components/
│   │   ├── ui/         # Reusable UI components
│   │   ├── sections/   # Page sections
│   │   └── layout/     # Layout components
│   ├── data/          # JSON data files
│   ├── pages/         # Route pages
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── public/           # Static assets
├── CLAUDE.md         # This file - development guide
└── package.json
```

## Routing Structure
- `/` - Hero section with immediate value proposition
- `/experience` - Professional timeline
- `/projects` - Key project showcases
- `/skills` - Technical expertise
- `/contact` - Professional contact info

## Key Metrics to Display
- Almost a decade of experience (2016-Present)
- 322K+ lines of production code
- 99.95% uptime achievement
- 50+ custom AI commands
- 261+ AI development sessions

## GitHub Pages Deployment
- Configure base path in vite.config.ts
- Use 404.html fallback for SPA routing
- Build outputs to `dist/` folder
- Deploy via GitHub Actions

## Development Guidelines

### Performance First
- Lighthouse score target: 95+
- Load time: < 3s on 3G
- Mobile-first responsive design

### Clean Professional Design
- No excessive animations or particles
- Subtle, smooth transitions only
- Focus on readability and clarity
- Consistent spacing and typography

### Code Quality
- TypeScript strict mode always
- One component per file
- Proper prop typing
- Semantic HTML

## Common Issues & Solutions

### Issue: Tailwind CLI not found
**Solution**: We use Tailwind v3, not v4. v4 doesn't have traditional CLI.

### Issue: Package installation fails
**Solution**: Always use `bun add`, never `npm install`

### Issue: Build fails for GitHub Pages
**Solution**: Check base path in vite.config.ts matches repository name

## References
- React 18 Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Tailwind CSS v3: https://v3.tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- GitHub Pages SPA: Configure 404.html fallback

## TODO Progress
Track implementation progress in todo list. Update as components are completed.

---

**Remember**: This is a production-quality portfolio. Quality over quantity. Keep it clean, fast, and professional.