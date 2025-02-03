import React, { useState, useEffect } from 'react';
import AnnonceCardst from './AnnonceCardst';
import './Annoncesadmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck , faPen } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



const Annonceset = () => {
    const [annonces, setAnnonces] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newAnnonce, setNewAnnonce] = useState({ contenu: '', nom: '', prenom: '' });
    const [username, setUsername] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('');
    const [userFirstname, setUserFirstname] = useState('');

    useEffect(() => {
        fetchAnnonces();
    }, []);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');
        const storedUserRole = localStorage.getItem('userRole');
        const storedUserFirstName = localStorage.getItem('userfirstname');
    
        setUsername(storedUsername);
        setUserRole(storedUserRole);
        setUserId(storedUserId);
        setUserFirstname(storedUserFirstName);
    }, []);

    const fetchAnnonces = () => {
        fetch('http://localhost:8080/api/annonces/all')
            .then(response => response.json())
            .then(data => setAnnonces(data))
            .catch(error => console.error('Error fetching annonces:', error));
    };

    const deleteAnnonce = (id) => {
        fetch(`http://localhost:8080/api/annonces/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                fetchAnnonces();
            } else {
                console.error('Error deleting annonce');
            }
        })
        .catch(error => console.error('Error deleting annonce:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnnonce(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCancel = () => {
        setShowForm(false);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const annonceData = {
            ...newAnnonce,
            user: { id: userId },
            nom: username,
            prenom: userFirstname
        };
        fetch('http://localhost:8080/api/annonces/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(annonceData),
        })
        .then(response => {
            if (response.ok) {
                setShowForm(false);
                setNewAnnonce({ contenu: '', nom: '', prenom: '' });
                fetchAnnonces();
            } else {
                console.error('Error adding annonce');
            }
        })
        .catch(error => console.error('Error adding annonce:', error));
    };

    return (
        <div className="annonces-container">
            <h2>Announcement</h2>
            
            <button className='updateabs' style={{width:'160px',height:'58px'}} onClick={() => setShowForm(!showForm)}>
                Add Announcement
            </button>
            {showForm && (
                <div className='showformann'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='labcont'>Content :</label>
                        <textarea className='textar'
                            name="contenu"
                            placeholder='enter content'
                            value={newAnnonce.contenu}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <div className='absbutt' style={{left:'72%',top:'90%'}}>
                            <button className='buttonvhor'  onClick={handleSubmit}>Save <FontAwesomeIcon icon={faCheck} /></button>
                            <button className='buttonahor' onClick={handleCancel}>Cancel <FontAwesomeIcon icon={faTimes} /></button>
                        </div>
                </form>
                </div>
            )}
            <div className="annonces-grid">
                {annonces.map(annonce => (
                    <AnnonceCardst key={annonce.id} annonce={annonce} />
                ))}
            </div>
        </div>
    );
};

export default Annonceset;
