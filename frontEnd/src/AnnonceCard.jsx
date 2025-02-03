import React from 'react';
import './AnnonceCard.css'; // Style pour la carte


const AnnonceCard = ({ annonce, onDelete }) => {
    return (
        <div className="annonce-card">
            <button className="delete-button" onClick={() => onDelete(annonce.id)}>X</button>
            <h2 className='h2card'>{annonce.role}</h2>
            <p className='pcard'>User: {annonce.nom} {annonce.prenom}</p>
            <p className='pcontent'>Content :</p>
            <p className='pcont'>{annonce.contenu}</p>
            <p className='pda'>{new Date(annonce.date).toLocaleDateString()}</p>
        </div>
    );
};

export default AnnonceCard;

