package com.example.backend.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "mat_profs")
public class MatProf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @ManyToOne
    @JoinColumn(name = "prof_id", referencedColumnName = "prof_id")
    private Prof prof;

    @ManyToOne
    @JoinColumn(name = "mat_id", referencedColumnName = "idMat")
    private Matiere matiere;


}
