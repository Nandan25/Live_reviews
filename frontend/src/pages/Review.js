import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { routes } from "../constants";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Review = ({ type }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = () => {
        console.log(title, content);
        axios.post(routes.addReview, { title, content }).then(function (response) {
            console.log(response);
            navigate('/dashboard');
        }).catch(function (error) {
            console.log(error);
        });
    };

    const fetchData = () => {
        console.log(title, content);
        axios.get(`${routes.fetchReview}${id}`).then(function (response) {
            console.log(response);
            setTitle(response.data.reviews.title);
            setContent(response.data.reviews.content);

        }).catch(function (error) {
            console.log(error);
        });
    };

    const resetData = () => {
        setTitle(''); setContent('');
    };

    useEffect(() => { resetData(); }, []);

    useEffect(() => { fetchData(); }, [id]);

    return (<>
        <h1>{`${type} Review`}</h1>
        <br /><br />
        <input type="text" name="Title" value={title} placeholder="Enter title" onChange={(e) => { e.preventDefault(); setTitle(e.target.value); }} required />
        <br /><br />
        <input
            type="textarea"
            name="content"
            value={content}
            onChange={(e) => { e.preventDefault(); setContent(e.target.value); }}
            placeholder="Enter content"
            required
        />
        <br /><br />
        <input type="submit" value="Submit" onClick={() => handleSubmit()} />
        <button onClick={(e) => {
            e.preventDefault();
            type === "Edit" ? navigate("/dashboard") : resetData();
        }}>{type === "Edit" ? 'Cancel' : 'Clear'}</button>
    </>);

};

export default Review;