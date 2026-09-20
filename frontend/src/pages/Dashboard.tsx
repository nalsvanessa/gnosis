
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import type { Challenge } from '../data-types/Challenge';
import gnosisIllustration from '../assets/gnosis-illustration.svg';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function Dashboard() {
  const [completedChallenges, setCompletedChallenges] = useState<Challenge[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    Promise.all([
      fetch('/api/challenge/completed').then(response => response.json()),
      fetch('/api/challenge/progress').then(response => response.json())
    ])
      .then(([completed, progressData]) => {
        setCompletedChallenges(completed);
        setProgress(progressData);
      })
      .catch(() => {
        console.log("Failed to load dashboard data");
      });
  }, []);

  const recentChallenges = [...completedChallenges]
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() -
        new Date(a.completedAt!).getTime()
    )
    .slice(0, 5);
  const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const chartData = Object.entries(progress).map(([month, count]) => ({
  month: months[Number(month) - 1],
  count
}));

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard-content">

        <section className="dashboard-header">

            <img
             className="dashboard-image"
             src={gnosisIllustration}
              alt="A person stepping outside a doorway"/>
          <p className="eyebrow">YOUR JOURNEY</p>
          <h1>GNOSIS</h1>
          <p className="tagline">
            Step outside your comfort zone. Learn through experience.
          </p>
        </section>

        <h2>Your Progress</h2>

        <section className="stats-grid">

          <div className="stat-card">
            <p className="card-label">COMPLETED CHALLENGES</p>
            <p className="stat-number">{completedChallenges.length}</p>
            <p className="stat-description">
              Experiences you've completed
            </p>
          </div>

        </section>

        <section className="chart-card">
          <div className="section-heading">
            <div>
              <p className="card-label">PROGRESS</p>
              <h3>Progress Over Time</h3>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
                label={{
                  value: "Month",
                  position: "insideBottom",
                  offset: -5
                }}
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                name="Completed"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="recent-section">
          <div className="section-heading">
            <div>
              <p className="card-label">YOUR EXPERIENCES</p>
              <h3>Recent Challenges</h3>
            </div>
          </div>

          <div className="recent-grid">
            {recentChallenges.map(challenge => (
              <div className="recent-card" key={challenge.id}>
                <h4>{challenge.title}</h4>
                <p className="challenge-category">
                  {challenge.category}
                </p>
                <p className="challenge-date">
                  Completed {challenge.completedAt}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;