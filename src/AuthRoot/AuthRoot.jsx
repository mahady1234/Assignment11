import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';

const AuthRoot = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default AuthRoot;