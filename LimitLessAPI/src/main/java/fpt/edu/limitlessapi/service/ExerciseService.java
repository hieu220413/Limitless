package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;
import fpt.edu.limitlessapi.model.ExerciseCreateRequestBody;
import fpt.edu.limitlessapi.model.ExerciseCreateUpdateRespondBody;
import fpt.edu.limitlessapi.model.ExerciseUpdateRequestBody;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {

    List<Exercise> getAllExercises() throws ExerciseNotFoundException;

    Exercise getExerciseById(UUID uuid) throws ExerciseNotFoundException;

    List<Exercise> getExercisesByLevel(String level) throws ExerciseNotFoundException;

    List<Exercise> getExercisesByTag(String tag) throws ExerciseNotFoundException;

    List<Exercise> getExercisesByName(String name,String level) throws ExerciseNotFoundException;

    ExerciseCreateUpdateRespondBody createExercise(ExerciseCreateRequestBody exerciseCreateRequestBody);

    ExerciseCreateUpdateRespondBody updateExercise(ExerciseUpdateRequestBody exerciseUpdateRequestBody);
}
