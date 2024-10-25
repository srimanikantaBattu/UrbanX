import { useEffect, useState } from 'react';

const App = () => {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch('http://localhost:4000/hospital-api/hospitals');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setHospitals(data);
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };
        
        fetchHospitals();
    }, []);

    return (
        <div className='h-screen pt-20 w-full  bg-zinc-900 text-white'>
            <h1>Hospitals List</h1>
            <ul>
                {hospitals.map((hospital, index) => (
                    <li key={index}>
                        <h2>{hospital.name}</h2>
                        <p>{hospital.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;