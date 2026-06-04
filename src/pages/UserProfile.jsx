import { useEffect, useState } from "react";
import { deleteProfileImage, getProfile, updateProfile, uploadProfileImage } from "../services/userProfileService";
import PageWrapper from "../layouts/PageWrapper";
import "./UserProfile.css";
import {FaUser, FaPhone, FaCalendarAlt, FaVenusMars, FaFileAlt, FaCamera, FaEllipsisV} from "react-icons/fa";

function UserProfile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showImageMenu, setShowImageMenu] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();

            setProfile(data);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        try {
            const updatedProfile = await updateProfile({
                name: profile.name,
                phoneNumber: profile.phoneNumber,
                dateOfBirth: profile.dateOfBirth,
                gender: profile.gender,
                bio: profile.bio
            });

            setProfile(updatedProfile);

            setIsEditing(false);

            alert("Profile updated successfully");
        } catch(error) {
            console.error(error);
        }
    };

    const handleImageUpload = async (e) => {
        
        const file = e.target.files[0];

        if(!file) return;

        try {
            const updatedProfile = await uploadProfileImage(file);

            setProfile(updatedProfile);
        } catch(error) {
            console.error(error);
        }
    };

    const handleImageDelete = async () => {
        try {
            await deleteProfileImage();

            await loadProfile();
        } catch(error) {
            console.error(error);
        }
    };

    if(loading) return <h2>Loading...</h2>;

    if(!profile) return <h2>Profile not found</h2>;

    return (
        <PageWrapper title="My Profile" >
            
            <div className="profile-container">

                <div className="profile-header">

                    <div className="profile-image-wrapper">

                        <img
                            src={
                                profile?.profileImageUrl ||
                                "https://via.placeholder.com/180"
                            }
                            alt="Profile"
                            className="profile-image"
                        />

                        {isEditing && (
                            <button
                                className="image-menu-btn"
                                onClick={() => setShowImageMenu(!showImageMenu)}
                            >
                                <FaCamera />
                            </button>
                        )}

                        {showImageMenu && (
                            <div className="image-menu">

                                <label
                                    htmlFor="profile-upload"
                                    className="menu-item"
                                >
                                    Edit Profile Image
                                </label>

                                <button
                                    className="menu-item remove-btn"
                                    onClick={handleImageDelete}
                                >
                                    Remove Profile Image
                                </button>

                            </div>
                        )}

                        <input
                            id="profile-upload"
                            type="file"
                            onChange={handleImageUpload}
                            hidden
                        />

                    </div>

                    <h2 className="profile-name">
                        {profile?.name}
                    </h2>

                    <p className="profile-email">
                        {profile?.email}
                    </p>

                    <div className="profile-actions">

                        <button
                            className="edit-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>

                    </div>

                </div>

                <div className="section">

                    <h3>
                        Personal Information
                    </h3>

                    <label>
                        <FaUser />
                        {" "}Name
                    </label>

                    <input
                        name="name"
                        value={profile.name || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                    <label>
                        <FaPhone />
                        {" "}Phone Number
                    </label>

                    <input
                        name="phoneNumber"
                        value={profile.phoneNumber || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                </div>

                <div className="section">

                    <h3>
                        Additional Information
                    </h3>

                    <label>
                        <FaCalendarAlt />
                        {" "}Date Of Birth
                    </label>

                    <input
                        type="date"
                        name="dateOfBirth"
                        value={profile.dateOfBirth || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                    <label>
                        <FaVenusMars />
                        {" "}Gender
                    </label>

                    <select
                        name="gender"
                        value={profile.gender || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    >
                        <option value="">
                            Select Gender
                        </option>

                        <option value="MALE">
                            MALE
                        </option>

                        <option value="FEMALE">
                            FEMALE
                        </option>

                        <option value="OTHER">
                            OTHER
                        </option>
                    </select>

                    <label>
                        <FaFileAlt />
                        {" "}Bio
                    </label>

                    <textarea
                        name="bio"
                        value={profile.bio || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                </div>

                {isEditing && (
                    <button
                        className="save-btn"
                        onClick={handleUpdate}
                    >
                        Save Changes
                    </button>
                )}

            </div>

        </PageWrapper>
    );
}

export default UserProfile;