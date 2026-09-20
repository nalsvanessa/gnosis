import { useState } from 'react';
import type { Challenge } from '../data-types/Challenge';

function ChallengeCard({
  challenge,
  onDelete
}: {
  challenge: Challenge;
  onDelete: (id: number) => void;
}) {

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(challenge.title);
  const [description, setDescription] = useState(challenge.description);
  const [category, setCategory] = useState(challenge.category);
  const [difficulty, setDifficulty] = useState(challenge.difficulty);
  const [reflection, setReflection] = useState(challenge.reflection ?? "");

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`/api/challenge/${challenge.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        category,
        difficulty,
        reflection,
        completed: challenge.completed
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to update challenge");
        }
        return response.json();
      })
      .then(() => {
        setIsEditing(false);
      })
      .catch(() => {
        console.log("Failed to update challenge");
      });
  };

  if (isEditing) {
    return (
      <form onSubmit={handleEdit}>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="Social">Social</option>
          <option value="Career">Career</option>
          <option value="Learning">Learning</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Creativity">Creativity</option>
        </select>

        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <textarea
          value={reflection}
          onChange={e => setReflection(e.target.value)}
        />

        <button type="submit">
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>

      </form>
    );
  }

 return (
  <div className="challenge-card">

    <h2>{challenge.title}</h2>

    <p>{challenge.category}</p>

    <p>{challenge.difficulty}</p>

    <p>{challenge.description}</p>

    <h3>Reflection</h3>

    <p>{challenge.reflection}</p>

    <p>{challenge.completed}</p>

    <p>Started: {challenge.createdAt}</p>

    <p>Completed: {challenge.completedAt}</p>

    <button onClick={() => setIsEditing(true)}>
      Edit
    </button>

    <button onClick={() => onDelete(challenge.id)}>
      Delete
    </button>

  </div>
)
}
export default ChallengeCard;