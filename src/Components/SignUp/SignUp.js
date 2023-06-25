import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';
import {
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { app } from "../../firebase/firebase.init";
import { useState } from "react";
import "./SignUp.css";
const auth = getAuth(app);

const SignUp = () => {
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const [user, setUser] = useState({});
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
    const user = result.user;
    setUser(user);
    })
    .catch((error) => {
    console.error("error: ", error);
    });
    };

    const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then((result) => {
    const user = result.user;
    setUser(user);
    })
    .catch((error) => {
    console.error("error: ", error);
    });
    };

    const handleFacebookSignIn = () => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                const user = result.user;
                setUser(user);
                console.log(user);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleSignOut = () => {
    signOut(auth)
    .then(() => {
    setUser({});
    })
    .catch((error) => {
    console.error("An error occured");
    });
    };

    const handleRegister = event => {
        event.preventDefault();
        setSuccess(false);

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;

        if (password.length < 6) {
            setPasswordError('Password should be at least of ^ characters.');
            return;
        }          
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Password should contain at least two uppercase letters.');
            return;
        }
        if (!/(?=.*[!#$%&?@"])/.test(password)) {
            setPasswordError('Password should contain at least one special character.');
            return;
        }
        if (!/(?=.*\d)/) {
            setPasswordError('Password should contain at least one digit.');
            return;
        }
        setPasswordError('');
            
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setUser(user); 
                user.displayName = name;
                console.log(user);
                setSuccess(true);
                event.target.reset();
                verifyEmail();
            })
            .catch(error => {
                console.error("error ", error);
                setPasswordError(error.message);
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(()=> {
                alert("Please check your email and verify.");
            })
    }

    return (
    <div className="w-50 m-auto">
        <h4 className="text-primary">Please Sign Up</h4>
        <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter username" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter Password" required/>
                </Form.Group>
                <p className="text-danger"><small>{passwordError}</small></p>
                {success && <p className="text-success"><small>Successfullly registered!</small></p>}
            <Button variant="primary" type="submit">
            Register
            </Button>
            <p><small>Already have an account? Please <Link to = {'/login'}>Login</Link></small></p>
        </Form>

        <div className="googleAndGithub">
            {user.uid ? (
                <button onClick={handleSignOut}>Sign Out</button>
                ) : (
                <>
                <button
                    className="border-0 rounded bg-primary text-white px-3 py-2 mt-2"
                    onClick={handleGoogleSignIn}
                >
                    Google Sign In
                </button>
                <button
                    className="border-0 rounded bg-primary text-white px-3 py-2 m-2"
                    onClick={handleGithubSignIn}
                >
                    Gitub Sign In
                </button>
                <button
                    className="border-0 rounded bg-primary text-white px-3 py-2 m-2"
                    onClick={handleFacebookSignIn}
                >
                    Facebook Sign In
                </button>
                </>
            )}
            {user.uid && (
                <div>
                <h2>Name: {user.displayName}</h2>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
                </div>
            )}
        </div>
    </div>
    );
};

export default SignUp;
