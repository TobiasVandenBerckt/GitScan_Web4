import React from 'react';
import { Director } from '../../types';

type Props = {
    directors: Director[];
};

const DirectorOverviewTable: React.FC<Props> = ({ directors }: Props) => (
    <div className="container">
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Info</th>
                </tr>
            </thead>
            <tbody>
                {directors.map((director) => (
                    <tr key={director.id}>
                        <th scope="row">{director.id}</th>
                        <td>{director.name}</td>
                        <td>{director.firstName}</td>
                        <td>{director.info}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
export default DirectorOverviewTable;
