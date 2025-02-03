import React, { useState ,useEffect} from 'react';
import './studentDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faPen, faAngleDown, faUserCog, faChalkboardTeacher, faUserGraduate,  faList,faClock, faBullhorn, faTh, faCreditCard, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import './createAccst.css';
import { faInfoCircle,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Select } from 'antd';
import CreateAccst from './createAccst'; 
import CreateAccpr from './createAccpr'
import InfoPers from './infoPers';
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
import EmploiDT from './EmploiDT';
import Absenceet from './Absenceet';
import Annonceset from './Annonceset';
import Paiementet from './Paiementet';



function studentDashboard() {
  const [activeSection, setActiveSection] = useState('infoPers');
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
    if (activeSection === 'infoPers') return <InfoPers />;
    if (activeSection === 'Paiementet') return <Paiementet />;
    if (activeSection === 'Absenceet') return <Absenceet />;
    if (activeSection === 'EmploiDT') return <EmploiDT />;
    if (activeSection === 'Annonceset') return < Annonceset />;
    return <InfoPers />;
  };
  

  return (
    <>
      <div>
        <header className="app-header">
          <h1 className="app-title">Welcome, {username} </h1> 
          <FontAwesomeIcon icon={faUserGraduate} className='iconadmin' /><button className='logoutbutt' onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
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
      <div className="sidebar-item" onClick={() => onSectionClick('infoPers')}>
        <FontAwesomeIcon className='icondash' icon={faInfoCircle} /> Personal information
      </div>
      <div className="sidebar-item" onClick={() => onSectionClick('Paiementet')}>
        <FontAwesomeIcon icon={faCreditCard} className='iconempl' /> Payment
      </div>
      <div className="sidebar-item" onClick={() => onSectionClick('Absenceet')}>
        <FontAwesomeIcon icon={faClock} className='iconempl' /> Absence
      </div>
      <div className="sidebar-item" onClick={() => onSectionClick('EmploiDT')}>
        <FontAwesomeIcon icon={faCalendarAlt} className='iconempl' /> Schedule
      </div>
      <div className="sidebar-item" onClick={() => onSectionClick('Annonceset')}>
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
  

export default studentDashboard;

