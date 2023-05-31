package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;
import fpt.edu.limitlessapi.model.StatisticResponseBody;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.HashMap;

public interface StatisticService {
    void updateTodayStat(String userId, String exerciseId) throws ExerciseNotFoundException;

    HashMap getStatisticByDate(String userId, LocalDate date);
}
