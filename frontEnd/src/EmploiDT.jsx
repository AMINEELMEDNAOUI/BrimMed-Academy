import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmploiDT.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faPen, faCheck, faTimes, faAngleDown, faUserCog, faChalkboardTeacher, faUserGraduate, faList, faClock, faBullhorn, faTh, faCreditCard, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const EmploiDT = () => {
    const [emploiDuTemps, setEmploiDuTemps] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');

        if (storedUserId) {
            fetchEmploiDuTemps(storedUserId);
        }
    }, []);

    const fetchEmploiDuTemps = (userId) => {
        axios.get(`http://localhost:8080/api/emplois/user/${userId}`)
            .then(response => {
                // Assurez-vous que response.data est un tableau et récupérez le premier élément si nécessaire
                if (response.data && response.data.length > 0) {
                    setEmploiDuTemps(response.data[0]);
                } else {
                    console.error("No emploi du temps data found for user ID:", userId);
                }
            })
            .catch(error => {
                console.error("Error fetching emploi du temps:", error);
            });
    };

    const joursSemaine = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div>
            <h2>Schedule</h2>
            <div className="emploi-table" style={{marginTop:'100px'}}>
                <table>
                    <thead>
                        <tr>
                            <th>Level</th>
                            {joursSemaine.map(jour => (
                                <th key={jour}>{jour}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {emploiDuTemps ? (
                            <tr>
                                <td className='level'>{emploiDuTemps.niveau}</td>
                                <td>{emploiDuTemps.lundi}</td>
                                <td>{emploiDuTemps.mardi}</td>
                                <td>{emploiDuTemps.mercredi}</td>
                                <td>{emploiDuTemps.jeudi}</td>
                                <td>{emploiDuTemps.vendredi}</td>
                                <td>{emploiDuTemps.samedi}</td>
                                <td>{emploiDuTemps.dimanche}</td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan={joursSemaine.length + 1}>Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmploiDT;
