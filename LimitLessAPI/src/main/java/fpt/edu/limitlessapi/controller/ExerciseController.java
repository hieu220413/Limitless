package fpt.edu.limitlessapi.controller;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;
import fpt.edu.limitlessapi.model.ExerciseCreateRequestBody;
import fpt.edu.limitlessapi.model.ExerciseCreateUpdateRespondBody;
import fpt.edu.limitlessapi.model.ExerciseUpdateRequestBody;
import fpt.edu.limitlessapi.service.ExerciseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Log4j2
@RestController
@RequestMapping("/exercise")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("")
    public ResponseEntity<List<Exercise>> fetchAll() throws ExerciseNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.getAllExercises());
    }

    @GetMapping("/searchByNameAndLevel")
    public ResponseEntity<List<Exercise>> fetchByName(@RequestParam("name") String name,@RequestParam("level") String level) throws ExerciseNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.getExercisesByName(name,level));
    }

    @GetMapping("/fetchById")
    public ResponseEntity<Exercise> fetchById(@RequestParam("id") UUID uuid) throws ExerciseNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.getExerciseById(uuid));
    }

    @GetMapping("/fetchByLevel")
    public ResponseEntity<List<Exercise>> fetchByLevel(@RequestParam("level") String level) throws ExerciseNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.getExercisesByLevel(level));
    }

    @GetMapping("/fetchByTag")
    public ResponseEntity<List<Exercise>> fetchByTag(@RequestParam("tag") String tag) throws ExerciseNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.getExercisesByTag(tag));
    }

    @PostMapping("/create")
    @Operation(security = { @SecurityRequirement(name = "basicScheme") })
    public ResponseEntity<ExerciseCreateUpdateRespondBody> createExercise(@RequestBody ExerciseCreateRequestBody exerciseCreateRequestBody){
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.createExercise(exerciseCreateRequestBody));
    }

    @PutMapping("/update")
    @Operation(security = { @SecurityRequirement(name = "basicScheme") })
    public ResponseEntity<ExerciseCreateUpdateRespondBody> updateExercise(@RequestBody ExerciseUpdateRequestBody exerciseUpdateRequestBody){
        return ResponseEntity.status(HttpStatus.OK).body(exerciseService.updateExercise(exerciseUpdateRequestBody));
    }

}
