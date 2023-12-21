import Head from '../../components/Head';
import { Header } from '../../components/Header';
import DirectorOverviewTable from '../../components/directors/DirectorOverviewTable';
import { Director } from '../../types';
import DirectorService from '../../services/DirectorService';
import { useState, useEffect } from 'react';

const Directors: React.FC = () => {
    const [directors, setDirectors] = useState<Director[]>([]);
    const [error, setError] = useState<string>('');

    const fetchDirectors = async () => {
        setError('');
        const response = await DirectorService.getAllDirectors();
        if (!response.ok) {
            if (response.status === 401) {
                setError('You are not authorized. Please log in first.');
            } else {
                setError(response.statusText);
            }
        } else {
            const directors = await response.json();
            setDirectors(directors);
        }
    };
    useEffect(() => {
        fetchDirectors();
    }, []);
    return (
        <>
            <Head></Head>
            <Header />
            <div className="container">
                <h3 className="title h3-custom">Director overview</h3>

                <main>
                    {error && <div className="error-message">{error}</div>}{' '}
                    {/* Display error message */}
                    <section className="row justify-content-center">
                        <DirectorOverviewTable directors={directors} />
                    </section>
                </main>
            </div>
        </>
    );
};
export default Directors;
