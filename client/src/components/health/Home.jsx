// import { useEffect, useState } from 'react';
// import { IoLogOutOutline } from "react-icons/io5";

// const App = () => {
//     const [hospitals, setHospitals] = useState([]);

//     useEffect(() => {
//         const fetchHospitals = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000/hospital-api/hospitals');
                
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 setHospitals(data);
//             } catch (error) {
//                 console.error('Error fetching hospitals:', error);
//             }
//         };
        
//         fetchHospitals();
//     }, []);

//     return (
//         <div className='h-screen  w-full  bg-zinc-900 text-white'>

//             <div>

//             </div>

//             <h1 className='text-3xl font-bold text-center pt-16 pb-8'>Hospitals List</h1>
//             <table class="table-auto border  m-auto" style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>
//                 <thead className='border '>
//                     <tr>
//                     <th className='text-left ps-3 py-2'>Hospital Name</th>
//                     <th className='text-left '>Address</th>
//                     <th className='text-left '>Contact</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {hospitals.map((hospital, index) => (
//                         <tr key={index} className=''  >
                            
//                             <td className='pe-5 ps-3 py-1' ><h2>{hospital.name}</h2></td>
//                             <td className=' pe-5'><p>{hospital.address}</p></td>
//                             <td className='pe-5' ><p>{hospital.contactNumber}</p></td>
//                             <td className='pt-1 pe-3'><button className=''><IoLogOutOutline size={25} /></button></td>
                            
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default App;


import { useEffect, useState } from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import './Home.css';

const App = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [filteredHospitals, setFilteredHospitals] = useState([]); // State for filtered hospitals

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch('http://localhost:4000/hospital-api/hospitals');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setHospitals(data);
                setFilteredHospitals(data); // Initialize filtered hospitals with full data
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };
        
        fetchHospitals();
    }, []);


    function hospitalPage(hospital) {
        //send data as props to hospital page not through localstorage
        localStorage.setItem("hospital", JSON.stringify(hospital));
        // console.log(JSON.stringify(hospital));
        window.location.href = "/health/hospitalpage";
    }

    // Function to handle search and filter hospitals based on search term
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
        <div className=''>

            <h1 className='text-3xl font-bold text-center pt-10'>Hospitals List</h1>

            <div className='text-center pt-10 pb-10' >
                <input
                    type="text"
                    placeholder="Search Hospitals"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 w-3/5 border rounded-lg text-white bg-zinc-900"
                    style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
                    // style={{ boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px" }}
                />
            </div>
            

            {
                filteredHospitals.length ===0 ? (
                    <div className='text-center'>
                        <h2 className='text-3xl'>No hospital found</h2>
                    </div>
                ):(
                    <div>
                    <div className='w-3/5  m-auto  border rounded-lg' >
                    <table className="table-auto  w-full  text-white bg-zinc-900" >

                    <thead className='border '>
                            <tr>
                                <th className='text-left ps-3 py-2'>Hospital Name</th>
                                <th className='text-left '>Address</th>
                                <th className='text-left '>Contact</th>
                            </tr>
                        </thead>
                    </table>
                    </div>


                    <div className='w-3/5 h-96 overflow-y-auto m-auto border rounded-lg' style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}>

                    <table className="table-auto w-full text-white bg-zinc-900" style={{ boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px" }}>
                        
                        <tbody className='  '>


                            {filteredHospitals.map((hospital, index) => (
                                <tr key={index} className=''>
                                    <td className='pe-5 ps-3 py-1'><h2>{hospital.name}</h2></td>
                                    <td className='pe-5'><p>{hospital.address}</p></td>
                                    <td className='pe-5'><p>{hospital.contactNumber}</p></td>
                                    <td className='pt-1 pe-3'><button className='' onClick={()=>hospitalPage(hospital)} ><IoLogOutOutline size={25} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

                    </div>
                )
            }
            
        </div>
    );
};

export default App;
