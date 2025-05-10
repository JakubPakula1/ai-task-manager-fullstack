package com.github.jakubpakula1.aitaskmanager.backend.service;

import com.github.jakubpakula1.aitaskmanager.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        return userRepository
                .findUserByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found with given email"));
    }
}
