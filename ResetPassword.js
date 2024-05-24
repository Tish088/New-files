import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './ResetPassword.css';

const ResetPassword = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }
        // Proceed to the actual change password page
        navigate('/change-password', { state: { currentPassword, newPassword } });
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <div className="password-field">
                <label>Current Password:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className="password-field">
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className="password-field">
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button onClick={handleUpdatePassword}>Update Password</button>
        </div>
    );
};

export default ResetPassword;
