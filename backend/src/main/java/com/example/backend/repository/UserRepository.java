package com.example.backend.repository;

import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByRole(String admin);

    Optional<User> findByNomAndPrenom(String nom, String prenom);

    User findByMail(String email);
}
