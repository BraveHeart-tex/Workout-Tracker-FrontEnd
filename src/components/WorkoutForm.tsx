import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState<string>('');
  const [load, setLoad] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [error, setError] = useState<boolean | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[] | null>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle('');
      setLoad('');
      setReps('');
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise title</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields?.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg)</label>
      <input
        type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields?.includes('load') ? 'error' : ''}
      />

      <label>Reps</label>
      <input
        type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields?.includes('reps') ? 'error' : ''}
      />

      <button>Add workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
