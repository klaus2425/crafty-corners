import { Outlet } from "react-router-dom"

const GuestLayout = () => {
    return (
        <div>
            <div>For Guest Users Only</div>
            <Outlet />
        </div>
    )
}

export default GuestLayout;