import React, { useState } from 'react';

import './ChangePassword.css';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            return;
        }

        setMessage('Password changed successfully!');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="password-change-container">
            <div className="password-change">
                <h1>Change Password</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Change Password</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ChangePassword;
