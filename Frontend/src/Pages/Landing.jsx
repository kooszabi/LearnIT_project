import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGitHubLogin } from "@react-oauth/github";

export function Landing() {

    const navigate = useNavigate();
    const handleLoginSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/google",
                {
                    token: credentialResponse.credential
                }
            )
            console.log(res.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    }

    const {initiateGitHubLogin}  =  useGitHubLogin({
        clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
        redirectUri: "http://localhost:5173/",
            onSuccess: async (response) => {
                try {
                    console.log('GitHub login successful!', response);
                    console.log('Authorization code: ', response.code);
                    const code = response.code;
                    const res = await axios.post("http://localhost:5000/api/auth/github",
                        {
                            code: code
                        });
                    console.log("Token sent to backend:",res.data);
                    navigate("/home");
                } catch (err) {
                    /* console.log('GitHub login failed: ', err.response?.data); */
                    console.error("Full Axios error:", err);
                    console.error("err.response:", err.response);
                    console.error("err.request:", err.request);
                    console.error("err.message:", err.message);
                } 
        },     
    });

    return (
        <>
            <p>Welcome to the Landing page!</p>
            <GoogleLogin 
                onSuccess={(credentialResponse) => {
                    console.log("credentialResponse: ",credentialResponse);
                    console.log("jwtToken: ", jwtDecode(credentialResponse.credential));
                    navigate("/home");
                    handleLoginSuccess(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
            <button onClick={initiateGitHubLogin}>Sign In with GitHub</button>
        </>
    
    )
}