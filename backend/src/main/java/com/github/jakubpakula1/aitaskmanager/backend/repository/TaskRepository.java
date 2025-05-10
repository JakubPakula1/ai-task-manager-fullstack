package com.github.jakubpakula1.aitaskmanager.backend.repository;

import com.github.jakubpakula1.aitaskmanager.backend.model.Task;
import com.github.jakubpakula1.aitaskmanager.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository  extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
