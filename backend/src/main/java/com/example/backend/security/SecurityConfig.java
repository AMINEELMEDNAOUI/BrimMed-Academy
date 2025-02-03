package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/students/register").permitAll()
                        .requestMatchers("/api/professors/**").permitAll()
                        .requestMatchers("/api/dashboard/stats").permitAll()
                        .requestMatchers("/api/students/absences").permitAll()
                        .requestMatchers("/api/professors/absences").permitAll()
                        .requestMatchers("/api/students/paiements").permitAll()
                        .requestMatchers("/api/professors/paiements").permitAll()
                        .requestMatchers("/api/students/updateAbsence").permitAll()
                        .requestMatchers("/api/professors/updateAbsence").permitAll()
                        .requestMatchers("/api/students/updatePaiement").permitAll()
                        .requestMatchers("/api/professors/updatePaiement").permitAll()
                        .requestMatchers("/api/students/all").permitAll()
                        .requestMatchers("/api/professors/all").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/users/**").permitAll()
                        .requestMatchers("/api/emplois/{niveau}").permitAll()
                        .requestMatchers("/api/emplois/{idemp}/{jour}").permitAll()
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/annonces/all").permitAll()
                        .requestMatchers("/api/annonces/add").permitAll()
                        .requestMatchers("/api/annonces/{id}").permitAll()

                        .requestMatchers("/api/students/{userId}").permitAll()
                        .requestMatchers("/api/students/{userId}/paiements").permitAll()
                        .requestMatchers("/api/students/{userId}/absences").permitAll()
                        .requestMatchers("/api/emplois/user/{userId}").permitAll()

                        .requestMatchers("/api/professors/matiere/{userId}").permitAll()
                        .requestMatchers("/api/professors/paiement/{userId}").permitAll()
                        .requestMatchers("/api/emplois/userP/{userId}").permitAll()
                        .requestMatchers("/api/professors/absences/{userId}").permitAll()

                        .anyRequest().authenticated()
                );

        return http.build();
    }
}