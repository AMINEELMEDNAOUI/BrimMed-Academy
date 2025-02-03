package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profs")
public class Prof {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prof_id;

    private String nom;
    private String prenom;
    private String mail;
    private String mdp;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private double salaire;
    private String niveau;

    @OneToMany(mappedBy = "prof", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatProf> matProfList;

}
