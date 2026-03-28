# Taaran Jain — AI Engineer Portfolio

Personal portfolio website built to showcase my work, research, and experience as an AI Engineer.

**Live:** [taaranjain-portfolio.vercel.app](https://taaranjain-portfolio.vercel.app)

## Features

- **3D Neural Network** background — live animation with signal pulses flowing through layers, reacts to mouse movement
- **Sections** — About, Experience, Leadership, Projects, Research, Skills, Certifications, Contact
- **Light / Dark mode** with smooth transitions
- **Framer Motion** scroll and entrance animations throughout
- **Custom cursor** with lagging ring effect
- **Contact form** powered by Nodemailer (Gmail SMTP)
- Fully responsive across all screen sizes

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **3D** — Three.js via @react-three/fiber + @react-three/drei
- **Animations** — Framer Motion
- **Styling** — Tailwind CSS + CSS Variables
- **Email** — Nodemailer
- **Deployment** — Vercel

## Run Locally

```bash
npm install
npm run dev
```

Add a `.env.local` file with:

```env
EMAIL_USER=your@gmail.com
EMAIL_APP_PASSWORD=your_app_password
NEXTAUTH_SECRET=any_random_secret
```
