package com.packtrack.packtrack_backend.controller;

import com.packtrack.packtrack_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint for login authentication
    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        if (userService.authenticate(username, password)) {
            return "Login successful";
        } else {
            return "Invalid username or password";
        }
    }

    // Admin creates a new employee
    @PostMapping("/create-employee")
    public String createEmployee(@RequestParam String username, @RequestParam String password, @RequestParam String role) {
        if ("admin".equals(role)) {
            return "Role 'admin' cannot be used for creating employee";
        }
        userService.createEmployee(username, password, role);
        return "Employee created successfully";
    }
}
