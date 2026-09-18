import ChallengeCard from '../components/ChallengeCard';
import { useEffect, useState } from 'react';
import type { Challenge } from '../data-types/Challenge';


function Challenges() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
  fetch('/api/challenge/incomplete')
    .then(response => response.json())
    .then(data => setChallenges(data));
}, []);

  return (
    <div>
      <h1>Challenges</h1>
      {challenges.map(challenge => (
  <ChallengeCard key={challenge.id} challenge={challenge} />
))}
    </div>
  );
}

export default Challenges;