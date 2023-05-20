package fpt.edu.limitlessapi.controller;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;
import fpt.edu.limitlessapi.service.ExerciseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("api/exercise")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("")
    public ResponseEntity<List<Exercise>> fetchAll() throws ExerciseNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.getAllExercises());
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<Exercise>> fetchByName(@PathVariable("name") String name) throws ExerciseNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.getExercisesByLevel(name));
    }

    @GetMapping("/{level}")
    public ResponseEntity<List<Exercise>> fetchByLevel(@PathVariable("level") String level) throws ExerciseNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.getExercisesByLevel(level));
    }

    @GetMapping("/{tag}")
    public ResponseEntity<List<Exercise>> fetchByTag(@PathVariable("tag") String tag) throws ExerciseNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.getExercisesByTag(tag));
    }

}
