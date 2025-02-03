package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.models.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MatiereRepository matiereRepository;

    @Autowired
    private MatIscrRepository matIscrRepository;

    @Autowired
    private AbsenceRepository absenceRepository;

    @Autowired
    private PaiementRepository paiementRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @EventListener(ApplicationReadyEvent.class)
    public void initDefaultMatieres() {
        List<Matiere> defaultMatieres = Arrays.asList(
                new Matiere("Maths", 150, 1),
                new Matiere("Physics & Chemistry", 150, 2),
                new Matiere("SVT", 150, 3)
        );
        defaultMatieres.forEach(matiere -> matiereRepository.save(matiere));
    }

    public Etudiant saveEtudiant(EtudiantDTO etudiantDTO) {
        // Encode the password
        String encodedPassword = passwordEncoder.encode(etudiantDTO.getMdp());

        // Create a new User entity with role 'student' and encoded password
        User user = new User();
        user.setNom(etudiantDTO.getNom());
        user.setPrenom(etudiantDTO.getPrenom());
        user.setMail(etudiantDTO.getMail());
        user.setMdp(encodedPassword); // Assign encoded password
        user.setRole("STUDENT");

        // Save the User entity
        User savedUser = userRepository.save(user);
        System.out.println("User saved with ID: " + savedUser.getId());

        // Initialize Absence and Paiement entries for the new student
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
        absenceRepository.save(absence);

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
        paiementRepository.save(paiement);

        // Create and save the Etudiant entity
        Etudiant etudiant = new Etudiant();
        etudiant.setNom(etudiantDTO.getNom());
        etudiant.setPrenom(etudiantDTO.getPrenom());
        etudiant.setMail(etudiantDTO.getMail());
        etudiant.setMdp(encodedPassword); // Assign encoded password
        etudiant.setUser(savedUser);
        etudiant.setNiveau(etudiantDTO.getNiveau());

        Etudiant savedEtudiant = etudiantRepository.save(etudiant);
        System.out.println("Etudiant saved with ID: " + savedEtudiant.getEtud_id());

        // Save MatIscr entries for the selected matieres
        for (Integer matiereId : etudiantDTO.getMatiereIds()) {
            Matiere matiere = matiereRepository.findById(matiereId).orElseThrow(() -> new RuntimeException("Matiere not found"));
            MatIscr matIscr = new MatIscr();
            matIscr.setEtudiant(savedEtudiant);
            matIscr.setMatiere(matiere);
            matIscrRepository.save(matIscr);
        }

        return savedEtudiant;
    }

    public List<EtudiantAbsenceDTO> getEtudiantAbsences() {
        return absenceRepository.findEtudiantAbsences();
    }

    public List<EtudiantPaiementDTO> getEtudiantPaiements() {
        return paiementRepository.findEtudiantPaiement();
    }


    public void updateAbsence(AbsenceUpdateDTO absenceUpdateDTO) {
        // Find the user based on the provided student information
        Optional<User> optionalUser = userRepository.findByNomAndPrenom(
                absenceUpdateDTO.getNom(),
                absenceUpdateDTO.getPrenom()
        );

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Find the Absence records for the user
            List<Absence> absences = absenceRepository.findByUser(user);

            if (!absences.isEmpty()) {
                for (Absence absence : absences) {
                    absence.setOctobre(absenceUpdateDTO.getOctobre());
                    absence.setNovembre(absenceUpdateDTO.getNovembre());
                    absence.setDecembre(absenceUpdateDTO.getDecembre());
                    absence.setJanvier(absenceUpdateDTO.getJanvier());
                    absence.setFevrier(absenceUpdateDTO.getFevrier());
                    absence.setMars(absenceUpdateDTO.getMars());
                    absence.setAvril(absenceUpdateDTO.getAvril());
                    absence.setMai(absenceUpdateDTO.getMai());
                    absence.setJuin(absenceUpdateDTO.getJuin());

                    // Save the updated absence record
                    absenceRepository.save(absence);
                }
            } else {
                throw new RuntimeException("Absence record not found for user");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public List<EtudiantMatiereDTO> findEtudiantWithMatiereById(int userId) {
        return etudiantRepository.findEtudiantWithMatiereById(userId);
    }

    public List<EtudiantPaiementDTO> findEtudPaiement(int userId) {
        return paiementRepository.findEtudPaiement(userId);
    }

    public List<EtudiantAbsenceDTO> findEtudAbsences(int userId) {
        return absenceRepository.findEtudAbsences(userId);
    }

    public void updatePaiement(PaiementUpdateDTO paiementUpdateDTO) {
        // Find the user based on the provided student information
        Optional<User> optionalUser = userRepository.findByNomAndPrenom(
                paiementUpdateDTO.getNom(),
                paiementUpdateDTO.getPrenom()
        );

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();


            List<Paiement> paiements = paiementRepository.findByUser(user);

            if (!paiements.isEmpty()) {
                for (Paiement paiement : paiements) {
                    paiement.setOctobre(paiementUpdateDTO.isOctobre());
                    paiement.setNovembre(paiementUpdateDTO.isNovembre());
                    paiement.setDecembre(paiementUpdateDTO.isDecembre());
                    paiement.setJanvier(paiementUpdateDTO.isJanvier());
                    paiement.setFevrier(paiementUpdateDTO.isFevrier());
                    paiement.setMars(paiementUpdateDTO.isMars());
                    paiement.setAvril(paiementUpdateDTO.isAvril());
                    paiement.setMai(paiementUpdateDTO.isMai());
                    paiement.setJuin(paiementUpdateDTO.isJuin());

                    // Save the updated paiement record
                    paiementRepository.save(paiement);
                }
            } else {
                throw new RuntimeException("Paiement record not found for user");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public List<EtudiantMatiereDTO> getAllEtudiantsWithMatieres() {
        return etudiantRepository.findEtudiantWithMatiere();
    }
}
