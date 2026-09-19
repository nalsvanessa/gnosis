import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import type { Challenge } from '../data-types/Challenge';

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

  const chartData = Object.entries(progress).map(([month, count]) => ({
    month: Number(month),
    count
  }));

  return (
    <div>
      <Navbar />

      <h1>GNOSIS</h1>

      <h2>Your Progress</h2>

      <div>
        <h3>Completed Challenges</h3>
        <p>{completedChallenges.length}</p>
      </div>

      <div>
        <h3>Progress Over Time</h3>

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
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3>Recent Challenges</h3>

        {recentChallenges.map(challenge => (
          <div key={challenge.id}>
            <h4>{challenge.title}</h4>
            <p>{challenge.category}</p>
            <p>{challenge.completedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;