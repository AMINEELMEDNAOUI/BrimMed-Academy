package com.example.backend.service;

import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User authenticateUser(String email, String password) {
        User user = userRepository.findByMail(email);

        if (user != null && passwordEncoder.matches(password, user.getMdp())) {
            // Authentification réussie
            return user;
        } else {
            // Authentification échouée
            return null;
        }
    }
}
