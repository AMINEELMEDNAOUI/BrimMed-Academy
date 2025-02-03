package com.example.backend.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(name = "emplois")
public class Emploi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idemp;
    private String niveau;
    @Lob
    private String lundi;
    @Lob
    private String mardi;
    @Lob
    private String mercredi;
    @Lob
    private String jeudi;
    @Lob
    private String vendredi;
    @Lob
    private String samedi;
    @Lob
    private String dimanche;


}
