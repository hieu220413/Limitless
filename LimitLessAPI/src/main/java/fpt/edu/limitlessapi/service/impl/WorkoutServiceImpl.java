package fpt.edu.limitlessapi.service.impl;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.entity.Level;
import fpt.edu.limitlessapi.entity.Workout;
import fpt.edu.limitlessapi.exception.InvalidExerciseInputException;
import fpt.edu.limitlessapi.exception.LevelNotFoundException;
import fpt.edu.limitlessapi.exception.WorkoutNotFoundException;
import fpt.edu.limitlessapi.exception.WorkoutNotFoundRuntimeException;
import fpt.edu.limitlessapi.model.WorkoutCreateRequestBody;
import fpt.edu.limitlessapi.model.WorkoutCreateUpdateRespondBody;
import fpt.edu.limitlessapi.model.WorkoutUpdateRequestBody;
import fpt.edu.limitlessapi.repository.ExerciseRepository;
import fpt.edu.limitlessapi.repository.LevelRepository;
import fpt.edu.limitlessapi.repository.WorkoutRepository;
import fpt.edu.limitlessapi.service.WorkoutService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Log4j2
@Service
public class WorkoutServiceImpl implements WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private LevelRepository levelRepository;

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

    @Override
    public WorkoutCreateUpdateRespondBody createWorkout(WorkoutCreateRequestBody workoutCreateRequestBody) {
        HashMap errorFields = new HashMap<>();

        Optional<Level> levelEntity = levelRepository.findById(workoutCreateRequestBody.getLevelId());

        if(!levelEntity.isPresent()){
            throw new LevelNotFoundException("NOT_FOUND");
        }

        if(workoutCreateRequestBody.getName().isBlank() || workoutCreateRequestBody.getName().length() > 254){
            errorFields.put("nameError", "Name can not be empty or lower than 254");
        }

        if(workoutCreateRequestBody.getThumbnail().isBlank() || workoutCreateRequestBody.getThumbnail().length() > 254 ){
            errorFields.put("thumbnailError", "Thumbnail can not be empty or lower than 254");
        }

        if(workoutCreateRequestBody.getDescription().isBlank() || workoutCreateRequestBody.getDescription().length() > 254 ){
            errorFields.put("descriptionError", "Description can not be empty or lower than 254");
        }

        if(workoutCreateRequestBody.getPrice() < 1000){
            errorFields.put("priceError", "Price must higher than 1000");
        }


        if(workoutCreateRequestBody.getIsPremium()  < 0 || workoutCreateRequestBody.getIsPremium() > 1){
            errorFields.put("premiumError", "Premium must be 0 or 1");

        }

        if(errorFields.size() > 0){
            throw new InvalidExerciseInputException("UNPROCESSABLE_ENTITY", errorFields);
        }

        List<UUID> selectedExerciseId = new ArrayList<>();
        List<Exercise> existedExercise;

        selectedExerciseId.addAll(workoutCreateRequestBody.getExerciseIdList());

        existedExercise = exerciseRepository.findByIdList(selectedExerciseId);

        Workout workoutEntity = new Workout(workoutCreateRequestBody, existedExercise, levelEntity.get());
        existedExercise.stream().forEach(exercise -> {
            exercise.getWorkouts().add(workoutEntity);
        });
        Workout insertedWorkout = workoutRepository.save(workoutEntity);
        WorkoutCreateUpdateRespondBody workoutCreateUpdateRespondBody = new WorkoutCreateUpdateRespondBody(insertedWorkout);
        return workoutCreateUpdateRespondBody;
    }

    @Override
    public WorkoutCreateUpdateRespondBody updateWorkout(WorkoutUpdateRequestBody workoutUpdateRequestBody) {
        HashMap errorFields = new HashMap<>();
        Level levelEntity = null;
        Optional<Workout> workoutEntity = workoutRepository.findById(workoutUpdateRequestBody.getWorkoutId());

        if(!workoutEntity.isPresent()){
            throw new WorkoutNotFoundRuntimeException("NOT_FOUND");
        }

        if(workoutUpdateRequestBody.getLevelId() != null){
            Optional<Level> levelOptional = levelRepository.findById(workoutUpdateRequestBody.getLevelId());
            if(!levelOptional.isPresent()){
                throw new LevelNotFoundException("NOT_FOUND");
            }
            levelEntity = levelOptional.get();
        }

        if(workoutUpdateRequestBody.getName() != null && workoutUpdateRequestBody.getName().length() > 254){
            errorFields.put("nameError", "Name length can not be higher than 254");
        }

        if(workoutUpdateRequestBody.getThumbnail() != null && workoutUpdateRequestBody.getThumbnail().length() > 254 ){
            errorFields.put("thumbnailError", "Thumbnail length can not be higher than 254");
        }

        if(workoutUpdateRequestBody.getDescription() != null && workoutUpdateRequestBody.getDescription().length() > 254 ){
            errorFields.put("descriptionError", "Description length can not be higher than 254");
        }

        if(workoutUpdateRequestBody.getPrice() != 0 &&  workoutUpdateRequestBody.getPrice() < 1000){
            errorFields.put("priceError", "Price must higher than 1000");
        }


        if( workoutUpdateRequestBody.getIsPremium() != null && (workoutUpdateRequestBody.getIsPremium()  < 0 || workoutUpdateRequestBody.getIsPremium() > 1)){
            errorFields.put("premiumError", "Premium must be 0 or 1");

        }

        if(errorFields.size() > 0){
            throw new InvalidExerciseInputException("UNPROCESSABLE_ENTITY", errorFields);
        }

//        HashMap workoutExerciseCheck = new HashMap();
//        List<Exercise> workoutExercisesList = workoutEntity.get().getExercises().stream().toList();
        List<Exercise> existedExercise;

//        workoutExercisesList.stream().forEach(exercise -> {
//            workoutExerciseCheck.put(exercise.getExerciseId(), exercise);
//        });

//        List<UUID> newExerciseIdList = new ArrayList<>();
//        workoutUpdateRequestBody.getExerciseIdList().stream().forEach(id -> {
//            if(!workoutExerciseCheck.containsKey(id)){
//                newExerciseIdList.add(id);
//            }
//        });

//        existedExercise = exerciseRepository.findByIdList(newExerciseIdList);


        List<UUID> selectedExerciseId = new ArrayList<>();
        selectedExerciseId.addAll(workoutUpdateRequestBody.getExerciseIdList());
        existedExercise = exerciseRepository.findByIdList(selectedExerciseId);

        //remove workout from all exercise
//        List<Exercise> allExercise = exerciseRepository.findAll();
//        allExercise.stream().forEach(exercise -> {
//            exercise.getWorkouts().removeIf(workout -> workout.getWorkoutId() == workoutEntity.get().getWorkoutId());
//        });
        workoutEntity.get().getExercises().forEach(exercise -> {
            exercise.getWorkouts().removeIf(workout -> workout.getWorkoutId() == workoutEntity.get().getWorkoutId());
        });

        //reset exercise list in workout
        workoutEntity.get().setExercises(new ArrayList<>());
        //add workout to exercise
        existedExercise.stream().forEach(exercise -> {
            workoutEntity.get().getExercises().add(exercise);
            exercise.getWorkouts().add(workoutEntity.get());
        });


        if(workoutUpdateRequestBody.getName() != null && !workoutUpdateRequestBody.getName().isBlank()) workoutEntity.get().setName(workoutUpdateRequestBody.getName());
        if(workoutUpdateRequestBody.getThumbnail() != null && !workoutUpdateRequestBody.getThumbnail().isBlank()) workoutEntity.get().setThumbnail(workoutUpdateRequestBody.getThumbnail());
        if(workoutUpdateRequestBody.getDescription() != null && !workoutUpdateRequestBody.getDescription().isBlank()) workoutEntity.get().setDescription(workoutUpdateRequestBody.getDescription());
        if(workoutUpdateRequestBody.getPrice() != 0) workoutEntity.get().setPrice(workoutUpdateRequestBody.getPrice());
        if(workoutUpdateRequestBody.getIsPremium() != null) workoutEntity.get().setIsPremium(workoutUpdateRequestBody.getIsPremium());
        workoutEntity.get().setTotalExercise(workoutEntity.get().getExercises().size());
        if(levelEntity != null) workoutEntity.get().setLevel(levelEntity);

        Workout updatedWorkout = workoutRepository.save(workoutEntity.get());
        WorkoutCreateUpdateRespondBody workoutCreateUpdateRespondBody = new WorkoutCreateUpdateRespondBody(updatedWorkout);
        return workoutCreateUpdateRespondBody;
    }
}
