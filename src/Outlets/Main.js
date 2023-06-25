import React from 'react';
import { Link,Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <nav className='text-center my-5'>
                <Link className='text-decoration-none bg-primary text-white px-3 py-2 m-2 rounded' to={'/login'}>Login</Link>
                <Link className='text-decoration-none bg-primary text-white px-3 py-2 m-2 rounded' to={'/signup'}>Register</Link>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;