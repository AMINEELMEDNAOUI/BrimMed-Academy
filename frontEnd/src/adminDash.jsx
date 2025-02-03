import React, { useState ,useEffect} from 'react';
import './adminDash.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faPen,faArrowRightFromBracket, faAngleDown, faUserCog, faChalkboardTeacher, faUserGraduate,  faList,faClock, faBullhorn, faTh, faCreditCard, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import './createAccst.css';
import { Select } from 'antd';
import CreateAccst from './createAccst'; 
import CreateAccpr from './createAccpr'
import Dashboard from './Dashboard';
import AbsenceEtudiants from './AbsenceEtudiants';
import AbsenceProfs from './AbsenceProfs';
import PaiementEtudiants from './PaiementEtudiants';
import PaiementProfs from './PaiementProfs';
import ListeEtud from './ListeEtud';
import ListeProf from './ListeProf';
import EmploiDuTemps from './EmploiDuTemps';
import  Annoncesadmin from './Annoncesadmin'
import { useLocation } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import usePreventBackNavigation from './usePreventBackNavigation';





function AdminDash() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [activeSubSection, setActiveSubSection] = useState('');
  const location = useLocation();
const [username, setUsername] = useState('');
const [userFirstname, setUserFirstname] = useState('');
const navigate = useNavigate();

usePreventBackNavigation(); 

const logout = () => {
  
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
  localStorage.removeItem('username');

  
  navigate('/', { replace: true });
};

  const handleSectionClick = (section, subSection = '') => {
    setActiveSection(section);
    setActiveSubSection(subSection);
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const userFirstname = localStorage.getItem('firstname');

    setUsername(storedUsername);
    setUserFirstname(userFirstname);
  }, [location]);

  const renderContent = () => {
    if (activeSection === 'Dashboard') return <Dashboard />;
    if (activeSection === 'Gestion') {
      if (activeSubSection === 'Profs') return <CreateAccpr />;
      if (activeSubSection === 'Etudiants') return <CreateAccst />;
      return <Gestion />;
    }
    if (activeSection === 'Paiement') {
      if (activeSubSection === 'Profs') return <PaiementProfs />;
      if (activeSubSection === 'Etudiants') return <PaiementEtudiants />;
      return <Paiement />;
    }
    if (activeSection === 'Absences') {
      if (activeSubSection === 'Profs') return <AbsenceProfs />;
      if (activeSubSection === 'Etudiants') return <AbsenceEtudiants />;
      return <Absences />;
    }
    if (activeSection === 'EmploiDuTemps') return <EmploiDuTemps />;
    if (activeSection === 'Annonce') return < Annoncesadmin />;
    if (activeSection === 'Lists') {
      if (activeSubSection === 'Etudiants') return <ListeEtud />;
      if (activeSubSection === 'Profs') return <ListeProf />;
      return <Lists />;
    }
    return <Dashboard />;
  };
  

  return (
    <>
      <div>
        <header className="app-header">
          <h1 className="app-title">Welcome, {username} </h1> 
          <FontAwesomeIcon icon={faUserCog} className="iconadmin" /><button className='logoutbutt' onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
          <img src="/Brim_med1.png" alt="Logo" className="app-logo" />
        </header>
      </div>
      <div className="app">
        <Sidebar onSectionClick={handleSectionClick} />
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </>
  );
}

const Sidebar = ({ onSectionClick }) => {
  const [gestionOpen, setGestionOpen] = useState(false);
  const [paiementOpen, setPaiementOpen] = useState(false);
  const [absencesOpen, setAbsencesOpen] = useState(false);
  const [listsOpen, setListsOpen] = useState(false); 

  const toggleGestion = () => {
    setGestionOpen(!gestionOpen);
    setPaiementOpen(false);
    setAbsencesOpen(false);
    setListsOpen(false); 
  };

  const togglePaiement = () => {
    setPaiementOpen(!paiementOpen);
    setGestionOpen(false);
    setAbsencesOpen(false);
    setListsOpen(false); 
  };

  const toggleAbsences = () => {
    setAbsencesOpen(!absencesOpen);
    setGestionOpen(false);
    setPaiementOpen(false);
    setListsOpen(false);
  };

  const toggleLists = () => {
    setListsOpen(!listsOpen);
    setGestionOpen(false);
    setPaiementOpen(false);
    setAbsencesOpen(false)
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item" onClick={() => onSectionClick('Dashboard')}>
        <FontAwesomeIcon className='icondash' icon={faTh} /> Dashboard
      </div>
      <div className="sidebar-item" onClick={toggleGestion}>
        <FontAwesomeIcon icon={faPen} className='iconmanag' /> Management {gestionOpen ? <FontAwesomeIcon icon={faAngleUp} className='iconup' /> : <FontAwesomeIcon icon={faAngleDown} className='icondown' />}
      </div>
      {gestionOpen && (
        <>
          <div className="sidebar-sub-item" onClick={() => onSectionClick('Gestion', 'Profs')}>
            <FontAwesomeIcon icon={faChalkboardTeacher} className='iconteach' /> Teachers
          </div>
          <div className="sidebar-sub-item" onClick={() => onSectionClick('Gestion', 'Etudiants')}>
            <FontAwesomeIcon icon={faUserGraduate} className='iconstud' /> Students
          </div>
        </>
      )}
      <div className="sidebar-item" onClick={togglePaiement}>
        <FontAwesomeIcon icon={faCreditCard} className='iconpaim' /> Payment {paiementOpen ? <FontAwesomeIcon icon={faAngleUp} className='iconup' /> : <FontAwesomeIcon icon={faAngleDown} className='icondown' />}
      </div>
      {paiementOpen && (
        <>
          <div className="sidebar-sub-item" onClick={() => onSectionClick('Paiement', 'Profs')}>
            <FontAwesomeIcon icon={faChalkboardTeacher} className='iconteach' /> Teachers
          </div>
          <div className="sidebar-sub-item" onClick={() => onSectionClick('Paiement', 'Etudiants')}>
            <FontAwesomeIcon icon={faUserGraduate} className='iconstud' /> Students
          </div>
        </>
      )}
      <div className="sidebar-item" onClick={toggleAbsences}>
        <FontAwesomeIcon icon={faClock} className='iconabs' /> Absences {absencesOpen ? <FontAwesomeIcon icon={faAngleUp} className='iconup' /> : <FontAwesomeIcon icon={faAngleDown} className='icondown' />}
      </div>
      {absencesOpen && (
        <>
          <div className="sidebar-sub-item" onClick={() => onSectionClick('Absences', 'Profs')}>
            <FontAwesomeIcon icon={faChalkboardTeacher} className='iconteach' /> Teachers
          </div>
          <div className="sidebar-sub-item" onClick={() => onSectionClick('Absences', 'Etudiants')}>
            <FontAwesomeIcon icon={faUserGraduate} className='iconstud' /> Students
          </div>
        </>
      )}
      
      <div className="sidebar-item" onClick={toggleLists}>
        <FontAwesomeIcon icon={ faList} className='iconstud' /> Lists {listsOpen ? <FontAwesomeIcon icon={faAngleUp} className='iconup' /> : <FontAwesomeIcon icon={faAngleDown} className='icondown' />}
      </div>
      {listsOpen && (
        <>
        <div className="sidebar-sub-item" onClick={() => onSectionClick('Lists', 'Profs')}>
            <FontAwesomeIcon icon={faChalkboardTeacher} className='iconteach' /> Teachers
          </div>
          <div className="sidebar-sub-item" onClick={() => onSectionClick('Lists', 'Etudiants')}>
            <FontAwesomeIcon icon={faUserGraduate} className='iconstud' /> Students
          </div>
          
        </>
      )}
      <div className="sidebar-item" onClick={() => onSectionClick('EmploiDuTemps')}>
        <FontAwesomeIcon icon={faCalendarAlt} className='iconempl' /> Schedule
      </div>
      <div className="sidebar-item" onClick={() => onSectionClick('Annonce')}>
        <FontAwesomeIcon icon={faBullhorn} className='iconann' /> Announcement
      </div>
    </div>
  );
};



const Gestion = () => (
  <div>
    <h2>Gestion</h2>
    <p>Please select a sub-section from the sidebar.</p>
  </div>
);







const Absences = () => (
  <div>
    <h2>Absences</h2>
    <p>Please select a sub-section from the sidebar.</p>
  </div>
);

const AbsencesProfs = () => (
  <div>
    <h2>Absences Profs</h2>
    <p>Absences des professeurs.</p>
  </div>
);

const AbsencesEtudiants = () => (
  <div>
    <h2>Absences Etudiants</h2>
    <p>Absences des étudiants.</p>
  </div>
);



const Annonce = () => (
  <div>
    <h2>Annonce</h2>
    <p>Gestion des annonces.</p>
  </div>
);
const ListStudents = () => (
    <div>
      <h2>List of Students</h2>
      <p>Display list of students here.</p>
      
    </div>
  );
  
  const ListProfessors = () => (
    <div>
      <h2>List of Professors</h2>
      <p>Display list of professors here.</p>
     
    </div>
  );
  

export default AdminDash;

