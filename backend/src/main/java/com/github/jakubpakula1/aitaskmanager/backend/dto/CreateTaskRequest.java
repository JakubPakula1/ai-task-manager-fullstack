package com.github.jakubpakula1.aitaskmanager.backend.dto;

import lombok.Data;

@Data
public class CreateTaskRequest {
    private String title;
    private String description;
}
