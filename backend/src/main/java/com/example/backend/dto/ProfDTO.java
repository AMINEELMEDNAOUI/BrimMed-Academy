package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfDTO {
    private String nom;
    private String prenom;
    private String mail;
    private String mdp;
    private String niveau;
    private double salaire;
    private List<Integer> matiereIds;


}
