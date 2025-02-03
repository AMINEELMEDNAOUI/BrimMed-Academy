package com.example.backend.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(name = "paiment")
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private boolean octobre;
    private boolean novembre;
    private boolean decembre;
    private boolean janvier;
    private boolean fevrier;
    private boolean mars;
    private boolean avril;
    private boolean mai;
    private boolean juin;


}
