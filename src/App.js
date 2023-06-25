import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Main from './Outlets/Main';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <SignUp></SignUp>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])

function App() {
    

    return (
        <div className="">
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}

export default App;
