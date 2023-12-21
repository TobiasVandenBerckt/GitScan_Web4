import React, { useState } from 'react';
import Header from '../../components/Header';
import UserService from '../../services/UserService';
import { useRouter } from 'next/router';

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const validate = (): boolean => {
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    if (!email || email.trim() === '') {
      setEmailError('Email cannot be empty.');
      return false;
    }
    if (!password || password.trim() === '') {
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

    const response = await UserService.loginUser({ email: email, password: password });
    if (response.status === 200) {
      const { token } = await response.json();
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('email', email);
      router.push('/');
    } else {
      setLoginError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <>
      
      <main>
        <section className='row justify-content-center'>
          <form className='form-signin' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='emailInput'>Email:</label>
              <input style={{ width: '25%' }}
                id='emailInput'
                type='text'
                name='email'
                className='form-control'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {emailError && <div className='text-danger'>{emailError}</div>}
            </div>
            <br />
            <div className='form-group'>
              <label htmlFor='passwordInput' className='label-custom'>
                Password:
              </label>
              <input
              style={{ width: '25%' }}
                id='passwordInput'
                type='password'
                name='password'
                className='form-control'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {passwordError && <div className='text-danger'>{passwordError}</div>}
            </div>
            <br />
            {loginError && <div className='text-danger'>{loginError}</div>}
            <br />
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default UserLogin;
