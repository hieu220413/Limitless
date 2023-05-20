package fpt.edu.limitlessapi.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;

import java.sql.Date;
import java.util.UUID;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@Validated
public class SubscriptionRequestBody {
    private String subscriptionId;

    @NotNull
    private double price;

    @NotNull
    private String userId;

    @NotNull
    private int duration;
}
