package com.github.jakubpakula1.aitaskmanager.backend.service;

import com.github.jakubpakula1.aitaskmanager.backend.model.User;
import com.github.jakubpakula1.aitaskmanager.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User registerUser(User user){
        Optional<User> existingUser = userRepository.findUserByEmail(user.getUsername());
        if(existingUser.isPresent()){
            throw new RuntimeException("User already exists");
        }
        return userRepository.save(user);
    }

    public Optional<User> getUserByUsername(String username){
        return userRepository.findUserByEmail(username);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepository.delete(user);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
