package com.example.backend.init;

import com.example.backend.models.Emploi;
import com.example.backend.repository.EmploiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;
import java.util.List;

@Component
public class EmploiInitializer {

    private final EmploiRepository emploiRepository;

    @Autowired
    public EmploiInitializer(EmploiRepository emploiRepository) {
        this.emploiRepository = emploiRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initDefaultEmplois() {
        createEmploi("5th year of high school - Science X", "Physics & Chemistry - 15:00-17:00", "Maths - 19:00-21:00", "SVT - 19:00-21:00" ,"Maths - 08:00-10:00" ,"Physics & Chemistry - 10:00-12:00");
        createEmploi("1st year of baccalaureate - Science X", "Physics & Chemistry - 08:00-10:00", "Maths - 19:00-21:00", "SVT - 11:00-13:00","Maths - 19:00-21:00", "Physics - 11:00-13:00");
        createEmploi("2nd year of baccalaureate - Science Math", "SVT - 19:00-21:00" ,"Maths - 08:00-10:00" ,"Physics & Chemistry - 10:00-12:00","Maths - 19:00-21:00", "Physics - 19:00-21:00");
        createEmploi("2nd year of baccalaureate - Physics Science", "Physics - 19:00-21:00", "Chemistry - 19:00-21:00","SVT - 19:00-21:00" ,"Maths - 08:00-10:00" ,"Physics & Chemistry - 10:00-12:00");
        createEmploi("2nd year of baccalaureate - Life and Earth Science", "Physics & Chemistry - 14:00-16:00", "SVT - 19:00-21:00" ,"Physics & Chemistry - 14:00-16:00","Maths - 19:00-21:00", "SVT - 19:00-21:00");
    }

    private void createEmploi(String niveau, String... matieres) {
        Emploi emploi = new Emploi();
        emploi.setNiveau(niveau);
        for (String matiere : matieres) {
            assignMatiere(emploi, matiere);
        }
        emploiRepository.save(emploi);
    }

    private void assignMatiere(Emploi emploi, String matiere) {
        if (emploi.getLundi() == null) {
            emploi.setLundi(matiere);
        } else if (emploi.getMardi() == null) {
            emploi.setMardi(matiere);
        } else if (emploi.getMercredi() == null) {
            emploi.setMercredi(matiere);
        } else if (emploi.getJeudi() == null) {
            emploi.setJeudi(matiere);
        } else if (emploi.getVendredi() == null) {
            emploi.setVendredi(matiere);
        } else if (emploi.getSamedi() == null) {
            emploi.setSamedi(matiere);
        } else if (emploi.getDimanche() == null) {
            emploi.setDimanche(matiere);
        }
    }
}
