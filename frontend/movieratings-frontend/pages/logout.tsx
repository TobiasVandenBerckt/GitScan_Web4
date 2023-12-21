import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Head from '../components/Head'
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import UserService from '../services/UserService';
import { StatusMessage } from '../types';
import { useRouter } from 'next/router';

const Logout: React.FC = () => {

    const [statusMessage, setStatusMessage] = useState<StatusMessage>();
    const router = useRouter();
    
    const clickLogout = async () => {
      sessionStorage.removeItem("token");
      router.push('/');
}

    return (
        <>
          <Header></Header>
          <Head></Head>          
          <main>
            <section className='row justify-content-center'>
              <h3 style={{textAlign: 'center', marginTop: '25px'}}>Are you sure you want to log out?</h3>
              <button className='btn btn-primary' style={{width: '25%', marginTop: '10px'}} onClick={() => {clickLogout();}}>Confirm</button>
            </section>
          </main>
          
          </>
      )
    }
    
    export default Logout