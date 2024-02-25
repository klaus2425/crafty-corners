import AdminNavbar from "../components/AdminNavbar";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
    const { user, token } = useStateContext();


    if (user.type === 'hobbyist' || user.type === 'mentor') {
        return <Navigate to='/' />
    }

    if (!token) {
        return <Navigate to='./Landing' />;
    }
    const [active, setActive] = useState("1");

    const handleClick = (ev) => {
        setActive(ev.target.id);
    }


    return (
        <div>
            <AdminNavbar />
            <div className="admin-dashboard">
                <span className="admin-header">ADMIN DASHBOARD</span>
                <div className="admin-container">
                    <div className="top">
                        <Link id="1" className={active === "1" ? "active" : undefined} to="/Users" onClick={handleClick}>Users</Link>
                        <Link id="2" className={active === "2" ? "active" : undefined} to="/admin-communities" onClick={handleClick}>Communities</Link>
                        <Link id="3" className={active === "3" ? "active" : undefined} to="/admin-articles" onClick={handleClick}>Articles</Link>
                        <Link id="4" className={active === "4" ? "active" : undefined} to="/admin-videos" onClick={handleClick}>Videos</Link>
                        <Link id="5" className={active === "5" ? "active" : undefined} to="/admin-videos" onClick={handleClick}>Posts</Link>
                        <Link id="6" className={active === "6" ? "active" : undefined} to="/mentor-applicants" onClick={handleClick}>Mentors</Link>

                    </div>
                    <div className="bottom">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AdminLayout;