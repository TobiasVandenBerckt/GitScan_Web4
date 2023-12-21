import React, {useEffect, useState} from "react";
import ActorService from "../../services/ActorService";
import { useRouter } from 'next/router'
import Header from "../../components/Header";
import { StatusMessage } from '../../types';

const AddActor: React.FC = () => {
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState(""); 
    const [info, setInfo] = useState("");
    const [nameError, setNameError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [infoError, setInfoError] = useState("");
    const [statusMessage, setStatusMessage] = useState<StatusMessage>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    const [state, setState] = useState({
        name: "",
        firstName: "",
        info: "",
    });

    const validate = (): boolean => {
        setNameError("");
        setFirstNameError("");
        setInfoError("");
        setStatusMessage(undefined);

        if(!name && name.trim() === "") {
            setNameError("Name cannot be empty.");
            return false;
          }
        if(!firstName && firstName.trim() === "") {
            setFirstNameError("Firstname cannot be empty.");
            return false;
          }
        if(!info && info.trim() === "") {
            setInfoError("Password cannot be empty.");
            return false;
          }
        return true;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if(!validate()) {
          return;
        }
        
        const response = await ActorService.createActor({ name : name, firstName : firstName, info: info});
         if (response.status === 200) {
           setStatusMessage({ type: "success", message: "ahaha" });
           setTimeout(() => {
             router.push("/");
           }, 2000);
           } else if (response.status === 401) {
             setStatusMessage({ type: "error", message: "error haha" });
           }
           router.push('/actors');
         };

         return (
            <>
            <Header></Header>
            <div className='form-custom'>
            <form onSubmit={handleSubmit}>
                <div className='formgroup'>
                <label htmlFor='nameInput' className='label-custom'>
                    Name:</label>
                </div>
                <div>
                  <input id="nameInput" type="text" name="name" className='form-control' value={name}
                  onChange={(event) => setName(event.target.value)} />
                  {nameError && <div className='text-danger'> {nameError} </div>}
                </div>

                <div className='formgroup'>
                <label htmlFor='firstNameInput' className='label-custom'>
                    firstame:</label>
                </div>
                <div>
                  <input id="firstNameInput" type="text" name="firstName" className='form-control' value={firstName}
                  onChange={(event) => setFirstName(event.target.value)} />
                  {firstNameError && <div className='text-danger'> {firstNameError} </div>}
                </div>

                <div className='formgroup'>
                <label htmlFor='infoInput' className='label-custom'>
                  Info:</label>
                </div>
                <div>
                  <input id="infoInput" type="info" name="info" className='form-control' value={info}
                  onChange={(event) => setInfo(event.target.value)} />
                  {infoError && <div className='text-danger'> {infoError} </div>}
                </div>

                <button type="submit" className='btn-custom'>Submit</button>
            </form>
            </div>
            </>
        );
      
};
export default AddActor