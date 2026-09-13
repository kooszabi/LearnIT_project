import { Link, useLocation } from "react-router-dom";

export function BreadCrumbs() {
    const location = useLocation();
    console.log(location);

    if (location.pathname.startsWith("/learn-with-ai")) {
        return (
            <div className="breadcrumbs-div">
                <Link to="/home">Home</Link>
                <span> &gt; </span>
                <Link to="/statistics">Statistics</Link>
                <span> &gt; </span>
                <span>Learn With AI</span>
            </div>
        )
    }
    else if (location.pathname.startsWith("/statistics")) {
        return (
            <div className="breadcrumbs-div">
                <Link to="/home">Home</Link>
                <span> &gt; </span>
                <span>Statistics</span>
            </div>
        )
    }
    else if (location.pathname.startsWith("/python")) {
        return (
            <div className="breadcrumbs-div">
                <Link to="/home">Home</Link>
                <span> &gt; </span>
                <span>Python</span>
            </div>
        )
    }
}