import { googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { Card } from "./Card";

export function Home() {

    const navigate = useNavigate();

    function handleLogout() {
        googleLogout();
        navigate("/");
    }

    return (
        <>
        <p>Welcome to the Home page!</p>
        <button onClick={handleLogout}>Log out</button> 

        <div>
            <Card lessonId={1} />
        </div>
        </>
    
    )
}
