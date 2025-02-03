package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.repository.EtudiantRepository;
import com.example.backend.repository.ProfRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private ProfRepository profRepository;

    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStatistics() {
        long numberOfStudents = etudiantRepository.count();
        long numberOfProfs = profRepository.count();

        // Format the response as needed
        return ResponseEntity.ok(new Object[]{ numberOfStudents, numberOfProfs });
    }
}
