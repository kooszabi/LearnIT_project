import { googleLogout } from "@react-oauth/google"
import { useNavigate, Outlet } from "react-router-dom"
import './Layout.css'

export function Layout() {

    const navigate = useNavigate();

    function handleLogout() {
        googleLogout();
        navigate("/");
    }

    function hideNavbar() {
        const iconsNavbar = document.querySelector(".icons-navbar");
        iconsNavbar.style.display = "flex";
        const extendedNavbar = document.querySelector(".navbar-container");
        extendedNavbar.style.display = "none";
    }
    function showNavbar() {
        const extendedNavbar = document.querySelector(".navbar-container");
        extendedNavbar.style.display = "flex";
        const iconsNavbar = document.querySelector(".icons-navbar");
        iconsNavbar.style.display = "none";
    }

    return (
        <>
            <div className="home-page">
                <div className="navbar-container">
                    <p><img src="/images/home_icons/icons8-code-64 (2).png"/>LearnIT</p>
                    <div className="divider"></div>
                    <ul>
                        <li onClick={() => hideNavbar()}><a><img src="/images/home_icons/icons8-left-arrow-50.png"/></a></li>
                        <li><a href="/home#/home"><img src="/images/home_icons/icons8-home-48.png"/>Home</a></li>
                        <li><a href="/home#/python"><img src="/images/home_icons/icons8-python-96.png"/>Python</a></li>
                        <li><a><img src="/images/home_icons/icons8-c-sharp-logo-2-96.png"/>C#</a></li>
                        <li><a><img src="/images/home_icons/icons8-java-96.png"/>Java</a></li>
                        <li><a>...</a></li>
                        <li onClick={handleLogout}><a><img src="/images/home_icons/icons8-power-off-button-100.png"/>Log Out</a></li>
                    </ul>
                </div>
                <div className="icons-navbar">
                    <ul>
                        <li onClick={() => showNavbar()}><a><img src="/images/home_icons/icons8-applet-48.png"/></a></li>
                        <li title="Home"><a href="/home#/home"><img src="/images/home_icons/icons8-home-48.png"/></a></li>
                        <li title="Python"><a href="/home#/python"><img src="/images/home_icons/icons8-python-96.png"/></a></li>
                        <li title="C#"><a><img src="/images/home_icons/icons8-c-sharp-logo-2-96.png"/></a></li>
                        <li title="Java"><a><img src="/images/home_icons/icons8-java-96.png"/></a></li>
                        <li title=""><a>...</a></li>
                        <li onClick={handleLogout}><a><img src="/images/home_icons/icons8-power-off-button-100.png"/></a></li>
                    </ul>
                </div>

                <Outlet />
            </div>
        </>
    )
}