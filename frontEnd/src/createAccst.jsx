import React from 'react' ;
import './Login.css' ;
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart  } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './createAccst.css';
import { Select,Checkbox } from 'antd';
import axios from 'axios' ;
import CustomAlert from './CustomAlert';

import { useNavigate ,Link} from 'react-router-dom';

function createAccst () {
    const [values, setValues] = useState({
        nom: '',
        prenom: '',
        mail: '',
        mdp: '',
        niveau: '',
        matiereIds: []
    });
   
  
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
 

    const handleInputChange = event => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleCheckboxChange = checkedValues => {
        setValues(prev => ({
            ...prev,
            matiereIds: checkedValues
        }));
    };
    const handleSelectChange = value => {
        setValues(prev => ({
            ...prev,
            niveau: value
        }));
    };

    const navigate = useNavigate()
    const handleSubmit2 = event => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/students/register', values)
          .then(response => {
            if (response.data.status === 'success') {
              setAlert({ show: true, message: 'Student added successfully', type: 'success' });
              setValues({
                nom: '',
                prenom: '',
                mail: '',
                mdp: '',
                salaire: '',
                niveau: '',
                matiereIds: []
              });
            } else {
              setAlert({ show: true, message: 'Error adding student: ' + response.data.message, type: 'error' });
            }
          })
          .catch(error => {
            console.error('Error adding student:', error);
            setAlert({ show: true, message: 'Error adding student: ' + error.message, type: 'error' });
          });
      };

    return (
          <>
          
          <div className='divinit'>
            <div className='div1'>
            <FontAwesomeIcon icon={faHourglassStart} className='time'/>
               <h1 className='h11'>Stay on top of </h1>
                <h1 className='h12'>school learning </h1>
                
            </div>
            <div className="div2">
            <img src='/Brim&med.ico' alt='education image' className='imagebrmed'/>
            <img src='/imageeduc.png' alt='education image' className='imageedu'/>
               <div className="create">
                <h3 className='h3create'>Create Account for new student</h3>
                <form onSubmit={handleSubmit2} action='/App.jsx' method='POST'>
               <div className='firstlast'>
                <div className='firstname'>
                <label htmlFor='firstname' className='firstlabel'>First Name</label>
                    <input type='text' placeholder='First Name ' name ='prenom' value= {values.prenom} onChange={handleInputChange} required className='form-control ' />
                    </div> 
                    <div className='lastname'>
                    <label htmlFor='lastname' className='lastlabel'>Last Name</label>
                    <input type='text' placeholder=' Last Name ' name ='nom' value= {values.nom} onChange={handleInputChange} required className='form-control ' />
                    </div> 
                    </div>
                    <div className='email'>
                    <label htmlFor='email' className='emaillabel'>Email</label>
                    <input type='text' placeholder='Email ' name ='mail' value= {values.mail} onChange={handleInputChange} required className='form-control' />
                    </div> 

                    <div className='password'>
                    <label htmlFor='password' className='passlabel'>Password</label>
                    <input type='password' placeholder=' Password ' name='mdp' value={values.mdp} onChange={handleInputChange} required className='form-control '/>
                    </div> 
                    <div className="select-cl">
                
                    <Select
  className='tr-select'
  id='trackselect'
  value={values.niveau}
  onChange={handleSelectChange} 
  showSearch
  filterOption={(input, option) =>
    typeof option.children === 'string' &&
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
>
<Option value='' disabled hidden>School Level </Option>
  <Option value='5th year of high school - Science X'>5th year of high school - Science X</Option>
  <Option value='1st year of baccalaureate - Science X'>1st year of baccalaureate - Science X</Option>
  <Option value='2nd year of baccalaureate - Science Math'>2nd year of baccalaureate - Science Math</Option>
  <Option value='2nd year of baccalaureate - Physics Science'>2nd year of baccalaureate - Physics Science</Option>
  <Option value='2nd year of baccalaureate - Life and Earth Science'>2nd year of baccalaureate - Life and Earth Science</Option>
</Select>

              </div> 
                    <div className='checkbox-group'>
                    <p className='checkbox-group-label'>Choose Tracks</p>
                <Checkbox.Group onChange={handleCheckboxChange} value={values.matiereIds} >
                  <Checkbox value={2} >Physics & Chemistry</Checkbox>
                  <Checkbox value={1}>Maths</Checkbox>
                  <Checkbox value={3}>SVT</Checkbox>
                </Checkbox.Group>
              </div>
                    

                    
                    <button type='submit' className='loginbutt'>Add Student</button>
                    

          </form>
          
          </div>
          </div>
          </div>
          {alert.show && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ show: false, message: '', type: '' })}
        />
      )}
          
         </>
    ); 
}
export default createAccst;