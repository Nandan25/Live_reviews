import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { routes } from '../constants';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmpty(name) && !isEmpty(email) && !isEmpty(password)) {
            console.log(routes.register);
            axios.post(routes.register, { name, email, password }).then(function (response) {
                console.log(response);
                navigate('/');
            }).catch(function (error) {
                console.log(error);
            });
        }

    };

    useEffect(() => { setName(''); setEmail(''); setPassword(''); }, []);

    return (<>
        <h1>Register</h1>
        <br /><br />
        <input type="text" name="name" value={name} placeholder="Enter name" onChange={(e) => { e.preventDefault(); setName(e.target.value); }} required />
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
        <input type="submit" value="Register" onClick={(e) => handleSubmit(e)} />
    </>);

};

export default Register;