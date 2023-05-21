package fpt.edu.limitlessapi.controller;

import fpt.edu.limitlessapi.exception.AuthFailException;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;
import fpt.edu.limitlessapi.exception.UserNotFoundException;
import fpt.edu.limitlessapi.model.ApiError;
import fpt.edu.limitlessapi.service.StatisticService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("api/statistic")
public class StatisticController {

    @Autowired
    private StatisticService statisticService;

    @RequestMapping(value = "/updateToday", method = RequestMethod.PUT)
    public ResponseEntity<HashMap> updateTodayStat(@RequestParam String userId, @RequestParam String exerciseId) throws ExerciseNotFoundException {
        statisticService.updateTodayStat(userId, exerciseId);
        HashMap<String,String> message = new HashMap<>();
        message.put("message", "update statistic successfully");
        return ResponseEntity.status(HttpStatus.OK).body(message);
    };
}
