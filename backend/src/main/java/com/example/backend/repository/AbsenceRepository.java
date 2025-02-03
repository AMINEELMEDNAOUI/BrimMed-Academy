package com.example.backend.repository;

import com.example.backend.dto.EtudiantAbsenceDTO;
import com.example.backend.dto.ProfAbsenceDTO;
import com.example.backend.models.Absence;

import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {


    @Query("SELECT e.nom AS nom, e.prenom AS prenom,e.niveau AS niveau, a.octobre AS octobre, a.novembre AS novembre, a.decembre AS decembre, a.janvier AS janvier, a.fevrier AS fevrier, a.mars AS mars, a.avril AS avril, a.mai AS mai, a.juin AS juin " +
            "FROM Etudiant e JOIN e.user u JOIN Absence a ON u.id = a.user.id")
    List<EtudiantAbsenceDTO> findEtudiantAbsences();

    @Query("SELECT p.nom AS nom, p.prenom AS prenom ," +
            "a.octobre AS octobre, a.novembre AS novembre, a.decembre AS decembre, " +
            "a.janvier AS janvier, a.fevrier AS fevrier, a.mars AS mars, " +
            "a.avril AS avril, a.mai AS mai, a.juin AS juin " +
            "FROM Prof p JOIN p.user u JOIN Absence a ON u.id = a.user.id")
    List<ProfAbsenceDTO> findProfAbsences();
    List<Absence> findByUser(User user);

    @Query("SELECT e.nom AS nom, e.prenom AS prenom,e.niveau AS niveau, a.octobre AS octobre, a.novembre AS novembre, a.decembre AS decembre, a.janvier AS janvier, a.fevrier AS fevrier, a.mars AS mars, a.avril AS avril, a.mai AS mai, a.juin AS juin " +
            "FROM Etudiant e JOIN e.user u JOIN Absence a ON u.id = a.user.id WHERE e.user.id = :userId")
    List<EtudiantAbsenceDTO> findEtudAbsences(int userId);

    @Query("SELECT p.nom AS nom, p.prenom AS prenom ,p.niveau AS niveau," +
            "a.octobre AS octobre, a.novembre AS novembre, a.decembre AS decembre, " +
            "a.janvier AS janvier, a.fevrier AS fevrier, a.mars AS mars, " +
            "a.avril AS avril, a.mai AS mai, a.juin AS juin " +
            "FROM Prof p JOIN p.user u JOIN Absence a ON u.id = a.user.id WHERE p.user.id = :userId")
    List<ProfAbsenceDTO> findPrAbsences(int userId);
}
