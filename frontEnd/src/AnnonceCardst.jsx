import React from 'react';
import './AnnonceCardst.css'; // Style pour la carte


const AnnonceCardst = ({ annonce, onDelete }) => {
    return (
        <div className="annonce-card">
            <h2 className='h2card'>{annonce.role}</h2>
            <p className='pcard'>User: {annonce.nom} {annonce.prenom}</p>
            <p className='pcontent'>Content :</p>
            <p className='pcont'>{annonce.contenu}</p>
            <p className='pda'>{new Date(annonce.date).toLocaleDateString()}</p>
        </div>
    );
};

export default AnnonceCardst;

