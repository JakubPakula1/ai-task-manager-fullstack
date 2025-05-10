package com.github.jakubpakula1.aitaskmanager.backend.controller;

import com.github.jakubpakula1.aitaskmanager.backend.dto.ApiResponse;
import com.github.jakubpakula1.aitaskmanager.backend.dto.CreateTaskRequest;
import com.github.jakubpakula1.aitaskmanager.backend.dto.TaskResponse;
import com.github.jakubpakula1.aitaskmanager.backend.model.Task;
import com.github.jakubpakula1.aitaskmanager.backend.model.User;
import com.github.jakubpakula1.aitaskmanager.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @RequestBody CreateTaskRequest request,
            @AuthenticationPrincipal User user
            ){
        TaskResponse response = taskService.createTask(request, user);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasks(
            @AuthenticationPrincipal User user
    ){
        return ResponseEntity.ok(taskService.getTaskByUser(user));
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
}
