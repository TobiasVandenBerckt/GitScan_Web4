import React from 'react';
import { User } from '../../types';
import UserService from '@/services/UserService';
import { useRouter } from 'next/router';

type Props = {
    users: User[];
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
    const router = useRouter();
    const clickDelete =  (deleteId: any) => {
      UserService.deleteUser({id: deleteId});
      router.push('/users/deleteConfirm');


  };
    const clickUpdate = (updateId: any) => {
        sessionStorage.setItem('updateId', updateId);
        router.push('/users/updateUser');
    };

    return (
        <div className="container">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.firstName}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        clickUpdate(user.id);
                                    }}
                                >
                                    update
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => {
                                        clickDelete(user.id);
                                    }}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default UserOverviewTable;
