import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Head from '../components/Head'
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import UserLogin from '../components/users/UserLogin';

const Login: React.FC = () => {

    return (
        <>
          <Head></Head>
          <Header></Header>
          <div className='container' style={{marginLeft: '25px', marginTop:'20px'}}>
            <h3 className="title h3-custom">
              User Login
            </h3>
          
          <main>
            <section className='row justify-content-center'>
              <UserLogin/>
            </section>
          </main></div>
          </>
      )
    }
    
    export default Login