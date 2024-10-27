import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAddCall } from "react-icons/md";
import { useForm } from "react-hook-form";

function HospitalPage() {
  const { register, handleSubmit } = useForm();

  const username = localStorage.getItem("username");
  const emailId = localStorage.getItem("emailId");
  const hospitalString = localStorage.getItem("hospital");
  const navigate = useNavigate();
  const hospital = JSON.parse(hospitalString);
  const role = localStorage.getItem("role");

  const [hospitalExists, setHospitalExists] = useState(false);
  const [waitingUsers, setWaitingUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [connectedToHospital, setConnectedToHospital] = useState(false);

  useEffect(() => {
    if (!hospital) window.location.href = "/health";
    if (!username) window.location.href = "/login";

    const checkHospital = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user-api/check-hospital/${username}/${hospital._id}`
        );
        setHospitalExists(response.data);
      } catch (error) {
        console.error("Error checking hospital:", error);
        setHospitalExists(false);
      }
    };
    checkHospital();
    fetchConnectedUsers();
    console.log(connectedUsers);
  }, []);

  const fetchConnectedUsers = async () => {
    console.log("hospital",hospital._id);
    try {
      const response = await axios.get(
        `http://localhost:4000/hospital-api/connected-users/${hospital._id}`
      );
      console.log(response.data);
      setConnectedUsers(response.data);
    } catch (error) {
      console.error("Error fetching connected users:", error);
    }
  };

  const connect = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/hospital-api/add-to-connected-list/${username}/${emailId}/${hospital._id}`
      );
      if (response.data.message === "Added to connected list") {
        setConnectedToHospital(true);
        localStorage.setItem(`connected_${hospital._id}`, "true");
      }
    } catch (error) {
      console.error("Error connecting user:", error);
    }
  };

  return (
    <div className="px-4 py-8 bg-gray-900 min-h-screen">
      <div className="text-center py-8 px-4 w-full md:w-3/5 mx-auto border border-gray-700 rounded-lg bg-gray-800 shadow-lg">
        <h1 className="text-4xl text-teal-400 font-bold">{hospital.name}</h1>
        <p className="text-lg text-gray-300 mt-2">{hospital.address}</p>
        <div className="flex justify-center items-center mt-4">
          <p className="text-xl text-gray-300">{hospital.contactNumber}</p>
          <MdAddCall size={24} className="text-teal-400 ml-2" />
        </div>
      </div>

      {role === "admin" ? (
        <div className="mt-12">
          <div className="w-full md:w-3/5 mx-auto">
            {connectedUsers.length > 0 ? (
              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-teal-400 mb-4 py-4">
                  Connected Users
                </h2>
                <table className="table-auto w-full text-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-teal-600">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Meeting Link</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700">
                    {connectedUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="px-4 py-3 text-center">{user.username}</td>
                        <td className="px-4 py-3 text-center">{user.emailId}</td>
                        <td className="px-4 py-3 text-center">
  <button onClick={() => window.location.href = user.meetingLink}>
    Join Meeting
  </button>
</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h2 className="text-center text-xl text-gray-400 mt-10">
                No Connected Users
              </h2>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-16 text-center">
          {hospitalExists ? (
            <div className="">
            <h4 className="text-2xl font-semibold text-teal-400">
              Already connected to {hospital.name}
              </h4>
              <button className="px-8 mt-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition duration-200" onClick={() => navigate("/video", {state:{hospital}})}>Start Meeting +</button>
              </div>
            
          ) : (
            <div className="mt-8">
              {connectedToHospital ? (
                <div className="">
                <h4 className="text-2xl font-semibold text-teal-400">
                   connected to {hospital.name}
                  </h4>
                  <button className="px-8 mt-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition duration-200" onClick={() => navigate("/video", {state:{hospital}})}>Start Meeting +</button>
                  </div>
              ) : (
                <div>
                  <h2 className="text-2xl text-gray-400 mb-4">
                    Haven't Connected Yet
                  </h2>
                  <button
                    className="px-8 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition duration-200"
                    onClick={connect}
                  >
                    Connect
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HospitalPage;