import React from "react";
import {Actor} from '../../types'

type Props = {
    actors: Actor[]
}

const ActorOverviewTable : React.FC<Props> = ({actors}: Props) => {
    return (
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
              {actors.map((actor) => (
                  <tr key={actor.id}>
                      <th scope="row">{actor.id}</th>
                      <td>{actor.name}</td>
                      <td>{actor.firstName}</td>
                      <td>{actor.info}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  </div>
      );
    }
    export default ActorOverviewTable;
