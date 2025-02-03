package com.example.backend.controller;

import com.example.backend.dto.AnnonceDTO;
import com.example.backend.models.Annonce;
import com.example.backend.service.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/annonces")
public class AnnonceController {

    @Autowired
    private AnnonceService annonceService;

    @GetMapping("/all")
    public ResponseEntity<List<AnnonceDTO>> getAllAnnonces() {
        List<AnnonceDTO> annonces = annonceService.getAllAnnonces();
        return ResponseEntity.ok().body(annonces);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addAnnonce(@RequestBody Annonce annonce) {
        annonceService.addAnnonce(annonce);
        return ResponseEntity.status(HttpStatus.CREATED).body("Annonce ajoutée avec succès!");
    }

    // Endpoint pour supprimer une annonce par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAnnonce(@PathVariable int id) {
        boolean deleted = annonceService.deleteAnnonceById(id);
        if (deleted) {
            return ResponseEntity.ok().body("Annonce supprimée avec succès!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
