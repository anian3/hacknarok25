import React from 'react';

import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Viking App</h1>
            <p>This is the home page. Explore our features and enjoy your stay!</p>
            <button
                onClick={() => navigate('/forum')}
                style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                }}
            >
            Go to Forum
            </button>
        </div>
    );
};

export default Home;