import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AbsenceProfs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck , faPen } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const Absenceet = () => {
    const initialAbsenceState = {
        nom: '',
        prenom: '',
        octobre: 0,
        novembre: 0,
        decembre: 0,
        janvier: 0,
        fevrier: 0,
        mars: 0,
        avril: 0,
        mai: 0,
        juin: 0
    };

    const [absences, setAbsences] = useState([]);
    const [showModalAbsence, setShowModalAbsence] = useState(false);
    const [updatedAbsence, setUpdatedAbsence] = useState(initialAbsenceState);


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

        
        if (storedUserId) {
            fetchAbsences(storedUserId);
        }
    }, []);
    useEffect(() => {
        fetchAbsences();
    }, []);

    const fetchAbsences = (userId) => {
        axios.get(`http://localhost:8080/api/students/${userId}/absences`)
            .then(response => {
                setAbsences(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the absences data!", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAbsence(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancel = () => {
        setShowModalAbsence(false);
        setUpdatedAbsence(initialAbsenceState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/api/students/updateAbsence', updatedAbsence)
            .then(response => {
                console.log("Absence updated successfully:", response.data);
                fetchAbsences();
                setShowModalAbsence(false);
                setUpdatedAbsence(initialAbsenceState); 
            })
            .catch(error => {
                console.error("Error updating absence:", error);
            });
    };

    const handleAbsence = (e) => {
        e.preventDefault();
        setShowModalAbsence(true);
    };

    return (
        <div>
            <h2>Absence</h2>
            
            {showModalAbsence &&
                <div className='absence'>
                    <h3 className='absh3'>Update Absence</h3>
                    <form className="absence-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="nom"
                                value={updatedAbsence.nom}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="prenom"
                                value={updatedAbsence.prenom}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>October:</label>
                            <input
                                type="number"
                                name="octobre"
                                value={updatedAbsence.octobre}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>November:</label>
                            <input
                                type="number"
                                name="novembre"
                                value={updatedAbsence.novembre}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>December:</label>
                            <input
                                type="number"
                                name="decembre"
                                value={updatedAbsence.decembre}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>January:</label>
                            <input
                                type="number"
                                name="janvier"
                                value={updatedAbsence.janvier}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>February:</label>
                            <input
                                type="number"
                                name="fevrier"
                                value={updatedAbsence.fevrier}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>March:</label>
                            <input
                                type="number"
                                name="mars"
                                value={updatedAbsence.mars}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>April:</label>
                            <input
                                type="number"
                                name="avril"
                                value={updatedAbsence.avril}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>May:</label>
                            <input
                                type="number"
                                name="mai"
                                value={updatedAbsence.mai}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>June:</label>
                            <input
                                type="number"
                                name="juin"
                                value={updatedAbsence.juin}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className='absbutt' >
                            <button className='buttonvhor' onClick={handleSubmit}>Save <FontAwesomeIcon icon={faCheck} /></button>
                            <button className='buttonahor' onClick={handleCancel}>Cancel <FontAwesomeIcon icon={faTimes} /></button>
                        </div>
                    </form>
                </div>
            }
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Level</th>
                            <th>October</th>
                            <th>November</th>
                            <th>December</th>
                            <th>January</th>
                            <th>February</th>
                            <th>March</th>
                            <th>April</th>
                            <th>May</th>
                            <th>June</th>
                        </tr>
                    </thead>
                    <tbody>
                        {absences.map((absence, index) => (
                            <tr key={index}>
                                <td>{absence.nom}</td>
                                <td>{absence.prenom}</td>
                                <td>{absence.niveau}</td>
                                <td>{absence.octobre}</td>
                                <td>{absence.novembre}</td>
                                <td>{absence.decembre}</td>
                                <td>{absence.janvier}</td>
                                <td>{absence.fevrier}</td>
                                <td>{absence.mars}</td>
                                <td>{absence.avril}</td>
                                <td>{absence.mai}</td>
                                <td>{absence.juin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Absenceet;
