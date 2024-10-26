import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdAddCall } from "react-icons/md";

function HospitalPage() {
  const username = localStorage.getItem("username");

  const emailId = localStorage.getItem("emailId");

  const hospitalString = localStorage.getItem("hospital");
  const hospital = JSON.parse(hospitalString);

  const role = localStorage.getItem("role");

  const [hospitalExists, setHospitalExists] = useState(null);

  const [waitingUsers, setWaitingUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [addedToWaitingList, setAddedToWaitingList] = useState(false);

  useEffect(() => {
    if (!hospital) {
      window.location.href = "/health";
    }

    if (!username) {
      window.location.href = "/login";
    }

    const checkHospital = async () => {
      try {
        // Replace with your backend URL
        const response = await axios.get(
          `http://localhost:4000/user-api/check-hospital/${username}/${hospital._id}`
        );

        setHospitalExists(response.data);
      } catch (error) {
        console.error("Error checking hospital:", error);
        setHospitalExists(false);
      }
    };

    console.log("hospitalExists",hospitalExists);

    const fetchWaitingUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/hospital-api/waiting-users/${hospital._id}`
        );
        setWaitingUsers(response.data);
      } catch (error) {
        console.error("Error fetching waiting users:", error);
      }
    };

    const fetchConnectedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/hospital-api/connected-users/${hospital._id}`
        );
        setConnectedUsers(response.data);
      } catch (error) {
        console.error("Error fetching connected users:", error);
      }
    };

    fetchWaitingUsers();
    fetchConnectedUsers();
    checkHospital();
  }, [waitingUsers]);
//   username, hospital, role,connectedUsers,waitingUsers

  async function connect(username,emailId) {
    console.log("came here")
    try {
      const response = await axios.put(
        `http://localhost:4000/hospital-api/add-to-connected-list/${username}/${emailId}/${hospital._id}`
      );
      setHospitalExists(response.data);
    } catch (error) {
      console.error("Error checking hospital:", error);
      setHospitalExists(false);
    }
  }

  async function addToWaitingList() {
    setAddedToWaitingList(true);
    try {
      const response = await axios.put(
        `http://localhost:4000/hospital-api/add-to-waiting-list/${username}/${emailId}/${hospital._id}`
      );
      setHospitalExists(response.data);
    } catch (error) {
      console.error("Error checking hospital:", error);
      setHospitalExists(false);
    }
  }

  return (
    <div>
      <div
        className="text-center py-3 m-auto w-2/5 border rounded-lg mt-10"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <h1 className="text-4xl">{hospital.name}</h1>
        <p className="text-xl pt-2">{hospital.address}</p>
        <div className="flex justify-center pt-2">
          <p className="text-xl">{hospital.contactNumber} </p>
          <div className="mt-1 ps-2">
            <MdAddCall size={22} />
          </div>
        </div>
      </div>

      {role === "admin" ? (
        <div>
          <div>
            {waitingUsers.length > 0 ? (
              <div>
                <h1 className="text-center text-3xl mt-20">Waiting Users</h1>
                <div className="pt-5 w-3/5 m-auto">

                <table className="table-auto m-auto w-full">
                    <thead className="bg-zinc-800 text-white">
                        <tr>
                            <th className="px-4 py-2 text-center">Name</th>
                            <th className="px-4 py-2 text-center">Email</th>
                            <th className="px-4 py-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waitingUsers.map((user, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.emailId}</td>
                                <td className="border m-auto text-center"><button className="px-3 py-1 mb-2 mt-1 bg-green-950 rounded-lg text-white text-center" onClick={()=>connect(user.username,user.emailId)} >Accept</button></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
            <div>
                {
                    connectedUsers.length > 0 ? (
                        <div className="w-3/5 m-auto mt-10">
                            <h1 className="text-center text-3xl">Connected Users</h1>
                            <table className="table-auto m-auto w-full mt-5" style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}>
                                <thead className="bg-zinc-800 text-white">
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {connectedUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2 text-center">{user.username}</td>
                                            <td className="border px-4 py-2 text-center">{user.emailId}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    ) : (
                        <div className="mt-24">
                            <h1 className="text-center text-3xl ">No Connected Users</h1>
                        </div>
                    )
                }
            </div>
        </div>
      ) : (
        <div>
          {hospitalExists ? (
            <div className="pt-16">
              <div>
                <h4>Welcome {username}</h4>
              </div>
            </div>
          ) : (
            <div>
                {
                    addedToWaitingList ? (
                        <div>
                            <h1 className="text-center text-2xl mt-20">
                                Please Wait for the admin to accept your request
                            </h1>
                        </div>
                    ) : (
                        <div>
                            <div className="pt-16">
                                <div className="text-center  mt-20">
                                    <h2 className="text-2xl">Haven't Connected Yet</h2>
                                    <button
                                    className="border px-3 py-1 mt-8 rounded-lg bg-blue-500 text-white"
                                    onClick={addToWaitingList}
                                    >
                                    Connect
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HospitalPage;
