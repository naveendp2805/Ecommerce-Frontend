import { useEffect, useState } from "react";
import { deleteProfileImage, getProfile, updateProfile, uploadProfileImage } from "../services/userProfileService";


function UserProfile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

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

    const handleDeleteImage = async () => {
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
        <div>

            <h1>My Profile</h1>

            {profile?.profileImageUrl && (<img src={profile.profileImageUrl} alt="Profile" width="150" /> )}

            <br />

            <input type="file" onChange={handleImageUpload} />

            <button onClick={handleDeleteImage} >
                Delete Image
            </button>

            <hr />

            <input
                name="name"
                value={profile.name || ""}
                onChange={handleChange}
                placeholder="Name"
            />

            <input
                name="phoneNumber"
                value={
                    profile.phoneNumber || ""
                }
                onChange={handleChange}
                placeholder="Phone Number"
            />

            <input
                type="date"
                name="dateOfBirth"
                value={
                    profile.dateOfBirth || ""
                }
                onChange={handleChange}
            />

            <select
                name="gender"
                value={
                    profile.gender || ""
                }
                onChange={handleChange}
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

                <option value="OTHER" >
                    OTHERS
                </option>
            </select>

            <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}
                placeholder="Bio"
            />

            <button
                onClick={handleUpdate}
            >
                Save Profile
            </button>

        </div>
    );
}

export default UserProfile;