package fpt.edu.limitlessapi.model;

import fpt.edu.limitlessapi.entity.Subscription;
import fpt.edu.limitlessapi.entity.Users;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionResponseBody {

    public SubscriptionResponseBody(Subscription subscription) {
        this.subscriptionId = subscription.getSubscriptionId();
        this.price = subscription.getPrice();
        this.startDate = subscription.getStartDate();
        this.endDate = subscription.getEndDate();
        this.userDetail = new UserResponseModel(subscription.getUser());
    }

    private UUID subscriptionId;

    private double price;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private UserResponseModel userDetail;
}
