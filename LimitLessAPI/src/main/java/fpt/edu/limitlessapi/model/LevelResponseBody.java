package fpt.edu.limitlessapi.model;

import fpt.edu.limitlessapi.entity.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class LevelResponseBody {

    public LevelResponseBody(Level level) {
        this.levelId = level.getLevelId();
        this.name = level.getName();
    }

    private UUID levelId;
    private String name;
}
