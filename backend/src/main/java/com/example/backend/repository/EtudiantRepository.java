package com.example.backend.repository;

import com.example.backend.dto.EtudiantMatiereDTO;
import com.example.backend.models.Etudiant;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Integer> {
    long count();

    Optional<Etudiant> findByUser(User user);

    Etudiant findByUser_Id(int userId);

    @Query("SELECT new com.example.backend.dto.EtudiantMatiereDTO(e.user.id,e.nom, e.prenom,e.mail, e.niveau, m.nomMat) FROM Etudiant e JOIN MatIscr s ON e.etud_id = s.etudiant.etud_id JOIN Matiere m ON s.matiere.idMat = m.idMat")
    List<EtudiantMatiereDTO> findEtudiantWithMatiere();

    @Query("SELECT new com.example.backend.dto.EtudiantMatiereDTO(e.user.id,e.nom, e.prenom,e.mail, e.niveau, m.nomMat) FROM Etudiant e JOIN MatIscr s ON e.etud_id = s.etudiant.etud_id JOIN Matiere m ON s.matiere.idMat = m.idMat WHERE e.user.id = :userId")

    List<EtudiantMatiereDTO> findEtudiantWithMatiereById(int userId);
}
