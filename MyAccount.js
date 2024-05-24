import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import './MyAccount.css';

const UPLOAD_URL = 'http://localhost:8080/api/users/profile/image';
const DELETE_URL = 'http://localhost:8080/api/users/profile/image/delete';
const PROFILE_URL = 'http://localhost:8080/api/users/profile';

const MyAccount = () => {
    const { auth, setAuth } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState({ ...auth });
    const [uploadStatus, setUploadStatus] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedDetails({
            ...editedDetails,
            [name]: value
        });
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(PROFILE_URL, editedDetails, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                },
            });

            if (response.data) {
                setAuth(response.data);
                setIsEditing(false);
                setUploadStatus('Details updated successfully!');
            } else {
                setUploadStatus('Failed to update details.');
            }
        } catch (err) {
            console.error('Save error:', err);
            setUploadStatus('Failed to update details.');
        }
    };

    const handleUploadClick = () => {
        document.getElementById('file-input').click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const response = await axios.post(UPLOAD_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    profileImage: response.data.profileImage,
                }));
                setUploadStatus('Image uploaded successfully!');
            } else {
                setUploadStatus('Failed to upload image.');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setUploadStatus('Failed to upload image.');
        }
    };

    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete(DELETE_URL, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                },
            });

            if (response.data.success) {
                setUploadStatus('Image deleted successfully!');
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    profileImage: null,
                }));
            } else {
                setUploadStatus('Failed to delete image.');
            }
        } catch (err) {
            console.error('Delete error:', err);
            setUploadStatus('Failed to delete image.');
        }
    };

    return (
        <div className="my-account-container">
            <div className="user-icon-container">
                <img
                    src={auth.profileImage || "/avatar.jpg"}
                    alt="User Icon"
                    className="user-icon"
                    onError={(e) => { e.target.onerror = null; e.target.src = "/avatar.jpg"; }}
                />
            </div>
            <div className="icon-options">
                <button className="icon-button" onClick={handleUploadClick}>
                    Upload Picture
                </button>
                <button className="icon-button" onClick={handleDeleteClick}>
                    Delete Picture
                </button>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <p>{uploadStatus}</p>
            </div>
            <div className="account-details">
                <div className="account-header">
                    <h2>Account Details</h2>
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit
                    </button>
                </div>
                <div className="detail-item">
                    <label>Username:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="fullName"
                            value={editedDetails.fullName}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{auth.fullName}</span>
                    )}
                </div>
                <div className="detail-item">
                    <label>Email:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={editedDetails.email}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{auth.email}</span>
                    )}
                </div>
                <div className="detail-item">
                    <label>Password:</label>
                    <span>********</span>
                    <Link to="/reset-password" className="change-password-link">
                        Change Password?
                    </Link>
                </div>
                {isEditing && (
                    <button className="save-button" onClick={handleSaveClick}>
                        Save
                    </button>
                )}
            </div>
            <div className="my-plan">
                <div className="plan-header">
                    <h2>My Plan</h2>
                </div>
                <div className="plan-detail">
                    <label>Plan:</label>
                    <span>{auth.planName}</span>
                    <Link to="/pricing" className="pricing-link">
                        Upgrade Plan
                    </Link>
                </div>
                <div className="plan-detail">
                    <label>Status:</label>
                    <span>{auth.planStatus}</span>
                </div>
                <div className="plan-detail">
                    <label>Expiration:</label>
                    <span>{auth.planExpiration}</span>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
