import AdminNavbar from "../components/AdminNavbar";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
    const {user, token} = useStateContext();

    if (!token) { // Change to false later
        return <Navigate to='./Landing' />;
    }

    if (user.type === 'hobbyist') {
        return <Navigate to='./Home' />;
    }

    return (
        <div>
            <AdminNavbar />
            <div className="admin-dashboard">
                <span className="admin-header">ADMIN DASHBOARD</span>
                <div className="admin-container">
                    <div className="left">
                        <Link to="/Users">Users</Link>
                        <Link to="/Communities">Communities</Link>

                    </div>
                    <div className="right">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AdminLayout;