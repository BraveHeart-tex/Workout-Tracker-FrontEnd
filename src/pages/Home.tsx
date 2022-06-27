import { useEffect, useState } from 'react';

// Interfaces
import Workout from '../interfaces/Workout';

// Components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const response = await fetch('/api/workouts');
    const json = await response.json();

    if (response.ok) {
      setWorkouts(json);
    }
  };

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout: Workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
