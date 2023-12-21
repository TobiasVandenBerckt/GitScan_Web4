const getAllDirectors = () => {
    const token = sessionStorage.getItem("token");
    return fetch('http://localhost:3000/directors', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
}

const createDirector = (requestString: any) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(requestString)
    };
    return fetch('http://localhost:3000/director/add', requestOptions)
        .then(response => response.json());
};
const DirectorService = {
    getAllDirectors, createDirector
}
export default DirectorService;