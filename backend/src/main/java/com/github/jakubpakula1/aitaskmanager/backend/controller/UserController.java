package com.github.jakubpakula1.aitaskmanager.backend.controller;

import com.github.jakubpakula1.aitaskmanager.backend.model.User;
import com.github.jakubpakula1.aitaskmanager.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user){
        try{
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByUsername(user.getUsername());

        if(existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())){
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.badRequest().body("Invalid username or password");
    }
}
