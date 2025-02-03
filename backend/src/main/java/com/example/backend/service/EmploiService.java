package com.example.backend.service;

import com.example.backend.models.Emploi;
import com.example.backend.repository.EmploiRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmploiService {

    private final EmploiRepository emploiRepository;

    @Autowired
    public EmploiService(EmploiRepository emploiRepository) {
        this.emploiRepository = emploiRepository;
    }

    public Emploi getEmploiByNiveau(String niveau) {
        return emploiRepository.findByNiveau(niveau);
    }

    public List<Emploi> findEmploisByUserId(int userId) {
        return emploiRepository.findEmploisByUserId(userId);
    }

    public List<Emploi> findEmploiByUserId(int userId) {
        return emploiRepository.findEmploiByUserId(userId);
    }

    @Transactional
    public Emploi updateEmploi(int idemp, String jour, String subject) {
        Emploi emploi = emploiRepository.findById(idemp)
                .orElseThrow(() -> new RuntimeException("Emploi not found"));

        switch (jour.toLowerCase()) {
            case "monday":
                if (emploi.getLundi() == null) {
                    emploi.setLundi(subject);  // Insert
                } else {
                    emploi.setLundi(subject);  // Update
                }
                break;
            case "tuesday":
                if (emploi.getMardi() == null) {
                    emploi.setMardi(subject);  // Insert
                } else {
                    emploi.setMardi(subject);  // Update
                }
                break;
            case "wednesday":
                if (emploi.getMercredi() == null) {
                    emploi.setMercredi(subject);  // Insert
                } else {
                    emploi.setMercredi(subject);  // Update
                }
                break;
            case "thursday":
                if (emploi.getJeudi() == null) {
                    emploi.setJeudi(subject);  // Insert
                } else {
                    emploi.setJeudi(subject);  // Update
                }
                break;
            case "friday":
                if (emploi.getVendredi() == null) {
                    emploi.setVendredi(subject);  // Insert
                } else {
                    emploi.setVendredi(subject);  // Update
                }
                break;
            case "saturday":
                if (emploi.getSamedi() == null) {
                    emploi.setSamedi(subject);  // Insert
                } else {
                    emploi.setSamedi(subject);  // Update
                }
                break;
            case "sunday":
                if (emploi.getDimanche() == null) {
                    emploi.setDimanche(subject);  // Insert
                } else {
                    emploi.setDimanche(subject);  // Update
                }
                break;
            default:
                throw new RuntimeException("Invalid day");
        }

        return emploiRepository.save(emploi);
    }


}
