package com.github.jakubpakula1.aitaskmanager.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse<T> {
    private String status;
    private String message;
    private T data;

    public ApiResponse(String status, String message, T data) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}
