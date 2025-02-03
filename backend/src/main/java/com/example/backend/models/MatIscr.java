package com.example.backend.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "mat_iscr")
public class MatIscr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @ManyToOne
    @JoinColumn(name = "etud_id", referencedColumnName = "etud_id")
    private Etudiant etudiant;

    @ManyToOne
    @JoinColumn(name = "mat_id", referencedColumnName = "idMat")
    private Matiere matiere;


}
