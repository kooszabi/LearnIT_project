import { Link } from "react-router-dom";
import './BreadCrumbs.css';

export function BreadCrumbs(props) {
    const location = props.pathname;
    // const profilePicture = localStorage.getItem("profile_picture");

    if (location.startsWith("/learn-with-ai")) {
        return (
            <div className="breadcrumbs-container">
                <div className="breadcrumbs-div">
                    <Link to="/home">Home</Link>
                    <span> &gt; </span>
                    <Link to="/statistics">Statistics</Link>
                    <span> &gt; </span>
                    <span>Learn With AI</span>
                </div>
                <img className="breadcrumbs-profile-image" src={localStorage.getItem("profile_picture")} />
            </div>
        )
    }
    else if (location.startsWith("/statistics")) {
        return (
            <div className="breadcrumbs-container">
                <div className="breadcrumbs-div">
                    <Link to="/home">Home</Link>
                    <span> &gt; </span>
                    <span>Statistics</span>
                </div>
                <img className="breadcrumbs-profile-image" src={localStorage.getItem("profile_picture")} />
            </div>
        )
    }
    else if (location.startsWith("/python")) {
        return (
            <div className="breadcrumbs-container">
                <div className="breadcrumbs-div">
                    <Link to="/home">Home</Link>
                    <span> &gt; </span>
                    <span>Python</span>
                </div>
                <img className="breadcrumbs-profile-image" src={localStorage.getItem("profile_picture")} />
            </div>
        )
    }
    else if (location.startsWith("/home")) {
        return (
            <div className="breadcrumbs-container">
                <div className="breadcrumbs-div">
                    <span>Home</span>
                </div>
                <img className="breadcrumbs-profile-image" src={localStorage.getItem("profile_picture")} />
            </div>
        )
    }
}