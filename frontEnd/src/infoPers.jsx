import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './infoPers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const InfoPers = () => {
    const [listeEtud, setListeEtud] = useState([]);
    const [username, setUsername] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('');
    const [userFirstname, setUserFirstname] = useState('');

    useEffect(() => {
        // Récupération des données de l'utilisateur depuis le localStorage
        const storedUsername = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');
        const storedUserRole = localStorage.getItem('userRole');
        const storedUserFirstname = localStorage.getItem('userFirstname');

        // Mise à jour des états avec les données récupérées
        setUsername(storedUsername);
        setUserRole(storedUserRole);
        setUserId(storedUserId);
        setUserFirstname(storedUserFirstname);

        // Vérification si userId est défini avant de charger les étudiants
        if (storedUserId) {
            fetchStudents(storedUserId);
        }
    }, []);

    const fetchStudents = (userId) => {
        axios.get(`http://localhost:8080/api/students/${userId}`)
            .then(response => {
                const groupedData = groupByStudent(response.data);
                setListeEtud(groupedData);
            })
            .catch(error => {
                console.error("There was an error fetching the students data!", error);
            });
    };

    const groupByStudent = (data) => {
        const grouped = {};
        data.forEach(item => {
            const key = `${item.nom}-${item.prenom}-${item.mail}-${item.niveau}`;
            if (!grouped[key]) {
                grouped[key] = { ...item, matieres: [] };
            }
            grouped[key].matieres.push(item.nomMat);
        });
        return Object.values(grouped);
    };

    return (
        <div>
            <h2>Personal information</h2>

            <div className="card-container">
                {listeEtud.map((etud, index) => (
                    <div className="student-card" key={index}>
                        <div className='sdv'>
                            <h1 className='h3cardst'>{etud.nom} {etud.prenom}</h1>
                            <p className='pemst'><strong>Email:</strong> {etud.mail}</p>
                            <p className='plevst'><strong>Level:</strong> {etud.niveau}</p>
                            <p className='psubst'><strong>Subjects:</strong> {etud.matieres.join(', ')}</p>
                        </div>
                        <div className="card-actions">
                            {/* Ajoutez ici des icônes ou des actions si nécessaire */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoPers;
