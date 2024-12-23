package com.packtrack.packtrack_backend.repository;

import com.packtrack.packtrack_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<com.packtrack.packtrack_backend.model.User, Long> {
    com.packtrack.packtrack_backend.model.User findByUsername(String username);  // Custom method to find user by username
}
