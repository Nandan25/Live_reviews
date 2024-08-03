import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { api_server, routes } from "../constants";
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import io from "socket.io-client";

const Reviews = () => {
    const [list, setList] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const socket = io(api_server);

    const navigate = useNavigate();

    const handleDelete = (id) => {
        axios.delete(`${routes.deleteReview}${id}`).then(function (response) {
            console.log(response);

            if (socket.connected)

                socket.timeout(5000).emit('DELETE_REVIEW', id, () => {
                    console.log("Deleted");
                });

        }).catch(function (error) {
            console.log(error);
        });
    };

    const fetchData = () => {
        axios.get(routes.listReview).then(function (response) {
            console.log(response.data.reviews);
            setList(response.data.reviews);

        }).catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
        socket.connect();
        socket.on("connect", () => { setIsConnected(true); });
        socket.off("disconnect", () => { setIsConnected(false); });

        console.log(socket);
        fetchData();

    }, []);

    useEffect(() => {
        if (isConnected) {
            socket.on('NEW_REVIEW', fetchData());

        }

    }, [isConnected]);

    return (<>
        <h1>Reviews</h1> &nbsp;<button onClick={() => { navigate('/add-review'); }}>Add Review</button>
        <br /><br />
        {!isEmpty(list) ? <table>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Date-Time</th>
                <th></th>
                <th></th>
            </tr>

            {
                list.map((review, i) => {
                    return <>
                        <tr>
                            <td>{i}</td>
                            <td>{review.title}</td>
                            <td>{review.content}</td>
                            <td>{review.createdAt}</td>
                            <td><button onClick={() => { navigate(`/modify-review/${review._id}`); }}>Edit</button></td>
                            <td><button onClick={() => { handleDelete(review._id); }}>Delete</button></td>
                        </tr>
                    </>;
                })
            }

        </table> : <div>no records</div>}
    </>);

};

export default Reviews;