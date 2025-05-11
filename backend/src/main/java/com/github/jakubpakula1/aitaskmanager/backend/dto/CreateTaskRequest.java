package com.github.jakubpakula1.aitaskmanager.backend.dto;

import com.github.jakubpakula1.aitaskmanager.backend.model.Task;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTaskRequest {
    @NotBlank(message = "Title is required")
    private String title;
    @NotBlank(message = "Description is required")
    private String description;

    private Task.Status status;
    private String priority;
    private String dueDate;
}
