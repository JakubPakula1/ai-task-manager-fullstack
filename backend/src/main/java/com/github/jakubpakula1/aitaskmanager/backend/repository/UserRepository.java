package com.github.jakubpakula1.aitaskmanager.backend.repository;

import com.github.jakubpakula1.aitaskmanager.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);
}
