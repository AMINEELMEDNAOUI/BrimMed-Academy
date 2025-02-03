import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import { faCheck , faPen } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); 
    const [loginError, setLoginError] = useState('');


    const handleInputChange = event => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response => {
                if (response.ok) {
                    return response.text(); 
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                const [id, role, name, firstname] = data.split(':');
    
                localStorage.setItem('userId', id);
                localStorage.setItem('userRole', role);
                localStorage.setItem('username', name);
                localStorage.setItem('userfirstname', firstname);
    
                switch (role) {
                    case 'ADMIN':
                        navigate('/adminDash');
                        break;
                    case 'TEACHER':
                        navigate('/profDashboard');
                        break;
                    case 'STUDENT':
                        navigate('/studentDashboard');
                        break;
                    default:
                        alert('Unknown role');
                }
            })
            .catch(error => {
                console.error('There was an error with the fetch operation:', error);
                setLoginError('Invalid email or password. Please try again.');
            });
    };
    

    return (
        <>
            <div className='divinit1'>
                <div className='div1'>
                    <FontAwesomeIcon icon={faHourglassStart} className='time' />
                    <h1 className='h11'>Stay on top of </h1>
                    <h1 className='h12'>school learning </h1>
                </div>
                <div className="div2">
                    <img src='/Brim&med.ico' alt='education image' className='imagebrmed' />
                    <img src='/imageeduc.png' alt='education image' className='imageedulog' />
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit} action='/App.jsx' method='POST'>

                        <div className='email'>
                            <label htmlFor='email' className='emaillabel'>Email</label>
                            <input type='text' placeholder='Your Email ' name='email' value={values.email} onChange={handleInputChange} className='form-control ' />
                        </div>

                        <div className='password'>
                            <label htmlFor='password' className='passlabel'>Password</label>
                            <input type='password' placeholder='Your Password ' name='password' value={values.password} onChange={handleInputChange} className='form-control ' />
                        </div>

                        <button type='submit' className='loginbutt'>Login</button>

                    </form>

                </div>

            </div>

            {loginError && (
    <div className="error-message">
        <p className='brimed'>BRIM&MED ACADEMY</p>
        <br/>
        <p className='ermsg'>{loginError}</p>
        <button className="close-button" onClick={() => setLoginError('')}>
        <FontAwesomeIcon icon={faTimes} className='x'/>
        </button>
    </div>
)}


        </>
    );
}

export default Login;
