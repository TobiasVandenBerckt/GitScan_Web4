import { Header } from '../../components/Header';
import UserOverviewTable from '../../components/users/UserOverviewTable';
import { User } from '../../types';
import UserService from '../../services/UserService';
import { useState, useEffect } from 'react';
import Head from '../../components/Head';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    setError("");
    const response = await UserService.getAllUsers();
    if (!response.ok) {
      if (response.status === 401) {
        setError("You are not authorized. Please log in first.");
      } else {
        setError(response.statusText);
      }
    } else {
      const users = await response.json();
      setUsers(users);
    }
  };

  useEffect(() => {
   fetchUsers();
  }, []);
  

  return (
    <>
      <Head></Head>
      <Header />
      <div className='container'>
        <h3 className="title h3-custom">
          User overview
        </h3>
      
      <main>
        {error && <div className='error-message'>{error}</div>} {/* Display error message */}
        <section className='row justify-content-center'>
          <UserOverviewTable users={users} />
        </section>
      </main>
      </div>
    </>
  );
};

export default Users;
