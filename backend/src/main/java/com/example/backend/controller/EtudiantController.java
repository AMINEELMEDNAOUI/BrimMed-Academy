package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.models.Absence;
import com.example.backend.models.Etudiant;
import com.example.backend.service.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/students")
public class EtudiantController {

    @Autowired
    private EtudiantService etudiantService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerStudent(@RequestBody EtudiantDTO etudiantDTO) {
        Etudiant savedEtudiant = etudiantService.saveEtudiant(etudiantDTO);
        if (savedEtudiant != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"status\": \"success\"}");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\": \"error\"}");
        }
    }

    @GetMapping("/absences")
    public ResponseEntity<List<EtudiantAbsenceDTO>> getEtudiantAbsences() {
        List<EtudiantAbsenceDTO> absences = etudiantService.getEtudiantAbsences();
        return ResponseEntity.ok(absences);
    }

    @GetMapping("/paiements")
    public ResponseEntity<List<EtudiantPaiementDTO>> getEtudiantPaiements() {
        List<EtudiantPaiementDTO> paiements = etudiantService.getEtudiantPaiements();
        return ResponseEntity.ok(paiements);
    }

    @PutMapping("/updateAbsence")
    public void updateAbsence(@RequestBody AbsenceUpdateDTO absenceUpdateDTO) {
        etudiantService.updateAbsence(absenceUpdateDTO);
    }

    @PutMapping("/updatePaiement")
    public void updatePaiement(@RequestBody PaiementUpdateDTO paiementUpdateDTO) {
        etudiantService.updatePaiement(paiementUpdateDTO);
    }

    @GetMapping("/all")
    public List<EtudiantMatiereDTO> getAllEtudiantsWithMatieres() {
        return etudiantService.getAllEtudiantsWithMatieres();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<EtudiantMatiereDTO>> findEtudiantWithMatiereById(@PathVariable int userId) {
        List<EtudiantMatiereDTO> etudiantMatiereDTOList = etudiantService.findEtudiantWithMatiereById(userId);
        if (etudiantMatiereDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(etudiantMatiereDTOList);
    }

    @GetMapping("/{userId}/paiements")
    public List<EtudiantPaiementDTO> getEtudiantPaiements(@PathVariable int userId) {
        return etudiantService.findEtudPaiement(userId);
    }

    @GetMapping("/{userId}/absences")
    public List<EtudiantAbsenceDTO> getEtudiantAbsences(@PathVariable int userId) {
        return etudiantService.findEtudAbsences(userId);
    }
}

