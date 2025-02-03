package com.example.backend.repository;

import com.example.backend.dto.AnnonceDTO;
import com.example.backend.models.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Integer> {

    @Query("SELECT new com.example.backend.dto.AnnonceDTO(a.id,a.nom, a.prenom, a.contenu, a.date, u.role) " +
            "FROM Annonce a JOIN User u ON u.id = a.user.id")
    List<AnnonceDTO> findAllAnnonces();
}
