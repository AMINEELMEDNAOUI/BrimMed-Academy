package com.example.backend.controller;

import com.example.backend.models.Emploi;
import com.example.backend.service.EmploiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/emplois")
public class EmploiController {

    private final EmploiService emploiService;

    @Autowired
    public EmploiController(EmploiService emploiService) {
        this.emploiService = emploiService;
    }

    @GetMapping("/{niveau}")
    public ResponseEntity<Emploi> getEmploiByNiveau(@PathVariable String niveau) {
        Emploi emploi = emploiService.getEmploiByNiveau(niveau);
        if (emploi != null) {
            return ResponseEntity.ok(emploi);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{idemp}/{jour}")
    public ResponseEntity<Emploi> updateEmploi(@PathVariable int idemp, @PathVariable String jour, @RequestBody String subject) {
        // Remove surrounding quotes from subject if they exist
        if (subject != null && subject.startsWith("\"") && subject.endsWith("\"")) {
            subject = subject.substring(1, subject.length() - 1);
        }

        Emploi updatedEmploi = emploiService.updateEmploi(idemp, jour, subject);
        return ResponseEntity.ok(updatedEmploi);
    }

    @GetMapping("/user/{userId}")
    public List<Emploi> getEmploisByUserId(@PathVariable int userId) {
        return emploiService.findEmploisByUserId(userId);
    }

    @GetMapping("/userP/{userId}")
    public List<Emploi> getEmploiByUserId(@PathVariable int userId) {
        return emploiService.findEmploiByUserId(userId);
    }


}
