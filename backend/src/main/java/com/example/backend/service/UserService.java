package com.example.backend.service;

import com.example.backend.models.User;
import com.example.backend.models.Absence;
import com.example.backend.models.Paiement;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.AbsenceRepository;
import com.example.backend.repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AbsenceRepository absenceRepository;

    @Autowired
    private PaiementRepository paiementRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User saveUser(User user) {
        // Encode le mot de passe avant de le sauvegarder
        String encodedPassword = passwordEncoder.encode(user.getMdp());
        user.setMdp(encodedPassword);

        // Save the User entity
        User savedUser = userRepository.save(user);

        // Initialize Absence and Paiement entries
        Absence absence = new Absence();
        absence.setUser(savedUser);
        absence.setOctobre(0);
        absence.setNovembre(0);
        absence.setDecembre(0);
        absence.setJanvier(0);
        absence.setFevrier(0);
        absence.setMars(0);
        absence.setAvril(0);
        absence.setMai(0);
        absence.setJuin(0);
        Absence savedAbsence = absenceRepository.save(absence);
        System.out.println("Absence saved with ID: " + savedAbsence.getId());

        Paiement paiement = new Paiement();
        paiement.setUser(savedUser);
        paiement.setOctobre(false);
        paiement.setNovembre(false);
        paiement.setDecembre(false);
        paiement.setJanvier(false);
        paiement.setFevrier(false);
        paiement.setMars(false);
        paiement.setAvril(false);
        paiement.setMai(false);
        paiement.setJuin(false);
        Paiement savedPaiement = paiementRepository.save(paiement);

        // Log pour vérifier si le paiement est sauvegardé
        System.out.println("Paiement saved with ID: " + savedPaiement.getId());

        return savedUser;
    }
}
