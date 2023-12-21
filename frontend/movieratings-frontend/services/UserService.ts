const getAllUsers = () => {
    const token = sessionStorage.getItem("token");
    return fetch('http://localhost:3000/users', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
}

const getUserById = (id: number) => {
    const token = sessionStorage.getItem("token");
    console.log('Getting user by id');
    return fetch('http://localhost:3000/user/:id' + id, { method: 'GET' , headers: { Authorization: `Bearer ${token}`}});
    //    return fetch(process.env.REACT_APP_API_URL + '/users/' + id);
};

const createUser = (requestString: any) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',  Authorization: `Bearer ${token}` },
        body: JSON.stringify(requestString)
    };
    return fetch('http://localhost:3000/user/add', requestOptions)
        .then(response => response.json());
};

const deleteUser = (deleteId: {id: number}) : Promise<void> => {
    const token = sessionStorage.getItem("token");
    return fetch(`http://localhost:3000/user/delete/${deleteId.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete user.');
    }
    console.log('User deleted successfully.');
  })
  .catch(error => {
    console.error(error);
  });
}

const updateUser = (requestString: any) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        
        body: JSON.stringify(requestString)
    };
    return fetch(`http://localhost:3000/user/update`, requestOptions)
        .then(response => response.json())
}

const loginUser = (requestString: any) => {
    return fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestString)
    })
};
const logoutUser = (requestString: any) => {
    return fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestString)
    })
};

const UserService = {
    getAllUsers, getUserById, createUser, deleteUser, updateUser, loginUser, logoutUser
};
export default UserService;
