package com.resume.aiinterview.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.resume.aiinterview.dto.LoginRequest;
import com.resume.aiinterview.entity.User;
import com.resume.aiinterview.repository.UserRepository;
import com.resume.aiinterview.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User register(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public String login(LoginRequest request) {

        Optional<User> user =
                userRepository.findByEmail(request.getEmail());

        if (user.isPresent()) {

            boolean matched =
                    passwordEncoder.matches(
                            request.getPassword(),
                            user.get().getPassword());

            if (matched) {

                return jwtUtil.generateToken(
                        request.getEmail());
            }
        }

        return null;
    }
}