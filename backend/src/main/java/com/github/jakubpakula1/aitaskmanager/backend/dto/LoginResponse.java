package com.github.jakubpakula1.aitaskmanager.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String status;
    private String token;
}