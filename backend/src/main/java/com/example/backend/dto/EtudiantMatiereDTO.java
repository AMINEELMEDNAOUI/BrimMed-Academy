package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data


public class EtudiantMatiereDTO {
    private int userid;
    private String nom;
    private String prenom;
    private String mail;
    private String niveau;
    private String nomMat;

    public EtudiantMatiereDTO(int userid,String nom, String prenom,String mail, String niveau, String nomMat) {
        this.userid=userid;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.niveau = niveau;
        this.nomMat = nomMat;
    }

}

