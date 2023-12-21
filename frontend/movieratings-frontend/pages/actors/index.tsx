import Head from '../../components/Head'
import { Header } from '../../components/Header'
import ActorOverviewTable from '../../components/actors/ActorOverviewTable'
import { Actor } from '../../types'
import ActorService from '../../services/ActorService'
import { useState, useEffect } from 'react'
import React from 'react'

const Actors: React.FC = () => {
    const [actors, setActors] = useState<Actor[]>([])
    const [error, setError] = useState<string>("")
    
    const fetchActors = async () => {
        setError("");
        const response = await ActorService.getAllActors();
        if (!response.ok) {
          if (response.status === 401) {
            setError("You are not authorized. Please log in first.");
          } else {
            setError(response.statusText);
          }
        } else {
          const users = await response.json();
          setActors(users);
        }
      };

    useEffect(() => {
        fetchActors()
    }, [])

    return (
        <>
        <Head></Head>
      <Header />
      <div className='container'>
        <h3 className="title h3-custom">
          Actor overview
        </h3>
      
      <main>
        {error && <div className='error-message'>{error}</div>} {/* Display error message */}
        <section className='row justify-content-center'>
          <ActorOverviewTable actors={actors} />
        </section>
      </main>
      </div>
        </>
    )
}
export default Actors