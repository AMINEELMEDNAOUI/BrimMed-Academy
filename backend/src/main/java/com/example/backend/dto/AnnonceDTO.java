package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class AnnonceDTO {
    private int id;
    private String nom;
    private String prenom;
    private String contenu;
    private Date date;
    private String role;

    public AnnonceDTO(int id ,String nom, String prenom, String contenu, Date date, String role) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.contenu = contenu;
        this.date = date;
        this.role = role;
    }

    // Getters and setters
}
