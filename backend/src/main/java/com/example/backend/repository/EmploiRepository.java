package com.example.backend.repository;

import com.example.backend.models.Emploi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmploiRepository extends JpaRepository<Emploi, Integer> {

    Emploi findByNiveau(String niveau);

    @Query("SELECT e FROM Emploi e WHERE e.niveau = (SELECT et.niveau FROM Etudiant et WHERE et.user.id = :userId)")
    List<Emploi> findEmploisByUserId(int userId);

    @Query("SELECT e FROM Emploi e WHERE e.niveau = (SELECT et.niveau FROM Prof et WHERE et.user.id = :userId)")
    List<Emploi> findEmploiByUserId(int userId);
}
