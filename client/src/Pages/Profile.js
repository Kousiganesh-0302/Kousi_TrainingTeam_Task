// import React from 'react';

// const Profile = () => {
//     return (
//         <div style={{ textAlign: 'center', padding: '50px' }}>
//             <h1 style={{ fontSize: '2.5em', color: '#333' }}>Your Profile</h1>
//             <p style={{ fontSize: '1.2em', color: '#666' }}>Manage your personal information here.</p>
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd'; // Ant Design components
import authService from '../API/authService';

const {Paragraph, Text } = Typography;

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await authService.axiosInstance.get('/users/me');
                setProfile(res.data.profile);
            } catch (err) {
                console.error('Profile fetch failed:', err);
                alert('Failed to load profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    return (
        <Card
            style={{ maxWidth: '400px', margin: '30px auto', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
            {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Spin size="large" />
                    <Paragraph type="secondary" style={{ marginTop: '10px' }}>Loading profile...</Paragraph>
                </div>
            ) : !profile ? (
                <Paragraph type="danger" style={{ textAlign: 'center', padding: '20px' }}>
                    No profile data available.
                </Paragraph>
            ) : (
                <>
                    <Paragraph><Text strong>ID:</Text> {profile.loggerId}</Paragraph>
                    <Paragraph><Text strong>Username:</Text> {profile.loggername}</Paragraph>
                    <Paragraph><Text strong>Email:</Text> {profile.email}</Paragraph>
                </>
            )}
        </Card>
    );
};

export default Profile;
