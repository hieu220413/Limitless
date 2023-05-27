package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {

    @Query("SELECT sub FROM Subscription sub WHERE sub.user.userId = :userId AND sub.endDate > CURRENT_TIMESTAMP")
    Subscription findActiveSubscription(UUID userId);
}
