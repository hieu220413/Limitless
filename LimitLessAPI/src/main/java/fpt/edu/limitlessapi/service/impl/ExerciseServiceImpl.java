package fpt.edu.limitlessapi.service.impl;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.entity.Level;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundRuntimeException;
import fpt.edu.limitlessapi.exception.InvalidExerciseInputException;
import fpt.edu.limitlessapi.exception.LevelNotFoundException;
import fpt.edu.limitlessapi.model.ExerciseCreateRequestBody;
import fpt.edu.limitlessapi.model.ExerciseCreateUpdateRespondBody;
import fpt.edu.limitlessapi.model.ExerciseUpdateRequestBody;
import fpt.edu.limitlessapi.repository.ExerciseRepository;
import fpt.edu.limitlessapi.repository.LevelRepository;
import fpt.edu.limitlessapi.repository.TagRepository;
import fpt.edu.limitlessapi.service.ExerciseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Log4j2
public class ExerciseServiceImpl implements ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<Exercise> getAllExercises() throws ExerciseNotFoundException {
        log.info("Fetch all exercise");
        List<Exercise> exerciseList = (List<Exercise>) exerciseRepository.findAll();
        if(exerciseList.isEmpty()){
            log.debug("No exercise");
            throw new ExerciseNotFoundException("No exercise");
        }
        log.debug("Exercises: {}",exerciseList);
        return exerciseList;
    }

    @Override
    public Exercise getExerciseById(UUID uuid) throws ExerciseNotFoundException {
        log.info("Fetch exercise by id {}",uuid);
        return exerciseRepository.findById(uuid)
                .orElseThrow(() -> new ExerciseNotFoundException("No such exercise"));
    }

    @Override
    public List<Exercise> getExercisesByLevel(String level) throws ExerciseNotFoundException {
        log.info("Fetch exercise by level {}",level);
        List<Exercise> exerciseList = (List<Exercise>) levelRepository.findByName(level).getExercises();
        if(exerciseList.isEmpty()){
            log.debug("No exercise with this level");
            throw new ExerciseNotFoundException("No exercise with this level");
        }
        return exerciseList;
    }

    @Override
    public List<Exercise> getExercisesByTag(String tag) throws ExerciseNotFoundException {
        log.info("Fetch exercise by tag " + tag);
        List<Exercise> exerciseList = (List<Exercise>) tagRepository.findByName(tag).getExercises();
        if(exerciseList.isEmpty()){
            log.debug("No exercise with this tag");
            throw new ExerciseNotFoundException("No exercise with this tag");
        }
        return exerciseList;
    }

    @Override
    public List<Exercise> getExercisesByName(String name,String level) throws ExerciseNotFoundException {
        log.info("Fetch exercise by name " + name);
        List<Exercise> exerciseList = (List<Exercise>) exerciseRepository.findByNameLAndLevel(name,level);
        if(exerciseList.isEmpty()){
            log.debug("No exercise with this name and level");
            throw new ExerciseNotFoundException("No exercise with this name and level");
        }
        return exerciseList;
    }

    @Override
    public ExerciseCreateUpdateRespondBody createExercise(ExerciseCreateRequestBody exerciseCreateRequestBody) {
        HashMap errorFields = new HashMap<>();

        Optional<Level> levelEntity = levelRepository.findById(exerciseCreateRequestBody.getLevelId());

        if(!levelEntity.isPresent()){
            throw new LevelNotFoundException("NOT_FOUND");
        }

        if(exerciseCreateRequestBody.getName().isBlank() || exerciseCreateRequestBody.getName().length() > 254){
            errorFields.put("nameError", "Name can not be empty or lower than 254");
        }

        if(exerciseCreateRequestBody.getThumbnail().isBlank() || exerciseCreateRequestBody.getThumbnail().length() > 254 ){
            errorFields.put("thumbnailError", "Thumbnail can not be empty or lower than 254");
        }

        if(exerciseCreateRequestBody.getDescription().isBlank() || exerciseCreateRequestBody.getDescription().length() > 254 ){
            errorFields.put("descriptionError", "Description can not be empty or lower than 254");
        }

        if(exerciseCreateRequestBody.getVideo().isBlank() || exerciseCreateRequestBody.getVideo().length() > 254 ){
            errorFields.put("videoError", "Video can not be empty or length lower than 254");
        }

        if(exerciseCreateRequestBody.getSets() <= 0 || exerciseCreateRequestBody.getSets() > 10 ){
            errorFields.put("setsError", "Sets must higher than 0 and lower than 10");
        }

        if(exerciseCreateRequestBody.getReps()  <= 0 || exerciseCreateRequestBody.getReps() > 50 ){
            errorFields.put("repsError", "Reps must higher than 0 and lower than 50");
        }

        if(exerciseCreateRequestBody.getDuration()  <= 0 || exerciseCreateRequestBody.getDuration() > 20 ){
            errorFields.put("durationError", "Duration must higher than 0 and lower than 20");
        }

        if(exerciseCreateRequestBody.getCaloriesBurn()  <= 0 || exerciseCreateRequestBody.getCaloriesBurn() > 600){
            errorFields.put("caloriesBurnError", "Calories burn must higher than 0 and lower than 600");

        }

        if(errorFields.size() > 0){
            throw new InvalidExerciseInputException("UNPROCESSABLE_ENTITY", errorFields);
        }

        Exercise exerciseEntity = new Exercise(exerciseCreateRequestBody, levelEntity.get());

        Exercise insertedExercise =  exerciseRepository.save(exerciseEntity);

        ExerciseCreateUpdateRespondBody exerciseCreateUpdateRespondBody = new ExerciseCreateUpdateRespondBody(insertedExercise);

        return exerciseCreateUpdateRespondBody;

    }

    @Override
    public ExerciseCreateUpdateRespondBody updateExercise(ExerciseUpdateRequestBody exerciseUpdateRequestBody) {
        HashMap errorFields = new HashMap<>();
        Level levelEntity = null;
        Optional<Exercise> exerciseEntity = exerciseRepository.findById(exerciseUpdateRequestBody.getExerciseId());

        if(!exerciseEntity.isPresent()){
            throw new ExerciseNotFoundRuntimeException("NOT_FOUND");
        }

        if(exerciseUpdateRequestBody.getLevelId() != null){
            Optional<Level> levelOptional = levelRepository.findById(exerciseUpdateRequestBody.getLevelId());
            if(!levelOptional.isPresent()){
                throw new LevelNotFoundException("NOT_FOUND");
            }
            levelEntity = levelOptional.get();
        }

        if(exerciseUpdateRequestBody.getName() != null && exerciseUpdateRequestBody.getName().length() > 254){
            errorFields.put("nameError", "Name length can not be higher than 254");
        }

        if(exerciseUpdateRequestBody.getThumbnail() != null && exerciseUpdateRequestBody.getThumbnail().length() > 254 ){
            errorFields.put("thumbnailError", "Thumbnail length can not be higher than 254");
        }

        if(exerciseUpdateRequestBody.getDescription() != null && exerciseUpdateRequestBody.getDescription().length() > 254 ){
            errorFields.put("descriptionError", "Description length can not be higher than 254");
        }

        if(exerciseUpdateRequestBody.getVideo() != null && exerciseUpdateRequestBody.getVideo().length() > 254 ){
            errorFields.put("videoError", "Video length can not be higher than 254");
        }

        if(exerciseUpdateRequestBody.getSets() < 0 || exerciseUpdateRequestBody.getSets() > 10 ){
            errorFields.put("setsError", "Sets must higher than 0 and lower than 10");
        }

        if(exerciseUpdateRequestBody.getReps()  < 0 || exerciseUpdateRequestBody.getReps() > 50 ){
            errorFields.put("repsError", "Reps must higher than 0 and lower than 50");
        }

        if(exerciseUpdateRequestBody.getDuration()  < 0 || exerciseUpdateRequestBody.getDuration() > 20 ){
            errorFields.put("durationError", "Duration must higher than 0 and lower than 20");
        }

        if(exerciseUpdateRequestBody.getCaloriesBurn()  < 0 || exerciseUpdateRequestBody.getCaloriesBurn() > 600){
            errorFields.put("caloriesBurnError", "Calories burn must higher than 0 and lower than 600");

        }

        if(errorFields.size() > 0){
            throw new InvalidExerciseInputException("UNPROCESSABLE_ENTITY", errorFields);
        }

        if(exerciseUpdateRequestBody.getName() != null && !exerciseUpdateRequestBody.getName().isBlank()) exerciseEntity.get().setName(exerciseUpdateRequestBody.getName());
        if(exerciseUpdateRequestBody.getThumbnail() != null && !exerciseUpdateRequestBody.getThumbnail().isBlank()) exerciseEntity.get().setThumbnail(exerciseUpdateRequestBody.getThumbnail());
        if(exerciseUpdateRequestBody.getDescription() != null && !exerciseUpdateRequestBody.getDescription().isBlank()) exerciseEntity.get().setDescription(exerciseUpdateRequestBody.getDescription());
        if(exerciseUpdateRequestBody.getVideo() != null && !exerciseUpdateRequestBody.getVideo().isBlank()) exerciseEntity.get().setVideo(exerciseUpdateRequestBody.getVideo());
        if(exerciseUpdateRequestBody.getSets() != 0) exerciseEntity.get().setSets(exerciseUpdateRequestBody.getSets());
        if(exerciseUpdateRequestBody.getReps() != 0) exerciseEntity.get().setReps(exerciseUpdateRequestBody.getReps());
        if(exerciseUpdateRequestBody.getDuration() != 0) exerciseEntity.get().setDuration(exerciseUpdateRequestBody.getDuration());
        if(exerciseUpdateRequestBody.getCaloriesBurn() != 0) exerciseEntity.get().setCaloriesBurn(exerciseUpdateRequestBody.getCaloriesBurn());
        if(levelEntity != null) exerciseEntity.get().setLevel(levelEntity);
        Exercise updatedExercise = exerciseRepository.save(exerciseEntity.get());
        ExerciseCreateUpdateRespondBody exerciseCreateUpdateRespondBody = new ExerciseCreateUpdateRespondBody(updatedExercise);

        return exerciseCreateUpdateRespondBody;
    }
}
