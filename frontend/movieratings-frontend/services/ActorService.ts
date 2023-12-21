const getAllActors = () => {
    const token = sessionStorage.getItem("token");
    return fetch('http://localhost:3000/actors', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
}

const createActor = (requestString: any) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(requestString)
    };
    return fetch('http://localhost:3000/actor/add', requestOptions)
        .then(response => response.json());
};
const ActorService = {
    getAllActors, createActor
};
export default ActorService;

    