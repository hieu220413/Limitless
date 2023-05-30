package fpt.edu.limitlessapi.service.impl;

import fpt.edu.limitlessapi.entity.Workout;
import fpt.edu.limitlessapi.exception.WorkoutNotFoundException;
import fpt.edu.limitlessapi.repository.WorkoutRepository;
import fpt.edu.limitlessapi.service.WorkoutService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Log4j2
@Service
public class WorkoutServiceImpl implements WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;
    @Override
    public List<Workout> getWorkoutsByNameAndLevel(String name, String level) throws WorkoutNotFoundException {
        List<Workout> workouts = (List<Workout>) workoutRepository.findByNameLAndLevel(name,level);
        if(workouts.isEmpty()) {
            log.warn("No workout with name " + name + "and level " + level);
            throw new WorkoutNotFoundException("No workout with name " + name + " and level " + level);
        }
        return workouts;
    }

    @Override
    public Workout getWorkoutById(UUID workoutId) throws WorkoutNotFoundException {
        return workoutRepository.findById(workoutId)
                .orElseThrow(() ->  new WorkoutNotFoundException("No workout with id " + workoutId));
    }

    @Override
    public List<Workout> getWorkoutsByLevel(String level) throws WorkoutNotFoundException {
        List<Workout> workouts = (List<Workout>) workoutRepository.findByLevelName(level);
        if(workouts.isEmpty()) {
            log.warn("No workout with level " + level);
            throw new WorkoutNotFoundException("No workout with level " + level);
        }
        return workouts;
    }

    @Override
    public List<Workout> getAll() throws WorkoutNotFoundException {
        return workoutRepository.findAll();
    }
}
