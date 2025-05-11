package com.github.jakubpakula1.aitaskmanager.backend.service;

import com.github.jakubpakula1.aitaskmanager.backend.dto.CreateTaskRequest;
import com.github.jakubpakula1.aitaskmanager.backend.dto.TaskResponse;
import com.github.jakubpakula1.aitaskmanager.backend.exception.ResourceNotFoundException;
import com.github.jakubpakula1.aitaskmanager.backend.model.Task;
import com.github.jakubpakula1.aitaskmanager.backend.model.User;
import com.github.jakubpakula1.aitaskmanager.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskResponse createTask(CreateTaskRequest request, User user){

        Task.Priority priority = request.getPriority() != null && !request.getPriority().isEmpty()
                ? Task.Priority.valueOf(request.getPriority())
                : Task.Priority.MEDIUM;

        LocalDateTime dueDate = request.getDueDate() != null && !request.getDueDate().isEmpty()
                ? LocalDateTime.parse(request.getDueDate())
                : LocalDateTime.now().plusDays(7);

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(Task.Status.TODO)
                .priority(priority)
                .dueDate(dueDate)
                .createdAt(LocalDateTime.now()) // Ensure LocalDateTime is used
                .updatedAt(LocalDateTime.now())
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

    private TaskResponse toResponse(Task task) {
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setStatus(task.getStatus());
        response.setPriority(task.getPriority() != null ? task.getPriority().name() : "MEDIUM");
        response.setDueDate(task.getDueDate() != null ? task.getDueDate().toString() : LocalDateTime.now().plusDays(7).toString());
        response.setCreatedAt(formatDateTime(task.getCreatedAt()));
        response.setUpdatedAt(formatDateTime(task.getUpdatedAt()));
        response.setUserId(task.getUser().getId());
        return response;
    }

    private String formatDateTime(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    public Task deleteTask(Long id){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        taskRepository.delete(task);

        return task;
    }

public TaskResponse updateTaskField(Long id, Map<String, Object> updates) {
    Task task = taskRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

    updates.forEach((field, value) -> {
        switch (field) {
            case "title":
                task.setTitle((String) value);
                break;
            case "description":
                task.setDescription((String) value);
                break;
            case "status":
                task.setStatus(Task.Status.valueOf((String) value));
                break;
            case "priority":
                task.setPriority(Task.Priority.valueOf((String) value));
                break;
            case "dueDate":
            case "due_date":
                if (((String) value).length() == 10) { // Handle date-only format
                    task.setDueDate(LocalDate.parse((String) value).atStartOfDay());
                } else { // Handle full date-time format
                    task.setDueDate(LocalDateTime.parse((String) value));
                }
                break;
            default:
                throw new IllegalArgumentException("Field " + field + " is not updatable");
        }
    });
    task.setUpdatedAt(LocalDateTime.now());
    Task updatedTask = taskRepository.save(task);
    return toResponse(updatedTask);
}

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}
