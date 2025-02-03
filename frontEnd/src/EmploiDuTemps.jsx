import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmploiDuTemps.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faPen,faCheck,faTimes, faAngleDown, faUserCog, faChalkboardTeacher, faUserGraduate,  faList,faClock, faBullhorn, faTh, faCreditCard, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const EmploiDuTemps = () => {
    const [niveau, setNiveau] = useState('');
    const [emploiDuTemps, setEmploiDuTemps] = useState(null);
    const [showModalChange, setShowModalChange] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedDay, setSelectedDay] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {
        if (niveau) {
            fetchEmploiDuTemps();
        }
    }, [niveau]);

    const handleChangeNiveau = (e) => {
        setNiveau(e.target.value);
    };

    const fetchEmploiDuTemps = () => {
        axios.get(`http://localhost:8080/api/emplois/${niveau}`)
            .then(response => {
                setEmploiDuTemps(response.data);
            })
            .catch(error => {
                console.error("Error fetching emploi du temps:", error);
            });
    };

    const handleSave = () => {
        axios.put(`http://localhost:8080/api/emplois/${selectedId}/${selectedDay.toLowerCase()}`, subject, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                fetchEmploiDuTemps();
                handleCloseModal();
            })
            .catch(error => {
                console.error("Error updating emploi du temps:", error);
            });
    };


    const handleCloseModal = () => {
        setShowModalChange(false);
        setSubject('');
    };
    const joursSemaine = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    const handleChange = (idemp) => (e) => {
        e.preventDefault();
        setShowModalChange(true);
        setSelectedId(idemp);
       
    };

    return (
        <div>
            <h2>Schedule</h2>
           

            <select value={niveau} onChange={handleChangeNiveau} className='levelselect'>
                <option value='' disabled hidden>Choose the level</option>
                <option value='5th year of high school - Science X'>5th year of high school - Science X</option>
                <option value='1st year of baccalaureate - Science X'>1st year of baccalaureate - Science X</option>
                <option value='2nd year of baccalaureate - Science Math'>2nd year of baccalaureate - Science Math</option>
                <option value='2nd year of baccalaureate - Physics Science'>2nd year of baccalaureate - Physics Science</option>
                <option value='2nd year of baccalaureate - Life and Earth Science'>2nd year of baccalaureate - Life and Earth Science</option>
            </select>

            {emploiDuTemps && (
                <div className="emploi-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Level</th>
                                {joursSemaine.map(jour => (
                                    <th key={jour}>{jour}</th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='emptr'>
                                <td className='level'>{emploiDuTemps.niveau}</td>
                                <td>{emploiDuTemps.lundi}</td>
                                <td>{emploiDuTemps.mardi}</td>
                                <td>{emploiDuTemps.mercredi}</td>
                                <td>{emploiDuTemps.jeudi}</td>
                                <td>{emploiDuTemps.vendredi}</td>
                                <td>{emploiDuTemps.samedi}</td>
                                <td>{emploiDuTemps.dimanche}</td>
                                <td> <FontAwesomeIcon icon={faPen} onClick={handleChange(emploiDuTemps.idemp)} /> </td>
                            </tr>
                        </tbody>
                    </table>
                   
                </div>
            )}

{showModalChange && (
    <div className='modalemploi'>
        <h3 className='h3emp'>change the schedule</h3>
                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className='day-select'>
                <option value='' disabled hidden>Choose the day</option>
                {joursSemaine.map((jour, index) => (
                    <option key={index} value={jour}>{jour}</option>
                ))}
            </select>
            <input className='inputext'
                            type="text" 
                            value={subject} 
                            onChange={(e) => setSubject(e.target.value)} 
                            placeholder="Enter subject" 
                        />
                        <div className='buttemp'>
                        <button className='buttonvhor' onClick={handleSave}>Save <FontAwesomeIcon icon={faCheck} /></button>
                        <button className='buttonahor' onClick={handleCloseModal}>Cancel <FontAwesomeIcon icon={faTimes} /></button>
            </div></div>
            )}
        </div>
    );
};

export default EmploiDuTemps;
