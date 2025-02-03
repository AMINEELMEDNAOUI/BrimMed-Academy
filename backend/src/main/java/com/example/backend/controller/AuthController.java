package com.example.backend.controller;

import com.example.backend.models.LoginRequest;
import com.example.backend.models.User;
import com.example.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User authenticatedUser = authService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (authenticatedUser != null) {
            // Redirection en fonction du rôle de l'utilisateur
            switch (authenticatedUser.getRole()) {
                case "ADMIN":
                    return ResponseEntity.ok().body(authenticatedUser.getId() + ":" + authenticatedUser.getRole() + ":" + authenticatedUser.getNom() + ":" +authenticatedUser.getPrenom());
                case "TEACHER":
                    return ResponseEntity.ok().body(authenticatedUser.getId() + ":" + authenticatedUser.getRole() + ":" + authenticatedUser.getNom() + ":" +authenticatedUser.getPrenom());
                case "STUDENT":
                    return ResponseEntity.ok().body(authenticatedUser.getId() + ":" + authenticatedUser.getRole() + ":" + authenticatedUser.getNom() + ":" +authenticatedUser.getPrenom());
                default:
                    return ResponseEntity.badRequest().body("Unknown role");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }
}

