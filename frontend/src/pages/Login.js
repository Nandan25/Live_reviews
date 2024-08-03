import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { isEmpty } from 'lodash';
import { routes } from '../constants';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();


    const handleSubmit = () => {
        console.log(email, password);
        if (!isEmpty(email) && !isEmpty(password)) {
            axios.post(routes.login, { email, password }).then(function (response) {
                console.log(response);
                navigate('/dashboard');
            }).catch(function (error) {
                console.log(error);
            });
        }
    };

    useEffect(() => { setEmail(''); setPassword(''); }, []);

    return (<>
        <h1>Login</h1>
        <br /><br />
        <input type="text" name="email" value={email} placeholder="Enter email" onChange={(e) => { e.preventDefault(); setEmail(e.target.value); }} required />
        <br /><br />
        <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => { e.preventDefault(); setPassword(e.target.value); }}
            placeholder="Enter password"
            required
        />
        <br /><br />
        <a onClick={() => { navigate('/register'); }}>{"Not a user? Register here"}</a><br />
        <input type="submit" value="Login" onClick={() => handleSubmit()} />
    </>);

};

export default Login;