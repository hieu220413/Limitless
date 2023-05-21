package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;

public interface StatisticService {
    void updateTodayStat(String userId, String exerciseId) throws ExerciseNotFoundException;
}
