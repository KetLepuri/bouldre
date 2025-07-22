
#  Bouldre - A Generative AI Recommender-System for Personalized Bouldering Routes

This repository contains the full source code for **Bouldre**, a web-based system that generates personalized indoor bouldering routes using generative AI. It was developed as part of a master's thesis in Web Engineering at TU Chemnitz.

---

##  Project Description

**Bouldre** is designed to assist beginner climbers by creating AI-generated routes tailored to individual physical characteristics. It uses generative logic and deterministic biomechanical constraints—such as height, ape index, and leg-to-torso ratio—to ensure that the generated routes are both feasible and personalized.

The system enables users to:
- Upload an image of a climbing wall or training board.
- Enter their physical parameters.
- Automatically generate a route using an AI backend.
- View the suggested climbing sequence with SVG overlays and textual instructions.

---

##  Technologies Used

| Layer       | Technologies                                               |
|-------------|------------------------------------------------------------|
| Frontend    | React, Next.js (App Router), Tailwind CSS                  |
| Backend     | Supabase (Auth, PostgreSQL, Storage), OpenAI GPT-4, Pinecone (optional) |
| Deployment  | Vercel                                                     |
| Language    | TypeScript                                                 |

---

##  Getting Started

### 1. Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm
- `.env.example` configuration file (see below)

### 2. Installation

Clone the repo:

```bash
git clone https://github.com/KetLepuri/bouldre.git
cd bouldre
npm install
```

### 3. Environment Configuration

To run this project, you need to set up environment variables.

1. Copy the .env.example file:

```bash
cp .env.example .env
```
2. Open .env and insert your own API keys (e.g., for OpenAI).

Note: Never commit .env files with real keys. The example file is only a template.


### 4. Running the Development Server

```bash
npm run dev
```

Open your browser and go to: [http://localhost:3000](http://localhost:3000)

---

##  UI Workflow

| Step | Description | Image |
|------|-------------|-------|
| 1. Registration | Input of personal parameters | `public/images/user_registration.png` |
| 2. Upload | Wall image submission | `public/images/upload_step.png` |
| 3. Generate | AI creates personalized route | `public/images/generate_step.png` |
| 2. Preview | The generated path + instructions | `public/images/preview_step.png` |

Screenshots are also included in the thesis document (see Chapter 4).

---

##  Folder Structure

```
bouldre/
│
├── app/                   # App Router structure
├── components/            # Reusable React components
├── lib/                   # Utility functions (OpenAI, SVG, filtering)
├── public/images/         # App assets and static images
├── styles/                # Global styles (Tailwind, custom)
├── .env.example           # Template for API keys (excluded in archive)
└── README.md              # Project documentation
```

---

##  Evaluation and Data

This project was evaluated using a Turing-test-style classification survey involving 31 participants. It assessed the realism of AI-generated routes based on visual judgment.

The complete dataset, visualizations, and results are provided in:
- `appendix/evaluation_charts_and_metrics.zip`
- `appendix/survey_responses.csv`

See **Appendix B–C** in the thesis for full details.

---

## License and Academic Use

This code was developed solely for research and academic purposes at TU Chemnitz.  
Use is permitted for educational or non-commercial research. For inquiries, contact the author.

Author: Ketjona Lepuri 
Email: ketjona.lepuri@s2023.tu-chemnitz.de
Thesis Year: 2025

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI GPT-4 API](https://platform.openai.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)