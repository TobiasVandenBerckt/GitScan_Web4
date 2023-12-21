import React, {useEffect, useState} from "react";
import MovieService from "../../services/MovieService";
import { useRouter } from 'next/router'
import Header from "../../components/Header";
import { StatusMessage } from '../../types';
import { Director, Actor } from "../../types";

const AddMovies: React.FC = () => {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [duration, setDuration] = useState(""); 
    const [info, setInfo] = useState("");
    const [beoordeling, setBeoordeling] = useState("");
    const [director , setDirector] = useState<number>();
    const [actors, setActors] = useState<number[]>([]);
    const [titleError, setTitleError] = useState("");
    const [yearError, setYearError] = useState("");
    const [durationError, setDurationError] = useState("");
    const [infoError, setInfoError] = useState("");
    const [beoordelingError, setBeoordelingError] = useState("");
    const [DirectorError, setDirectorError] = useState("");
    const [ActorsError, setActorsError] = useState("");
    const [statusMessage, setStatusMessage] = useState<StatusMessage>();
    const [error, setError] = useState<string>();
    const router = useRouter();

    const [state, setState] = useState({
        title: "",
        year: "",
        duration: "",
        info: "",
        beoordeling: "",
        director: "",
        actors: "",
    });

    const validate = (): boolean => {
        setTitleError("");  
        setYearError("");
        setDurationError("");
        setInfoError("");
        setBeoordelingError("");
        setDirectorError("");
        setActorsError("");
        setStatusMessage(undefined);

        if(!title && title.trim() === "") {
            setTitleError("Title cannot be empty.");
            return false;
        }
        if(!year && year.trim() === "") {
            setYearError("Year cannot be empty.");
            return false;
        }
        if(!duration && duration.trim() === "") {
            setDurationError("Duration cannot be empty.");
            return false;
        }
        if(!info && info.trim() === "") {
            setInfoError("Info cannot be empty.");
            return false;
        }
        if(!beoordeling && beoordeling.trim() === "") {
            setBeoordelingError("Beoordeling cannot be empty.");
            return false;
        }
        if(!director) {
            setDirectorError("Director cannot be empty.");
            return false;
        }
        if(!actors) {
            setActorsError("Actors cannot be empty.");
            return false;
        }        
        return true;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if(!validate()) {
          return;
        }
        
        const response = await MovieService.createMovie({title: title, year: year, duration: duration, info: info, beoordeling: beoordeling, director: director, actors: actors});
         if (response.status === 200) {
           setStatusMessage({ type: "success", message: "ahaha" });
           setTimeout(() => {
             router.push("/");
           }, 2000);
           } else if (response.status === 401) {
             setStatusMessage({ type: "error", message: "error haha" });
           }
           router.push('/movies');
         };

         return (
            <>
            <Header></Header>
            <div className='form-custom'>
            <form onSubmit={handleSubmit}>
                <div className='formgroup'>

                <label htmlFor='titleInput' className='label-custom'>
                  title:</label>
                </div>
                <div>
                  <input id="titleInput" type="text" name="title" className='form-control' value={title}
                  onChange={(event) => setTitle(event.target.value)} />
                  {titleError && <div className='text-danger'> {titleError} </div>}
                </div>

                <div className='formgroup'>
                <label htmlFor='yearInput' className='label-custom'>
                  year:</label>
                </div>
                <div>
                    <input id="yearInput" type="number" name="year" className='form-control' value={year}
                    onChange={(event) => setYear(event.target.value)} />
                    {yearError && <div className='text-danger'> {yearError} </div>}
                </div>

                <div className='formgroup'>
                <label htmlFor='durationInput' className='label-custom'>
                  duration:</label>
                </div>
                <div>
                    <input id="durationInput" type="number" name="duration" className='form-control' value={duration}
                    onChange={(event) => setDuration(event.target.value)} />
                    {durationError && <div className='text-danger'> {durationError} </div>}
                </div>

                <div className='formgroup'>
                <label htmlFor='infoInput' className='label-custom'>
                  info:</label>
                </div>
                <div>
                    <input id="infoInput" type="text" name="info" className='form-control' value={info}
                    onChange={(event) => setInfo(event.target.value)} />
                    {infoError && <div className='text-danger'> {infoError} </div>}
                </div>

                <div className='formgroup'>
                <label htmlFor='beoordelingInput' className='label-custom'>
                  beoordeling:</label>
                </div>
                <div>
                    <input id="beoordelingInput" type="number" name="beoordeling" className='form-control' value={beoordeling}
                    onChange={(event) => setBeoordeling(event.target.value)} />
                    {beoordelingError && <div className='text-danger'> {beoordelingError} </div>}
                </div>

                {/* <div className='formgroup'>
                <label htmlFor='directorInput' className='label-custom'>
                  director:</label>
                </div>
                <div>
                    <input id="directorInput" type="number" name="director" className='form-control' value={director?.id}
                    onChange={(event) => setDirector(event.target.value)} />
                    {DirectorError && <div className='text-danger'> {DirectorError} </div>}
                   
                </div>

                <div className='formgroup'>
                <label htmlFor='actorsInput' className='label-custom'>
                  actors:</label>
                </div>
                <div>
                    <input id="actorsInput" type="number" name="actors" className='form-control' value={actors.join(",")}
                    onChange={(event) => setActors(event.target.value.split(',').map(id => parseInt(id)))} />
                    {ActorsError && <div className='text-danger'> {ActorsError} </div>}
                </div> */}

                
               

                <button type="submit" className='btn-custom'>Submit</button>
            </form>
            </div>
            </>
        );
      
};
export default AddMovies;