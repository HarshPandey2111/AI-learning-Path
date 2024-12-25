# Personalized Learning Path Platform

A React-based platform that provides personalized learning recommendations, including workshops, daily tasks, mentor matching, and analytics dashboard.

## Features

- 🎯 Personalized daily tasks based on student weaknesses
- 📚 Workshop recommendations aligned with interests
- 👥 Mentor matching system
- 📊 Analytics dashboard with attendance and feedback metrics
- 🔄 Real-time updates and interactions
- 📱 Responsive design for all devices

## Tech Stack

- React with TypeScript
- Chart.js for data visualization
- Tailwind CSS for styling
- Supabase for backend and real-time features
- Lucide React for icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── charts/         # Chart components
│   └── ui/             # UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and API functions
│   ├── api/           # API interaction functions
│   ├── supabase.ts    # Supabase client configuration
│   ├── types.ts       # TypeScript interfaces
│   └── utils/         # Utility functions
├── pages/             # Page components
└── main.tsx           # Application entry point
```

## Database Schema

The application uses the following main tables:
- `students`: Student profiles and preferences
- `workshops`: Available learning workshops
- `mentors`: Mentor profiles and expertise
- `daily_tasks`: Generated tasks for students
- `learning_paths`: Tracks student progress and enrollments
- `workshop_metrics`: Workshop attendance and feedback data

## Analytics Dashboard

The analytics dashboard provides insights into:
- Workshop attendance trends
- Feedback scores over time
- Interactive date range filtering
- Per-workshop performance metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT