import React, { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Head from '../../components/Head';
import { StatusMessage } from '../../types';

const AddUser: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [statusMessage, setStatusMessage] = useState<StatusMessage>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    const [state, setState] = useState({
        email: '',
        name: '',
        firstName: '',
        password: '',
    });

    const validate = (): boolean => {
        setNameError('');
        setFirstNameError('');
        setEmailError('');
        setPasswordError('');
        setStatusMessage(undefined);
 
        if (!email && email.trim() === '') {
            setEmailError('Email cannot be empty.');
            return false;
        }
        if (!name && name.trim() === '') {
            setNameError('Name cannot be empty.');
            return false;
        }
        if (!firstName && firstName.trim() === '') {
            setFirstNameError('Firstname cannot be empty.');
            return false;
        }
        if (!password && password.trim() === '') {
            setPasswordError('Password cannot be empty.');
            return false;
        }
       
        return true;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
    
        if (!validate()) {
            return;
        }
    
        try {
            const response = await UserService.createUser({
                email: email,
                name: name,
                firstName: firstName,
                password: password,
            });
    
            console.log('Response:', response);
    
            if (response && response.message === "Email already exists") {
                alert('Email already exists');
            } else if (response && response.status === 200) {
                setStatusMessage({ type: 'success', message: 'ahaha' });
                
                // Only navigate to the home page if the response status is 200
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else if (response && response.status === 401) {
                setStatusMessage({ type: 'error', message: 'error haha' });
            } else {
                console.log('Unhandled response:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <>
            <Head></Head>
            <Header></Header>
            <div className="container" style={{marginLeft: '20px', marginTop:'15px'}}>
                <h3>Add User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="emailInput" className="label-custom">
                            Email:
                        </label>
                        <input
                        style={{ width: '25%' }}
                            id="emailInput"
                            type="text"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {emailError && <div className="text-danger"> {emailError} </div>}
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="nameInput" className="label-custom">
                            Name:
                        </label>
                        <input
                        style={{ width: '25%' }}
                            id="nameInput"
                            type="text"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        {nameError && <div className="text-danger"> {nameError} </div>}
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="firstNameInput" className="label-custom">
                            Firstname:
                        </label>
                        <input
                        style={{ width: '25%' }}
                            id="firstNameInput"
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                        {firstNameError && <div className="text-danger"> {firstNameError} </div>}
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="passwordInput" className="label-custom">
                            Password:
                        </label>
                        <input
                        style={{ width: '25%' }}
                            id="passwordInput"
                            type="password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {passwordError && <div className="text-danger"> {passwordError} </div>}
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};
export default AddUser;
