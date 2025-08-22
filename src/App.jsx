import { React, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function App() {

    const navigate = useNavigate()
    const jwt_token = sessionStorage.getItem('token')

    const [fdata, setfdata] = useState([])

    const fetchData = async () => {
        try {
            const resp = await axios.get(`https://server-aanyagreens.onrender.com/dashboard`,{
                headers:{
                    Authorization:jwt_token
                }
            })
            setfdata(resp.data)
        } catch (err) {
            if (err.response.status === 404) {
                alert(err.response.data.error)
                navigate('/')
            } else {
                console.log("Error Getting Data", err)
            }
        }
    }

    useEffect(() => {
        if (!jwt_token) {
            navigate('/')
        }
        fetchData();
    }, [])

    const handleClick = () => {
        fetchData();
    }

    const handledlt = async (query) => {
        try {
            const d = await axios.delete(`https://server-aanyagreens.onrender.com/dashboard/${query._id}`, {
                headers: {
                    Authorization: jwt_token
                }
            });
            await fetchData();
        } catch (err) {
            console.log("Error in Deleting", err)
        }
    }

    return (
        <>
            <div className="Nav">
                <div className="heading">QUIRIES</div>
                <img src="/assets/logo3-golden.png" alt="" />
                <div onClick={handleClick} className="fetchbtn">Load More</div>
            </div>

            <div className="quiriesContainer">{fdata.length === 0 ? (<div className="no">NO QUERY YET</div>) : (
                fdata.map((query, i) => {
                    const dated = new Date(query.createdAt).toLocaleDateString('en-GB')
                    return <div className="queryBox" key={query._id}>
                        <div onClick={() => { handledlt(query) }} className="dlt"><img src="./assets/delete.svg" alt="delete" /></div>
                        <div className="date">{dated}</div>
                        <ul>
                            <li>Name : &nbsp;{query.name}</li>
                            <li>Phone no. : &nbsp;{query.phone}</li>
                            <li>Email : &nbsp;{query.email}</li>
                            <li>No. of Quests : &nbsp;{query.guests}</li>
                            <li>Event & Details : &nbsp;{query.event}</li>
                        </ul>
                    </div>
                })
            )
            }
            </div>
        </>
    )
}

export default App;
