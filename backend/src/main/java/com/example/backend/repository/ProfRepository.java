package com.example.backend.repository;

import com.example.backend.dto.EtudiantMatiereDTO;
import com.example.backend.dto.ProfMatiereDTO;
import com.example.backend.models.Prof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfRepository  extends JpaRepository<Prof, Integer> {
    long count();

    @Query("SELECT new com.example.backend.dto.ProfMatiereDTO(e.user.id, e.nom, e.prenom,e.mail, e.niveau,e.salaire, m.nomMat) FROM Prof e JOIN MatProf s ON e.prof_id = s.prof.prof_id JOIN Matiere m ON s.matiere.idMat = m.idMat")
    List<ProfMatiereDTO> findProfWithMatiere();

    @Query("SELECT new com.example.backend.dto.ProfMatiereDTO(e.user.id, e.nom, e.prenom,e.mail, e.niveau,e.salaire, m.nomMat) FROM Prof e JOIN MatProf s ON e.prof_id = s.prof.prof_id JOIN Matiere m ON s.matiere.idMat = m.idMat WHERE e.user.id = :userId")
    List<ProfMatiereDTO> findPrWithMatiere(int userId);
}

