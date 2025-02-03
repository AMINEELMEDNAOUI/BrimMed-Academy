package com.example.backend.dto;

public class PaiementUpdateDTO {

    private String nom;
    private String prenom;
    private boolean octobre;
    private boolean novembre;
    private boolean decembre;
    private boolean janvier;
    private boolean fevrier;
    private boolean mars;
    private boolean avril;
    private boolean mai;
    private boolean juin;

    // Getters and setters

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public boolean isOctobre() {
        return octobre;
    }

    public void setOctobre(boolean octobre) {
        this.octobre = octobre;
    }

    public boolean isNovembre() {
        return novembre;
    }

    public void setNovembre(boolean novembre) {
        this.novembre = novembre;
    }

    public boolean isDecembre() {
        return decembre;
    }

    public void setDecembre(boolean decembre) {
        this.decembre = decembre;
    }

    public boolean isJanvier() {
        return janvier;
    }

    public void setJanvier(boolean janvier) {
        this.janvier = janvier;
    }

    public boolean isFevrier() {
        return fevrier;
    }

    public void setFevrier(boolean fevrier) {
        this.fevrier = fevrier;
    }

    public boolean isMars() {
        return mars;
    }

    public void setMars(boolean mars) {
        this.mars = mars;
    }

    public boolean isAvril() {
        return avril;
    }

    public void setAvril(boolean avril) {
        this.avril = avril;
    }

    public boolean isMai() {
        return mai;
    }

    public void setMai(boolean mai) {
        this.mai = mai;
    }

    public boolean isJuin() {
        return juin;
    }

    public void setJuin(boolean juin) {
        this.juin = juin;
    }
}
