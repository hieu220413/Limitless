package fpt.edu.limitlessapi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class WorkoutUpdateRequestBody {

    private UUID workoutId;

    private String thumbnail;

    private String name;

    private String description;

    private int price;

    private Byte isPremium;

    private UUID levelId;

    private List<UUID> exerciseIdList;
}
