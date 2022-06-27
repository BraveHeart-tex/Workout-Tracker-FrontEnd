import React from 'react';

// interfaces
import Workout from '../interfaces/Workout';

interface WorkoutProps {
  workout: Workout;
}

const WorkoutDetails = ({ workout }: WorkoutProps) => {
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg) : </strong>
        {workout.load}
      </p>
      <p>
        <strong>Load (reps) : </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
