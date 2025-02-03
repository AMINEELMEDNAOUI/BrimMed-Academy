package com.example.backend.service;

import com.example.backend.dto.AnnonceDTO;
import com.example.backend.models.Annonce;
import com.example.backend.repository.AnnonceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AnnonceService {

    @Autowired
    private AnnonceRepository annonceRepository;

    public List<AnnonceDTO> getAllAnnonces() {
        return annonceRepository.findAllAnnonces();
    }

    public void addAnnonce(Annonce annonce) {
        annonce.setDate(new Date());
        annonceRepository.save(annonce);
    }

    public boolean deleteAnnonceById(int id) {
        Optional<Annonce> existingAnnonce = annonceRepository.findById(id);
        if (existingAnnonce.isPresent()) {
            annonceRepository.delete(existingAnnonce.get());
            return true;
        }
        return false;
    }
}
