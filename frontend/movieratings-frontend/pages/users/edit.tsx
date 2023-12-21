import Header from "../../components/Header";
import { useRouter } from "next/router";
import { StatusMessage, User } from "../../types";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import EditForm from './updateUser';
import { get } from "http";

const UpdatePage: React.FC = () => {
    const [user, setUser] = useState<User>();
    const router = useRouter();
    const { id } = router.query;

    const getUser = async () => {
        try{
            const response = await UserService.getUserById(Number(id));
            const user = await response.json();
            setUser(user);
        } catch (error){
            console.error('Kan user niet ophalen', error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleUpdateUser = async (user: User) => {
        try {
            const response = await UserService.updateUser(user.id, user.email, user.name, user.firstName, user.password);
            const newUser = await response.json();
            setUser(newUser);
        } catch (error) {
            console.error("Kan user niet updaten", error);
        }
    };

    return (
        <div>
        <Header />
        {user && <EditForm user={user} onSubmit={handleUpdateUser}/>}
        </div>
        );
}
export default UpdatePage;
