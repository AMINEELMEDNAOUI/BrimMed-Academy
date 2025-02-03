import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTimes, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './PaiementProfs.css';

const Paiementet = () => {
    const initialPaiementState = {
        nom: '',
        prenom: '',
        octobre: false,
        novembre: false,
        decembre: false,
        janvier: false,
        fevrier: false,
        mars: false,
        avril: false,
        mai: false,
        juin: false
    };

    const [paiements, setPaiements] = useState([]);
    const [showModalPaiement, setShowModalPaiement] = useState(false);
    const [updatedPaiement, setUpdatedPaiement] = useState(initialPaiementState);
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
            fetchPaiements(storedUserId);
        }
    }, []);

    useEffect(() => {
        fetchPaiements();
    }, []);

    const fetchPaiements = (userId) => {
        axios.get(`http://localhost:8080/api/students/${userId}/paiements`)
            .then(response => {
                setPaiements(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the paiements data!", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setUpdatedPaiement(prevState => ({
            ...prevState,
            [name]: type === 'select-one' ? (value === 'true') : value
        }));
    };

    const handleCancel = () => {
        setShowModalPaiement(false);
        setUpdatedPaiement(initialPaiementState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/api/professors/updatePaiement', updatedPaiement)
            .then(response => {
                console.log("Paiement updated successfully:", response.data);
                fetchPaiements();
                setShowModalPaiement(false);
                setUpdatedPaiement(initialPaiementState);
            })
            .catch(error => {
                console.error("Error updating paiement:", error);
            });
    };

    const handlePaiement = (e) => {
        e.preventDefault();
        setShowModalPaiement(true);
    };

    const iconStyle = {
        color: '#28a745', 
        marginRight: '5px'
    };

    const notPaidIconStyle = {
        color: '#dc3545', 
        marginRight: '5px'
    };

    return (
        <div>
            <h2>Payments</h2>
            
            {showModalPaiement &&
                <div className='absence'>
                    <h3 className='absh3'>Update Payment</h3>
                    <form className="absence-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="nom"
                                value={updatedPaiement.nom}
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
                                value={updatedPaiement.prenom}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>October:</label>
                            <select
                                name="octobre"
                                value={updatedPaiement.octobre}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>November:</label>
                            <select
                                name="novembre"
                                value={updatedPaiement.novembre}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>December:</label>
                            <select
                                name="decembre"
                                value={updatedPaiement.decembre}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>January:</label>
                            <select
                                name="janvier"
                                value={updatedPaiement.janvier}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>February:</label>
                            <select
                                name="fevrier"
                                value={updatedPaiement.fevrier}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>March:</label>
                            <select
                                name="mars"
                                value={updatedPaiement.mars}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>April:</label>
                            <select
                                name="avril"
                                value={updatedPaiement.avril}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>May:</label>
                            <select
                                name="mai"
                                value={updatedPaiement.mai}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>June:</label>
                            <select
                                name="juin"
                                value={updatedPaiement.juin}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className='absbutt'>
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
                        {paiements.map((paiement, index) => (
                            <tr key={index}>
                                <td>{paiement.nom}</td>
                                <td>{paiement.prenom}</td>
                                <td>{paiement.octobre ? <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} /> : <FontAwesomeIcon icon={faTimesCircle} style={notPaidIconStyle} />}</td>
                                <td>{paiement.novembre ? <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} /> : <FontAwesomeIcon icon={faTimesCircle} style={notPaidIconStyle} />}</td>
                                <td>{paiement.decembre ? <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} /> : <FontAwesomeIcon icon={faTimesCircle} style={notPaidIconStyle} />}</td>
                                <td>{paiement.janvier ? <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} /> : <FontAwesomeIcon icon={faTimesCircle} style={notPaidIconStyle} />}</td>
                                <td>{paiement.fevrier ? <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} /> : <FontAwesomeIcon icon={faTimesCircle} style={notPaidIconStyle} />}</td>
                                <td>{paiement.mars ? <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} /> : <FontAwesomeIcon icon={faTimesCircle} style={notPaidIconStyle} />}</td>
                                <td>{paiement.avril ? <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} /> : <FontAwesomeIcon icon={faTimesCircle} style={notPaidIconStyle} />}</td>
                                <td>{paiement.mai ? <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} /> : <FontAwesomeIcon icon={faTimesCircle} style={notPaidIconStyle} />}</td>
                                <td>{paiement.juin ? <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} /> : <FontAwesomeIcon icon={faTimesCircle} style={notPaidIconStyle} />}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Paiementet;
