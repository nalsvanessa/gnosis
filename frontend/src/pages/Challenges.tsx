import ChallengeCard from '../components/ChallengeCard';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import type { Challenge } from '../data-types/Challenge';

function Challenges() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    const [status, setStatus] = useState("All");
    const [category, setCategory] = useState("All");
    const [month, setMonth] = useState("All");

    const handleDelete = (id: number) => {
        fetch(`/api/challenge/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete challenge");
                }
            })
            .then(() => {
                setChallenges(
                    challenges.filter(challenge => challenge.id !== id)
                );
            })
            .catch(() => {
                console.log("Failed to delete challenge");
            });
    };

    useEffect(() => {
        Promise.all([
            fetch('/api/challenge/completed').then(response => response.json()),
            fetch('/api/challenge/incomplete').then(response => response.json())
        ])
            .then(([completed, incomplete]) => {
                setChallenges([...completed, ...incomplete]);
            });
    }, []);

    const filteredChallenges = challenges.filter(challenge => {

        const statusMatches =
            status === "All" ||
            (status === "Completed" && challenge.completed) ||
            (status === "Incomplete" && !challenge.completed);

        const categoryMatches =
            category === "All" ||
            challenge.category === category;

        const monthMatches =
            month === "All" ||
            (
                challenge.completedAt !== null &&
                new Date(challenge.completedAt).getMonth() + 1 === Number(month)
            );

        return statusMatches && categoryMatches && monthMatches;
    });

    return (
        <div className="challenges-page">
            <Navbar />

            <main className="challenges-content">

                <section className="page-header">
                    <p className="eyebrow">YOUR JOURNEY</p>
                    <h1>My Challenges</h1>
                    <p className="page-description">
                        Explore the experiences you've taken on and the challenges
                        still waiting for you.
                    </p>
                </section>

                <section className="filters">

                    <div className="filter-group">
                        <label>Status</label>

                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Incomplete">Incomplete</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Category</label>

                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Social">Social</option>
                            <option value="Career">Career</option>
                            <option value="Learning">Learning</option>
                            <option value="Health & Fitness">Health & Fitness</option>
                            <option value="Creativity">Creativity</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Month</label>

                        <select
                            value={month}
                            onChange={e => setMonth(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>

                </section>

                <section className="challenge-list">

                    <div className="results-heading">
                        <p>
                            {filteredChallenges.length}{" "}
                            {filteredChallenges.length === 1
                                ? "challenge"
                                : "challenges"}
                        </p>
                    </div>

                    <div className="challenge-grid">
                        {filteredChallenges.map(challenge => (
                            <ChallengeCard
                                key={challenge.id}
                                challenge={challenge}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                </section>

            </main>
        </div>
    );
}

export default Challenges;