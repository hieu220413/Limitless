package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExerciseService {

    List<Exercise> getAllExercises() throws ExerciseNotFoundException;

    Exercise getExerciseById(UUID uuid) throws ExerciseNotFoundException;

    List<Exercise> getExercisesByLevel(String level) throws ExerciseNotFoundException;

    List<Exercise> getExercisesByTag(String tag) throws ExerciseNotFoundException;

    List<Exercise> getExercisesByName(String name,String level) throws ExerciseNotFoundException;
}
