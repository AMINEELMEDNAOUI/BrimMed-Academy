package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.models.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import java.util.List;
import java.util.Optional;

@Service
public class ProfService {

    @Autowired
    private ProfRepository profRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MatiereRepository matiereRepository;

    @Autowired
    private MatProfRepository matProfRepository;

    @Autowired
    private AbsenceRepository absenceRepository;

    @Autowired
    private PaiementRepository paiementRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @EventListener(ApplicationReadyEvent.class)
    public void initDefaultProfs() {
        // Vous pouvez ajouter des professeurs par défaut ici si nécessaire
    }

    public Prof saveProf(ProfDTO profDTO) {
        // Encode the password
        String encodedPassword = passwordEncoder.encode(profDTO.getMdp());

        // Create a new User entity with role 'Teacher' and encoded password
        User user = new User();
        user.setNom(profDTO.getNom());
        user.setPrenom(profDTO.getPrenom());
        user.setMail(profDTO.getMail());
        user.setMdp(encodedPassword); // Assign encoded password
        user.setRole("TEACHER");

        // Save the User entity
        User savedUser = userRepository.save(user);
        System.out.println("User saved with ID: " + savedUser.getId());

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

        // Create and save the Prof entity
        Prof prof = new Prof();
        prof.setNom(profDTO.getNom());
        prof.setPrenom(profDTO.getPrenom());
        prof.setMail(profDTO.getMail());
        prof.setMdp(encodedPassword); // Assign encoded password
        prof.setUser(savedUser);
        prof.setSalaire(profDTO.getSalaire());
        prof.setNiveau(profDTO.getNiveau());

        Prof savedProf = profRepository.save(prof);
        System.out.println("Prof saved with ID: " + savedProf.getProf_id());

        // Save MatProf entries for the associated matieres
        for (Integer matiereId : profDTO.getMatiereIds()) {
            Matiere matiere = matiereRepository.findById(matiereId).orElseThrow(() -> new RuntimeException("Matiere not found"));
            MatProf matProf = new MatProf();
            matProf.setProf(savedProf);
            matProf.setMatiere(matiere);
            matProfRepository.save(matProf);
        }

        return savedProf;
    }
    public List<ProfAbsenceDTO> getProfAbsences() {
        return absenceRepository.findProfAbsences();
    }

    public List<ProfPaiementDTO> getProfPaiements() {
        return paiementRepository.findProfPaiement();
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

    public List<ProfMatiereDTO> getAllProfsWithMatieres() {
        return profRepository.findProfWithMatiere();
    }

    public List<ProfMatiereDTO> findProfessorsWithMatiere(int userId) {
        return profRepository.findPrWithMatiere(userId);
    }

    public List<ProfPaiementDTO> findProfessorsWithPaiement(int userId) {
        return paiementRepository.findPrPaiement(userId);
    }
    public List<ProfAbsenceDTO> findProfessorsWithAbsences(int userId) {
        return absenceRepository.findPrAbsences(userId);
    }
}
