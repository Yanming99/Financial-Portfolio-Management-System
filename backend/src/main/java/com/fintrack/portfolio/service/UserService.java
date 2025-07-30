package com.fintrack.portfolio.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintrack.portfolio.model.User;
import com.fintrack.portfolio.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String register(String username, String password) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            return "Username already exists.";
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password); // ⚠️ 建议改为加密存储！

        userRepository.save(newUser);
        return "Registration successful!";
    }

    public String login(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return "Login successful!";
        } else {
            return "Invalid username or password.";
        }
    }
}
