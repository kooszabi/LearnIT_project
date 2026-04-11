import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useGitHubLogin } from "@react-oauth/github";
import "./Landing.css";
export function Landing() {

    useEffect(() => {
        const name = document.querySelector(".appear_title");
        const intro = document.querySelector(".intro_loader");

        setTimeout(() => {
            name.style.opacity='1'
            name.style.transform="translateY(0)"
        }, 300)

        setTimeout(() => {
            intro.style.top="-100%"
        }, 2000)
    }, []);


    const navigate = useNavigate();
    const loginWithGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
        try {
            console.log("Google login successful! ", credentialResponse);
            const res = await axios.post(
                "http://localhost:5000/api/auth/google",
                {
                    token: credentialResponse.access_token
                }
            );
            console.log("Token sent to backend: ", credentialResponse.access_token);
            console.log(res.data);
            if (res.data.user) {
                localStorage.setItem("email", res.data.user.email);
            }
            console.log("email: ", res.data.user?.email);
            navigate("/home");
        } catch (err) {
            console.log("err: ", err.response?.data);
        }
    },
    onError: () => {
        console.log("Google login failed!");
    }
    });

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
                    if (res.data.user) {
                        localStorage.setItem("email", res.data.user.email);
                    }
                    console.log("email: ", res.data.user?.email);
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


            <div className="page">
                <div className="main_content">
                    <div className="intro_loader">
                        <h1 className="appear_title">Welcome to LearnIT</h1>
                    </div>         
                </div>

                <div className="navbar">
                    <a className="navbar_text" onClick={() => scrollTo({top: 0, behavior: "smooth"})}>
                        <img className="navbar_logo" src="/images/icons8-code-64 (1).png"/>
                    </a>
                    <a className="navbar_text" onClick={() => document.getElementById("sign_up").scrollIntoView({behavior: "smooth"})}>Sign Up</a>
                    <a className="navbar_text" onClick={() => document.getElementById("about_us").scrollIntoView({behavior: "smooth"})}>About</a>
                    <a className="navbar_text" onClick={() => document.getElementById("content").scrollIntoView({behavior: "smooth"})}>Content</a>
                </div>

                <div className="hero-div">
                    <div className="hero-section">
                        <div className="hero-text">
                            <h2 className="hero-title">
                                Welcome to LearnIT
                            </h2>
                            <p className="hero-paragraph">
                                Learn the basics of Programming and start coding with confidence.
                            </p>
                            <button className="hero-button" onClick={() => document.getElementById("sign_up").scrollIntoView({behavior: "smooth"})}>
                                Join now
                            </button>
                        </div>
                        <div className="hero-image-section">
                            <div className="mac-dots">
                                <span className="red-dot"></span>
                                <span className="yellow-dot"></span>
                                <span className="green-dot"></span>
                            </div>
                            <img className="hero-image" src="/images/hero_image2.png"/>
                        </div>
                    </div>
                </div>

                <div className="only-logo">
                    <div className="hline-left">

                    </div>
                    <img className="logo" src="/images/icons8-code-100.png" />
                    <div className="hline-right" id="sign_up">

                    </div>
                </div>

                <div className="sign-up-interface">
                    <div className="sign-up-buttons-container">
                        <div className="sign-up-buttons">
                            <button className="google-sign-up-button" onClick={loginWithGoogle}>
                                Sign Up with Google
                                <img className="google-logo" src="/images/google_logo.png" />
                            </button>
                            <button className="github-sign-up-button" onClick={initiateGitHubLogin}>
                                Sign Up with GitHub
                                <img className="github-logo" src="/images/github_logo2.png" />
                            </button>
                        </div>
                        <div className="sign-up-text">
                            <h3 className="sign-up-title">Sign Up to Start Your Journey</h3>
                            <p className="sign-up-paragraph">Create your account for FREE</p>
                        </div>
                    </div>

                </div>


                <div className="body-1-container" id="about_us">
                    <div className="body-1-div">
                        <div className="body-1-text-block">
                            <h5 className="body-1-title">
                                Learn programming by solving real coding challenges
                            </h5>
                            <p className="body-1-paragraph">
                                Practice with interactive exercises, write code directly in the browser, and improve 
                                your skills step by step.
                            </p>
                        </div>
                        <div className="body-1-image-block">
                            <img className="body-1-image" src="/images/canva_laptop2.png" />
                        </div>
                    </div>
                </div>


                <div className="body-2-container">
                    <div className="body-2-div">
                        <div className="body-2-image-block">
                            <img className="body-2-image" src="/images/canva_laptop.png" />
                        </div>
                        <div className="body-2-text-block">
                            <h5 className="body-2-title">
                                Build real problem-solving skills
                            </h5>
                            <p className="body-2-paragraph">
                                Work through structured lessons and coding exercises designed 
                                to help you think like a developer.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="carousel-container" id="content">
                    <div className="carousel-title-container">
                        <div className="carousel-hline-left"></div>
                            <h3 className="carousel-title">
                                Content
                            </h3>
                        <div className="carousel-hline-right"></div>
                    </div>

                    <div className="carousel-track">
                        <div className="group">
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/variable-symbol-in-window.png" />
                                <h3 className="card-title">
                                    Variables
                                </h3>
                                <p className="card-paragraph">
                                    Learn how to store and use data with variables.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/printing.png" />
                                <h3 className="card-title">
                                    Print
                                </h3>
                                <p className="card-paragraph">
                                    Use print() to show results in your program.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/filter.png" />
                                <h3 className="card-title">
                                    Conditions
                                </h3>
                                <p className="card-paragraph">
                                    Use if, elif, and else to control logic.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/loop.png" />
                                <h3 className="card-title">
                                    Loops
                                </h3>
                                <p className="card-paragraph">
                                    Use for and while to repeat actions.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/iteration.png" />
                                <h3 className="card-title">
                                    Methods
                                </h3>
                                <p className="card-paragraph">
                                    Use methods to work with data.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/error.png" />
                                <h3 className="card-title">
                                    Error handling
                                </h3>
                                <p className="card-paragraph">
                                    Use try and except to handle errors safely.
                                </p>
                            </div>
                        </div>
                        <div className="group">
                        {/* elozo group masolata az animacio szempontjabol */}
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/variable-symbol-in-window.png" />
                                <h3 className="card-title">
                                    Variables
                                </h3>
                                <p className="card-paragraph">
                                    Learn how to store and use data with variables.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/printing.png" />
                                <h3 className="card-title">
                                    Print
                                </h3>
                                <p className="card-paragraph">
                                    Use print() to show results in your program.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/filter.png" />
                                <h3 className="card-title">
                                    Conditions
                                </h3>
                                <p className="card-paragraph">
                                    Use if, elif, and else to control logic.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/loop.png" />
                                <h3 className="card-title">
                                    Loops
                                </h3>
                                <p className="card-paragraph">
                                    Use for and while to repeat actions.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/iteration.png" />
                                <h3 className="card-title">
                                    Methods
                                </h3>
                                <p className="card-paragraph">
                                    Use methods to work with data.
                                </p>
                            </div>
                            <div className="card">
                                <img className="card-image" src="/images/card_icons/error.png" />
                                <h3 className="card-title">
                                    Error handling
                                </h3>
                                <p className="card-paragraph">
                                    Use try and except to handle errors safely.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            
        </>
    
    )
}