package com.github.jakubpakula1.aitaskmanager.backend.controller;

import com.github.jakubpakula1.aitaskmanager.backend.dto.ApiResponse;
import com.github.jakubpakula1.aitaskmanager.backend.dto.CreateTaskRequest;
import com.github.jakubpakula1.aitaskmanager.backend.dto.TaskResponse;
import com.github.jakubpakula1.aitaskmanager.backend.model.Task;
import com.github.jakubpakula1.aitaskmanager.backend.model.User;
import com.github.jakubpakula1.aitaskmanager.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<ApiResponse<TaskResponse>> createTask(
            @Valid @RequestBody CreateTaskRequest request,
            @AuthenticationPrincipal User user
            ){
        TaskResponse taskResponse = taskService.createTask(request, user);
        ApiResponse<TaskResponse> response = new ApiResponse<>("success", "Task added successfully", taskResponse);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TaskResponse>>> getTasks(
            @AuthenticationPrincipal User user
    ){
        List<TaskResponse> taskList = taskService.getTaskByUser(user);
        ApiResponse<List<TaskResponse>> response = new ApiResponse<>("success", "Tasks of user: " + user.getId(), taskList);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponse>> deleteTask(@PathVariable Long id){
        Task deletedTask = taskService.deleteTask(id);
        TaskResponse taskResponse = new TaskResponse();
        taskResponse.setId(deletedTask.getId());
        taskResponse.setTitle(deletedTask.getTitle());
        taskResponse.setDescription(deletedTask.getDescription());
        taskResponse.setStatus(deletedTask.getStatus());
        taskResponse.setCreatedAt(deletedTask.getCreatedAt().toString());
        taskResponse.setUpdatedAt(deletedTask.getUpdatedAt().toString());
        taskResponse.setUserId(deletedTask.getUser().getId());

        ApiResponse<TaskResponse> response = new ApiResponse<>("success", "Task deleted successfully", taskResponse);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponse>> updateTaskField(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates
            ){

        updates.forEach((field, value) -> {
            if ("status".equals(field)) {
                try {
                    Task.Status.valueOf((String) value);
                } catch (IllegalArgumentException e) {
                    throw new IllegalArgumentException("Invalid status value: " + value);
                }
            }
        });
        TaskResponse updatedTask = taskService.updateTaskField(id, updates);
        ApiResponse<TaskResponse> response = new ApiResponse<>("success", "Task updated successfully", updatedTask);
        return ResponseEntity.ok(response);
    }
}
