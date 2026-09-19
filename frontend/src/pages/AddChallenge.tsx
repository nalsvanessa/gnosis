import { useState } from 'react';

function AddChallenge() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Social");
    const [difficulty, setDifficulty] = useState("Easy");
    const [reflection, setReflection] = useState("");
    
    const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!title) {
  console.log("Title is required");
  return;
}

if (!description) {
  console.log("Description is required");
  return;
}

  fetch('/api/challenge/addChallenge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      category,
      difficulty,
      reflection
    })
  })
    .then(response => response.json())
    .then(data => console.log(data));
};


  return (
    <div>
      <h1>Add Challenge</h1>

#<form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="category">Category</label>
        <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
        <option value="Social">Social</option>
        <option value="Career">Career</option>
        <option value="Learning">Learning</option>
        <option value="Health & Fitness">Health & Fitness</option>
        <option value="Creativity">Creativity</option>
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        </select>

        <label htmlFor="reflection">Reflection</label>
        <textarea
        id="reflection"
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        ></textarea>

        <button type="submit">Add Challenge</button>
      </form>
    </div>
  );
}

export default AddChallenge;
