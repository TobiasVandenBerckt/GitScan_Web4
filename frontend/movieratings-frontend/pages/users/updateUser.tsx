import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Head from '../../components/Head';
import UserService from '../../services/UserService';
import { useRouter } from 'next/router';
import { StatusMessage, User } from '../../types';

interface Props {
    user: User;
    onSubmit: (user: User) => void;
}

const EditForm: React.FC<Props> = ({user}) => {
        const [name, setName] = useState<string>("");
        const [email, setEmail] = useState<string>("");
        const [firstName, setFirstName] = useState<string>("");
        const [password, setPassword] = useState<string>("");
        const [emailError, setEmailError] = useState<string>("");
        const [nameError, setNameError] = useState<string>("");
        const [firstNameError, setFirstNameError] = useState<string>("");
        const [passwordError, setPasswordError] = useState<string>("");
        const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
        const [errors, setErrors] = useState<{ [key: string]: string }>({});
        const router = useRouter();

        useEffect(() => {
          if (user) {
              setEmail(user.email);
              setName(user.name);
              setFirstName(user.firstName);
              setPassword(user.password);
          }
      }, [user]);

        const validate = (): boolean => {
          setNameError("");
          setFirstNameError("");
          setEmailError("");
          setPasswordError("");
  
          if(!name) {
              setNameError("Name cannot be empty.");
              return false;
            }
          if(!firstName) {
              setFirstNameError("Firstname cannot be empty.");
              return false;
            }
          if(!password) {
              setPasswordError("Password cannot be empty.");
              return false;
            }
          if(!email) {
              setEmailError("Email cannot be empty.");
              return false;
              }
          return true;
        };

        const handleSubmit = async (event: any) => {
          event.preventDefault();
          
          const response = await UserService.updateUser({id: Number(sessionStorage.getItem("updateId")), name: name, firstName: firstName, email: email, password: password});
          router.push('/users');
        }
        return (
            <>
            <Head></Head>
            <Header></Header>
            <div className='container'>
            <form onSubmit={handleSubmit}>

                    <div className='form-group'>
                    <label htmlFor='emailInput' className='label-custom'>
                    Email:</label>
                    <input id="emailInput" type="text" name="email" className='form-control' value={email}
                    onChange={(event) => setEmail(event.target.value)} />
                    {emailError && <div className='text-danger'> {emailError} </div>}
                    </div>

                    <div className='formgroup'>
                     <label htmlFor='firstNameInput' className='label-custom'>
                    Firstname:</label>
                    <input id="firstNameInput" type="text" name="firstName" className='form-control' value={firstName}  
                    onChange={(event) => setFirstName(event.target.value)} />
                    {firstNameError && <div className='text-danger'> {firstNameError} </div>}
                    </div>

                    <div className='formgroup'>
                    <label htmlFor='userInput' className='label-custom'>
                    Name:</label>
                    <input id="userInput" type="text" name="name" className='form-control' value={name}
                    onChange={(event) => setName(event.target.value)} />
                    {nameError && <div className='text-danger'> {nameError} </div>}
                    </div>

                    <div className='formgroup'>
                    <label htmlFor='passwordInput' className='label-custom'>
                    Password:</label>
                    <input id="passwordInput" type="password" name="password" className='form-control' value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                    {passwordError && <div className='text-danger'> {passwordError} </div>}
                    </div>
                    <br />
                    <button type="submit" className='btn btn-primary'>Update</button>
            </form>
            </div>
            </>
        );
};

export default EditForm