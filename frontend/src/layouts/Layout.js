import Navbar from '../components/Navbar/navbar';
import { Outlet } from 'react-router';

// TODO: extract common layout styling in dashboard, proposals, grant components into here, forming
// a common layout amongst all those components and reducing code duplication
function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default Layout;
