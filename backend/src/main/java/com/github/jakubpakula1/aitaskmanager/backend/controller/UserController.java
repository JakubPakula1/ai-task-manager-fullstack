package com.github.jakubpakula1.aitaskmanager.backend.controller;

import com.github.jakubpakula1.aitaskmanager.backend.config.JwtUtil;
import com.github.jakubpakula1.aitaskmanager.backend.dto.ApiResponse;
import com.github.jakubpakula1.aitaskmanager.backend.dto.LoginResponse;
import com.github.jakubpakula1.aitaskmanager.backend.model.User;
import com.github.jakubpakula1.aitaskmanager.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody User user){
        User createdUser = userService.registerUser(user);
        ApiResponse<User> response = new ApiResponse<>("success", "Successfully registered", createdUser);
        return ResponseEntity.ok(response);
    }

@PostMapping("/login")
public ResponseEntity<LoginResponse> login(@RequestBody User user) {
    Optional<User> existingUser = userService.getUserByUsername(user.getUsername());

    if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
        String token = jwtUtil.generateToken(existingUser.get().getUsername());
        LoginResponse response = new LoginResponse("success", token);
        return ResponseEntity.ok(response);
    }
    return ResponseEntity.badRequest().body(new LoginResponse("error", null));
}

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        ApiResponse<Void> response = new ApiResponse<>("success", "User deleted successfully", null);
        return ResponseEntity.ok(response);
    }
    @GetMapping("admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        ApiResponse<List<User>> response = new ApiResponse<>("success", "All users retrieved successfully", users);
        return ResponseEntity.ok(response);
    }
}
