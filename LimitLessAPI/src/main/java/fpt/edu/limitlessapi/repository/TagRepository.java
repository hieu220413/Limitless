package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<Tag, UUID> {
    Tag findByName(String name);
}
