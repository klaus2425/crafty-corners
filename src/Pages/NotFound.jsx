import { Suspense } from "react";
import Loading from "../components/utils/Loading";

const NotFound = () => {
    return (
        <Suspense fallback={<Loading />} >
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '3rem',
                backgroundColor: '#D8DCE3',
                color: '#696969',
                fontFamily: 'Helvetica'
            }}>
                404 - Page Not Found
            </div>
        </Suspense>

    )
}

export default NotFound;