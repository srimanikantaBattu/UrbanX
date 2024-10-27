import { useEffect, useState } from 'react';
import { IoLogOutOutline } from "react-icons/io5";

const App = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [filteredHospitals, setFilteredHospitals] = useState([]); 

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch('http://localhost:4000/hospital-api/hospitals');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setHospitals(data);
                setFilteredHospitals(data); 
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };
        
        fetchHospitals();
    }, []);

    function hospitalPage(hospital) {
        localStorage.setItem("hospital", JSON.stringify(hospital));
        window.location.href = "/health/hospitalpage";
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);

        const results = hospitals.filter(hospital =>
            hospital.name.toLowerCase().includes(query) ||
            hospital.address.toLowerCase().includes(query) ||
            hospital.contactNumber.toLowerCase().includes(query)
        );

        setFilteredHospitals(results);
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white py-10'>
            <h1 className='text-4xl font-bold text-center mb-8'>Hospitals List</h1>

            <div className='text-center mb-8'>
                <input
                    type="text"
                    placeholder="Search Hospitals"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-5 py-3 w-3/5 border rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                />
            </div>

            {filteredHospitals.length === 0 ? (
                <div className='text-center'>
                    <h2 className='text-2xl'>No hospital found</h2>
                </div>
            ) : (
                <div className='w-4/5 mx-auto overflow-hidden rounded-lg shadow-xl bg-gray-800'>
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Hospital Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Contact</th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">View</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {filteredHospitals.map((hospital, index) => (
                                <tr key={index} className="hover:bg-gray-700 transition duration-200 ease-in-out">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <h2 className="font-semibold">{hospital.name}</h2>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p>{hospital.address}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p>{hospital.contactNumber}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button onClick={() => hospitalPage(hospital)} className="text-blue-500 hover:text-blue-700">
                                            <IoLogOutOutline size={25} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default App;