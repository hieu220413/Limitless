package fpt.edu.limitlessapi.controller;

import fpt.edu.limitlessapi.entity.Workout;
import fpt.edu.limitlessapi.exception.WorkoutNotFoundException;
import fpt.edu.limitlessapi.model.WorkoutCreateRequestBody;
import fpt.edu.limitlessapi.model.WorkoutCreateUpdateRespondBody;
import fpt.edu.limitlessapi.model.WorkoutUpdateRequestBody;
import fpt.edu.limitlessapi.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/workout")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    @GetMapping("")
    public ResponseEntity<List<Workout>> getAll() throws WorkoutNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(workoutService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable("id") UUID id) throws WorkoutNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(workoutService.getWorkoutById(id));
    }

    @GetMapping("/searchByNameAndLevel")
    public ResponseEntity<List<Workout>> getWorkout(@RequestParam("name") String name, @RequestParam("level") String level) throws WorkoutNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(workoutService.getWorkoutsByNameAndLevel(name, level));
    }

    @GetMapping("/fetchByLevel")
    public ResponseEntity<List<Workout>> getWorkout(@RequestParam("level") String level) throws WorkoutNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(workoutService.getWorkoutsByLevel(level));
    }


    @PostMapping("/create")
    public ResponseEntity<WorkoutCreateUpdateRespondBody> createWorkout(@RequestBody WorkoutCreateRequestBody workoutCreateRequestBody){
        return ResponseEntity.status(HttpStatus.OK).body(workoutService.createWorkout(workoutCreateRequestBody));
    }

    @PutMapping("/update")
    public ResponseEntity<WorkoutCreateUpdateRespondBody> updateWorkout(@RequestBody WorkoutUpdateRequestBody workoutUpdateRequestBody){
        return ResponseEntity.status(HttpStatus.OK).body(workoutService.updateWorkout(workoutUpdateRequestBody));
    }
}
