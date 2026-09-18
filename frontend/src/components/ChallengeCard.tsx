
import type { Challenge } from '../data-types/Challenge';

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <div>
      <h2>{challenge.title}</h2>
      <p>{challenge.category}</p>
      <p>{challenge.difficulty}</p>
      <p>{challenge.description}</p>
      <p>{challenge.reflection}</p>
      <p>{challenge.completed}</p>
      <p>{challenge.createdAt}</p>
      <p>{challenge.completedAt}</p>
    </div>
  );
}

export default ChallengeCard;
