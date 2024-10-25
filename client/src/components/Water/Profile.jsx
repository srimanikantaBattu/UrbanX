import React from 'react';
import Navbar from './Navbar';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa';

const Profile = () => {
    // Retrieve email from local storage
    const emailId = localStorage.getItem('emailId') || "viveklakum2005@gmail.com";
    const name = "Vivek Lakum";  // You can replace this with the actual name from localStorage or API call
    const phoneNumber = ""; // Placeholder for phone number, replace with actual data
    const address = "NA";  // Replace this with the user's actual address if available

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex justify-center items-center py-12">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col items-center">
                        <FaUserCircle className="text-gray-400 text-6xl mb-4" />
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <hr className="my-4 w-full border-gray-300" />
                        <div className="text-left w-full">
                            <div className="flex items-center mb-4">
                                <FaEnvelope className="text-gray-500 mr-3" />
                                <p className="text-gray-700">{emailId}</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <FaPhone className="text-gray-500 mr-3" />
                                <p className="text-gray-700">{phoneNumber || "NA"}</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <FaMapMarkerAlt className="text-gray-500 mr-3" />
                                <p className="text-gray-700">{address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
