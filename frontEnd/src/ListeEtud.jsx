import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListeEtud.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const ListeEtud = () => {
    const [listeEtud, setListeEtud] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        axios.get('http://localhost:8080/api/students/all')
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

    const deleteStudent = (id) => {
        axios.delete(`http://localhost:8080/api/users/${id}`)
            .then(response => {
                fetchStudents();

            })
            .catch(error => {
                console.error("There was an error deleting the student!", error);
            });
    };

    return (
        <div>
            <h2>Student's List</h2>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                        
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Level</th>
                            <th>Subjects</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listeEtud.map((etud, index) => (
                            <tr key={index}>
                                
                                <td>{etud.nom}</td>
                                <td>{etud.prenom}</td>
                                <td>{etud.mail}</td>
                                <td>{etud.niveau}</td>
                                <td>{etud.matieres.join(', ')}</td>
                                <td>
                                    
                                    <button className='buttdel' onClick={() => deleteStudent(etud.userid)}>
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

export default ListeEtud;
