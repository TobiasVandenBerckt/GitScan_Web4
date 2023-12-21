import Header from '../components/Header';
import Head from '../components/Head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Users: React.FC = () => {
    return (
        <>
            <Head></Head>
            <Header></Header>
            <main className="inner-cover text-center" style={{ paddingTop: '20px' }}>
                <h2 className="cover-heading">Welcome to MovieRatings!</h2>
                <h3 className="lead">The place to find info on your favorite movies.</h3>
            </main>
        </>
    );
};

export default Users;
