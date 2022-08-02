import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// Interfaces
import Workout from '../interfaces/Workout';

// Components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  // const [workouts, setWorkouts] = useState<Workout[] | null>(null);

  useEffect(() => {
    fetchWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWorkouts = async () => {
    const response = await fetch('/api/workouts');
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_WORKOUTS', payload: json });
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
