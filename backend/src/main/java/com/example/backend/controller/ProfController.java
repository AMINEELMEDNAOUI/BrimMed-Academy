package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.models.Etudiant;
import com.example.backend.models.Prof;
import com.example.backend.service.ProfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/professors")
public class ProfController {

    @Autowired
    private ProfService profService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerProfessor(@RequestBody ProfDTO profDTO) {
        Prof savedProf = profService.saveProf(profDTO);
        if (savedProf != null) {

            return ResponseEntity.status(HttpStatus.CREATED).body("{\"status\": \"success\"}");
        } else {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\": \"error\"}");
        }
    }

    @GetMapping("/absences")
    public ResponseEntity<List<ProfAbsenceDTO>> getProfAbsences() {
        List<ProfAbsenceDTO> absences = profService.getProfAbsences();
        return ResponseEntity.ok(absences);
    }

    @GetMapping("/paiements")
    public ResponseEntity<List<ProfPaiementDTO>> getProfPaiements() {
        List<ProfPaiementDTO> paiements = profService.getProfPaiements();
        return ResponseEntity.ok(paiements);
    }

    @PutMapping("/updateAbsence")
    public void updateAbsence(@RequestBody AbsenceUpdateDTO absenceUpdateDTO) {
        profService.updateAbsence(absenceUpdateDTO);
    }

    @PutMapping("/updatePaiement")
    public void updatePaiement(@RequestBody PaiementUpdateDTO paiementUpdateDTO) {
        profService.updatePaiement(paiementUpdateDTO);
    }

    @GetMapping("/all")
    public List<ProfMatiereDTO> getAllProfsWithMatieres() {
        return profService.getAllProfsWithMatieres();
    }

    @GetMapping("/matiere/{userId}")
    public List<ProfMatiereDTO> getProfessorsWithMatiere(@PathVariable int userId) {
        return profService.findProfessorsWithMatiere(userId);
    }
    @GetMapping("/paiement/{userId}")
    public List<ProfPaiementDTO> getProfessorsWithPaiement(@PathVariable int userId) {
        return profService.findProfessorsWithPaiement(userId);
    }

    @GetMapping("/absences/{userId}")
    public List<ProfAbsenceDTO> getProfessorsWithAbsences(@PathVariable int userId) {
        return profService.findProfessorsWithAbsences(userId);
    }



}

