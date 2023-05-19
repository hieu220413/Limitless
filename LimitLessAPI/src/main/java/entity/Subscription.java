package entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "subscription_id")
    private UUID subscriptionId;

    private double price;

    private Date startDate;

    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "users_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Users user;
}
