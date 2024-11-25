import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        API.get('/')
            .then(response => setMessage(response.data))
            .catch(err => console.error(err));
    }, []);

    return <h1>{message}</h1>;
};

export default Home;


