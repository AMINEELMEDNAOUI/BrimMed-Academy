package com.example.backend.repository;

import com.example.backend.dto.EtudiantAbsenceDTO;
import com.example.backend.dto.EtudiantPaiementDTO;
import com.example.backend.dto.ProfAbsenceDTO;
import com.example.backend.dto.ProfPaiementDTO;
import com.example.backend.models.Absence;
import com.example.backend.models.Paiement;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement,Integer> {

    @Query("SELECT e.nom AS nom, e.prenom AS prenom,e.niveau AS niveau, a.octobre AS octobre, a.novembre AS novembre, a.decembre AS decembre, a.janvier AS janvier, a.fevrier AS fevrier, a.mars AS mars, a.avril AS avril, a.mai AS mai, a.juin AS juin " +
            "FROM Etudiant e JOIN e.user u JOIN Paiement a ON u.id = a.user.id")
    List<EtudiantPaiementDTO> findEtudiantPaiement();

    @Query("SELECT p.nom AS nom, p.prenom AS prenom ," +
            "a.octobre AS octobre, a.novembre AS novembre, a.decembre AS decembre, " +
            "a.janvier AS janvier, a.fevrier AS fevrier, a.mars AS mars, " +
            "a.avril AS avril, a.mai AS mai, a.juin AS juin " +
            "FROM Prof p JOIN p.user u JOIN Paiement a ON u.id = a.user.id")
    List<ProfPaiementDTO> findProfPaiement();

    @Query("SELECT e.nom AS nom, e.prenom AS prenom,e.niveau AS niveau, a.octobre AS octobre, a.novembre AS novembre, a.decembre AS decembre, a.janvier AS janvier, a.fevrier AS fevrier, a.mars AS mars, a.avril AS avril, a.mai AS mai, a.juin AS juin " +
            "FROM Etudiant e JOIN e.user u JOIN Paiement a ON u.id = a.user.id WHERE e.user.id = :userId")
    List<EtudiantPaiementDTO> findEtudPaiement(int userId);

    @Query("SELECT p.nom AS nom, p.prenom AS prenom ," +
            "a.octobre AS octobre, a.novembre AS novembre, a.decembre AS decembre, " +
            "a.janvier AS janvier, a.fevrier AS fevrier, a.mars AS mars, " +
            "a.avril AS avril, a.mai AS mai, a.juin AS juin " +
            "FROM Prof p JOIN p.user u JOIN Paiement a ON u.id = a.user.id WHERE p.user.id = :userId")
    List<ProfPaiementDTO> findPrPaiement(int userId);
    List<Paiement> findByUser(User user);


}
