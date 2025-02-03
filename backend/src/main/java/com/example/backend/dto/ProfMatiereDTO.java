package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data


public class ProfMatiereDTO {
    private int userid;
    private String nom;
    private String prenom;
    private String mail;
    private String niveau;
    private double salaire;
    private String nomMat;

    public ProfMatiereDTO(int userid ,String nom, String prenom, String mail,String niveau, double salaire, String nomMat) {
        this.userid=userid;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.niveau = niveau;
        this.salaire=salaire;
        this.nomMat = nomMat;
    }

}

