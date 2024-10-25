import React from 'react';
import Navbar from './Navbar';

const Profile = () => {
    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>User Profile</h2>
                <p>This is where user profile details would be displayed.</p>
            </div>
        </div>
    );
};

export default Profile;
