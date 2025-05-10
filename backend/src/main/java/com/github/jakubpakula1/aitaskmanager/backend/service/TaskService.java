package com.github.jakubpakula1.aitaskmanager.backend.service;

import com.github.jakubpakula1.aitaskmanager.backend.dto.CreateTaskRequest;
import com.github.jakubpakula1.aitaskmanager.backend.dto.TaskResponse;
import com.github.jakubpakula1.aitaskmanager.backend.model.Task;
import com.github.jakubpakula1.aitaskmanager.backend.model.User;
import com.github.jakubpakula1.aitaskmanager.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskResponse createTask(CreateTaskRequest request, User user){
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(Task.Status.TODO)
                .user(user)
                .build();
        Task saved = taskRepository.save(task);
        return toResponse(saved);
    }

    public List<TaskResponse> getTaskByUser(User user){
        return taskRepository.findByUser(user).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private TaskResponse toResponse(Task task){
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setStatus(task.getStatus());
        response.setCreatedAt(task.getCreatedAt().toString());
        response.setUpdatedAt(task.getUpdatedAt().toString());
        response.setUserId(task.getUser().getId());
        return response;
    }
}
