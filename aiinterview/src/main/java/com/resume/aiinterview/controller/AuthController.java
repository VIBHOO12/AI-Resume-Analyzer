package com.resume.aiinterview.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resume.aiinterview.dto.LoginRequest;
import com.resume.aiinterview.dto.LoginResponse;
import com.resume.aiinterview.entity.User;
import com.resume.aiinterview.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(
            @RequestBody User user) {

        return authService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        String token =
                authService.login(request);

        return new LoginResponse(token);
    }
}