package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.entity.Workout;
import fpt.edu.limitlessapi.exception.WorkoutNotFoundException;
import fpt.edu.limitlessapi.model.WorkoutCreateRequestBody;
import fpt.edu.limitlessapi.model.WorkoutCreateUpdateRespondBody;
import fpt.edu.limitlessapi.model.WorkoutUpdateRequestBody;

import java.util.List;
import java.util.UUID;

public interface WorkoutService {
    List<Workout> getWorkoutsByNameAndLevel(String name,String level) throws WorkoutNotFoundException;

    Workout getWorkoutById(UUID workoutId) throws WorkoutNotFoundException;

    List<Workout> getWorkoutsByLevel(String level) throws WorkoutNotFoundException;

    List<Workout> getAll() throws WorkoutNotFoundException;

    WorkoutCreateUpdateRespondBody createWorkout(WorkoutCreateRequestBody workoutCreateRequestBody);

    WorkoutCreateUpdateRespondBody updateWorkout(WorkoutUpdateRequestBody workoutUpdateRequestBody);
}
