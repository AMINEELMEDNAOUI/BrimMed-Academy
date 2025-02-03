package com.example.backend.repository;


import com.example.backend.models.MatProf;
import com.example.backend.models.Matiere;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatProfRepository extends JpaRepository<MatProf, Integer> {
}