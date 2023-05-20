package fpt.edu.limitlessapi.service.impl;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.entity.Level;
import fpt.edu.limitlessapi.entity.Tag;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;
import fpt.edu.limitlessapi.repository.ExerciseRepository;
import fpt.edu.limitlessapi.repository.LevelRepository;
import fpt.edu.limitlessapi.repository.TagRepository;
import fpt.edu.limitlessapi.service.ExerciseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

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
    public List<Exercise> getExercisesByName(String name) throws ExerciseNotFoundException {
        log.info("Fetch exercise by name " + name);
        List<Exercise> exerciseList = (List<Exercise>) exerciseRepository.findByNameContains(name);
        if(exerciseList.isEmpty()){
            log.debug("No exercise with this name");
            throw new ExerciseNotFoundException("No exercise with this name");
        }
        return exerciseList;
    }
}
