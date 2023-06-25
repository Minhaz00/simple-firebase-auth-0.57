import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';
import { app } from '../../firebase/firebase.init';

const auth = getAuth(app);

const Login = () => {

    const [userEmail, setUserEmail] = useState('');

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.error('error ', error);
            })   
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleResetPassword = () => {
        if (!userEmail) {
            alert("Please enter your email to reset password");
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert("Please check your email.");
            })
            .catch(error => {
                console.error('error ', error);
            })
    }

    return (
        <div className="w-50 m-auto">
        <h4 className="text-primary">Please Login</h4>
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onBlur={handleEmailBlur} type="email" name="email" placeholder="Enter email" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter Password" required/>
                </Form.Group>
                <p><small>Forget password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p> 
            <Button variant="primary" type="submit">
            Login
            </Button>
            <p><small>New to this site? Please <Link to = {'/signup'}>Register</Link></small></p>    
            </Form>
        </div>
    );
};

export default Login;