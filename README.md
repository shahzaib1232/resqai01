<img width="1905" height="922" alt="image" src="https://github.com/user-attachments/assets/219e15e9-b205-476d-80a7-611f029d7f68" /># 🚨 ResQAI — Smart Disaster Response Assistant

> An AI-powered emergency and disaster response platform designed to provide fast, structured, and accessible assistance during critical situations.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Project Objectives](#project-objectives)
- [Key Features](#key-features)
- [AI-Powered Assistant](#ai-powered-assistant)
- [Technology Stack](#technology-stack)
- [Tools and Services](#tools-and-services)
- [Live Application](#live-application)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Conclusion](#conclusion)

---

## 📖 About the Project

**ResQAI** is an AI-powered Smart Disaster Response Assistant designed to support users during emergency and disaster situations.

The platform provides users with structured information and intelligent assistance to help them better understand emergency situations and determine appropriate actions.

ResQAI combines modern web technologies with AI capabilities to create an accessible and user-friendly emergency response platform.

---

## ❗ Problem Statement

During emergency and disaster situations, people may experience confusion, panic, and uncertainty about what actions they should take.

Traditional sources of emergency information may not always provide personalized or easily accessible guidance.

ResQAI aims to address this challenge by providing an interactive platform where users can access emergency-related information and interact with an AI-powered assistant for guidance.

---

## 🎯 Project Objectives

The main objectives of ResQAI are:

- Provide quick access to emergency information.
- Assist users during disaster-related situations.
- Provide AI-powered emergency guidance.
- Present information in a clear and structured format.
- Create an easy-to-use and responsive web interface.
- Provide users with accessible disaster response resources.

---

## ✨ Key Features

### 🤖 AI Emergency Assistant

Users can interact with an AI-powered assistant to receive guidance related to emergency and disaster situations.

### 🚨 Emergency Response Features

The platform provides structured emergency response information to help users understand appropriate actions during critical situations.

### 📚 Emergency Guides

Users can access organized information and guidance related to different emergency scenarios.

### 📱 Responsive Interface

The application is designed to provide a responsive user experience across different screen sizes and devices.

### 🔐 Authentication

The application includes authentication functionality for user access and account management.

### ☁️ Cloud-Based Deployment

The application is deployed on Vercel and is accessible through the internet.

---

## 🤖 AI-Powered Assistant

The AI Assistant is one of the core features of ResQAI.

It is designed to:

- Understand emergency-related user queries.
- Provide structured responses.
- Give clear and actionable guidance.
- Prioritize safety-focused information.
- Help users understand appropriate emergency procedures.

### AI Instructions

The AI assistant is designed to provide responses that are:

- Clear
- Concise
- Safety-focused
- Easy to understand
- Structured step-by-step when appropriate

> **Note:** The exact AI model and system prompt used by the application should be documented here based on the actual AI service configured in the project.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| TypeScript | Type-safe application development |
| TanStack Start | Application framework |
| Tailwind CSS | User interface styling |
| Supabase | Backend and database services |
| GitHub | Source code management |
| Lovable | AI-assisted application development |
| Vercel | Application deployment |

---

## 🔧 Tools and Services

The project was developed and deployed using:

- **Lovable** — AI-assisted application development
- **GitHub** — Version control and source code hosting
- **Supabase** — Backend services and database integration
- **Vercel** — Production deployment and hosting

---

## 🌐 Live Application

The application is deployed and publicly accessible at:

🔗 **[Visit ResQAI](https://resqai01-o8zxwcvev-acme-b32a.vercel.app/)**

**Live URL:**  
https://resqai01.vercel.app

---

## 📸 Screenshots

### 🏠 Home Page

<img width="1905" height="922" alt="image" src="https://github.com/user-attachments/assets/579e5720-c8c9-439e-b83e-803e699c8ccb" />
<img width="1890" height="822" alt="image" src="https://github.com/user-attachments/assets/db1bb59e-b095-4863-a0fd-9bb0ed9183f2" />
<img width="1880" height="798" alt="image" src="https://github.com/user-attachments/assets/82e23874-01e8-4a78-a0c0-146c4298df0c" />
<img width="1852" height="792" alt="image" src="https://github.com/user-attachments/assets/34fed44e-4c4a-4358-8900-50f868bf5753" />
<img width="1901" height="501" alt="image" src="https://github.com/user-attachments/assets/69093d9f-e77e-4f79-99a1-8432adbf910f" />

### 🏠 Signin Page
<img width="1917" height="876" alt="image" src="https://github.com/user-attachments/assets/af020d12-653c-43dc-ab57-c4674aab8b7f" />

### 🤖 AI Assistant

<img width="1913" height="831" alt="image" src="https://github.com/user-attachments/assets/52a3f0c3-e5d6-45b6-8ddf-4be6de9a3fa6" />
<img width="1852" height="680" alt="image" src="https://github.com/user-attachments/assets/b61cc172-f1d7-4a72-8b94-c17d738ba1f4" />
<img width="1917" height="812" alt="image" src="https://github.com/user-attachments/assets/819d6803-0faf-4db1-bc05-2547167b39cf" />


### 🚨 Emergency Features

<img width="1892" height="796" alt="image" src="https://github.com/user-attachments/assets/2ab9fcd6-a2ba-46c6-8f9f-3cde2cc7b488" />
<img width="1876" height="792" alt="image" src="https://github.com/user-attachments/assets/213d983a-3901-41a0-ad88-e48e075f0df1" />

---
## 💻 How to Run the Project

### Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/shahzaib1232/resqai01.git
```

### 2. Navigate to the Project Directory

```bash
cd resqai01
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file using `.env.example` as a reference and add the required Supabase configuration.

#### Required Variables

```env
SUPABASE_PROJECT_ID=your_project_id
SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_URL=your_supabase_url

VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=your_supabase_url
```

> **Security Notice:** Never upload actual API keys or private credentials to GitHub. Production environment variables are configured securely in Vercel.

### 5. Start the Development Server

```bash
npm run dev
```

The application will start on the local development server.

## 📂 Project Structure

```text
resqai01/
│
├── .lovable/
│   └── project.json
│
├── public/
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   └── radar-terrain.jpg
│   │
│   ├── components/
│   │   ├── assistant/
│   │   ├── console/
│   │   │   └── ConsoleShell.tsx
│   │   ├── site/
│   │   │   ├── SiteFooter.tsx
│   │   │   └── SiteHeader.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   │
│   ├── hooks/
│   ├── integrations/
│   ├── lib/
│   ├── routes/
│   │   └── routeTree.gen.ts
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
│
├── supabase/
│   ├── migrations/
│   │   ├── 20260725161147_e64312c7-1056-4aea-8f05-4d5fcf7b785a.sql
│   │   └── 20260725161212_facd2d82-f255-4428-915d-ecfff6cce40c.sql
│   └── config.toml
│
├── .env
├── .gitignore
├── .prettierignore
├── .prettierrc
├── AGENTS.md
├── README.md
├── bun.lock
├── bunfig.toml
├── components.json
├── eslint.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
└── vite.config.ts
