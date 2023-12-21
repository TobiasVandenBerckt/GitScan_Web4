import Header from '../../components/Header';
import Head from '../../components/Head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Users: React.FC = () => {
    return (
        <>
        <Head></Head>
            <main className="inner-cover text-center" style={{ paddingTop: '20px' }}>
                <h2 className="cover-heading">User deleted successfully!</h2>
                <Link href="/users">
                    <button className="btn btn-primary btn-sm">Back to User Overview Page</button>
                </Link>
                <p>Or</p>
                <Link href="/">
                    <button className="btn btn-primary btn-sm">Back to Home Page</button>
                </Link>
            </main>
        </>
    );
};

export default Users;
