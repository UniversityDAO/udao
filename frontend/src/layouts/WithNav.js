import Navbar from '../components/Navbar/navbar';
import { Outlet } from 'react-router';

export default () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}