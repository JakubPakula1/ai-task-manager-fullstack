package com.github.jakubpakula1.aitaskmanager.backend.dto;

import com.github.jakubpakula1.aitaskmanager.backend.model.Task;
import lombok.Data;

@Data
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private Task.Status status;
    private String priority;
    private String dueDate;
    private String createdAt;
    private String updatedAt;
    private Long userId;
}
