import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListeProf.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck , faPen } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ListeProf = () => {
    const [listeProf, setListeProf] = useState([]);

    useEffect(() => {
        fetchProfs();
    }, []);

    const fetchProfs = () => {
        axios.get('http://localhost:8080/api/professors/all')
            .then(response => {
                const groupedData = groupByStudent(response.data);
                setListeProf(groupedData);
            })
            .catch(error => {
                console.error("There was an error fetching the absences data!", error);
            });
    };

    const groupByStudent = (data) => {
        const grouped = {};
        data.forEach(item => {
            const key = `${item.nom}-${item.prenom}-${item.mail}-${item.niveau}-${item.salaire}`;
            if (!grouped[key]) {
                grouped[key] = { ...item, matieres: [] };
            }
            grouped[key].matieres.push(item.nomMat);
        });
        return Object.values(grouped);
    };

    const deleteProf = (id) => {
        axios.delete(`http://localhost:8080/api/users/${id}`)
            .then(response => {
                fetchProfs();

            })
            .catch(error => {
                console.error("There was an error deleting the Teacher!", error);
            });
    };
    

    return (
        <div>
            <h2>Teacher's List</h2>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Level</th>
                            <th>Salary</th>
                            <th>Subject</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listeProf.map((prof, index) => (
                            <tr key={index}>
                                <td>Pr. {prof.nom}</td>
                                <td>{prof.prenom}</td>
                                <td>{prof.mail}</td>
                                <td>{prof.niveau}</td>
                                <td>{prof.salaire}</td>
                                <td>{prof.matieres.join(' , ')}</td>
                                <td>
                                    
                                    <button className='buttdel' onClick={() => deleteProf(prof.userid)}>
                                        <FontAwesomeIcon icon={faTimes} className='icondele' />
                                       
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListeProf;
