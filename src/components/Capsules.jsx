import React, { useEffect, useState } from 'react'
import '../Style/capsule.css'
import Pagination from './Pagination';
import { DateTime } from "luxon";
import Navbar from './Navbar';

export default function Capsules() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [datalength, setDatalength] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [value, setValue] = useState('');
    const [launchDate, setLaunchDate] = useState("");

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const display = async () => {
        try {
            const res = await fetch('https://api.spacexdata.com/v3/capsules')
            const data = await res.json();
           
            setData(data)
            setDatalength(data.length);
            
        }
        catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        display();
    }, [])

    const datetime = (e) => {
        let utcDateString = DateTime.fromISO(e.target.value, { zone: "utc" });
        utcDateString = utcDateString.toISO();
        setValue(utcDateString)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const apiUrl = `https://api.spacexdata.com/v3/capsules?${selectedOption}=${value}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
               
                
                
                setData(data);
                setDatalength(data.length);
            })
            .catch((error) => {
                
            });
    };
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const paginateData = data.slice(firstPostIndex, lastPostIndex);
    return (
        <>
            <div className='capsule-container'>
                <form className="form-container" onSubmit={handleSubmit}>
                    <label htmlFor="select-option">Filter by:</label>
                    <select id="select-option" value={selectedOption} onChange={handleSelectChange}>
                        <option value="">--Select an option--</option>
                        <option value="type">Type</option>
                        <option value="status">Status</option>
                        <option value="original_launch">original_launch</option>
                    </select>

                    {selectedOption === 'original_launch' && (
                        <div className="input-container">
                            <label htmlFor="original_launch-input">Launch Date:</label>
                            <input type="datetime-local" id="original_launch-input" onChange={(e) => datetime(e)} />
                            <button type='submit' className='btn-card
                            '>
                                Submit
                            </button>

                        </div>
                    )}
                    {selectedOption === 'status' && (
                        <div className="input-container">
                            <label htmlFor="status-input">Status:</label>
                            <input type="text" id="original_launch-input" onChange={(e) => setValue(e.target.value)} />
                            <button type='submit' className='btn-card'>
                                Submit
                            </button>

                        </div>
                    )}
                    {selectedOption === 'type' && (
                        <div className="input-container">
                            <label htmlFor="type-input">Type:</label>
                            <input type="text" id="original_launch-input" onChange={(e) => setValue(e.target.value)} />
                            <button type='submit' className='btn-card'>
                                Submit
                            </button>

                        </div>
                    )}
                    {/* {<button type='submit' >submit</button>} */}
                </form>

                <div className='capsules-card-container'>

                    <div className='capsules-card'>
                        {paginateData.length > 0 ?
                            paginateData.map((el, i) => {
                                return (
                                    <div className='card' key={i.toString()}>
                                        <h2>{el.capsule_serial}</h2>
                                        <p>Capsule_id: {el.capsule_id}</p>
                                        <p>Status: {el.status}</p>
                                        <p>Original_launch: {el.original_launch}</p>
                                        <p>Landings: {el.landings}</p>
                                        <p>Type: {el.type}</p>
                                    </div>
                                )
                            })
                            : "Loading....."
                        }
                    </div>
                </div>

            </div>
            <Pagination
                totalPosts={datalength}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>

    )
}
