import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ListMember = () => {
    // Mengakses variabel lingkungan
    const [ListMember, setListMember] = useState([]);
    const url = process.env.REACT_APP_API_URL;









    const getListMember = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/members`);

            setListMember(response.data.data);




        } catch (error) {
            console.log(error);
        }


    }

    const deleteMember = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this member?")) {
                const response = await axios.delete(`http://localhost:8080/api/v1/members/${id}`);
            }
            getListMember();

        } catch (error) {
            console.log(error);
        }




    }

    useEffect(() => {
        getListMember();
    }
        , [])




    return (
        <div className="mt-12 w-4/6 mx-auto my-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">List Member</h1>
                <Link to="/add-member" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Member</Link>

            </div>

            <div className="grid sm:grid-cols-4 gap-4">
                {ListMember.map((member, index) => (
                    <div key={index} className="bg-white shadow-md w-full h-auto rounded-lg p-4">
                        <div className="">
                            <img src={member.url} alt="lia" className='h-full w-full' />
                        </div>
                        <div className="text-center  border-2">
                            <h1 className="text-lg  font-bold">{member.name}</h1>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <Link to={`edit-member/${member.ID}`} className='btn text-white text-center bg-blue-700 w-[50%]'>edit</Link>
                            <button
                                className="btn bg-red-400 w-[50%] text-white text-center"
                                onClick={() => deleteMember(member.ID)} // Call deleteByid with the product id
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                ))}
            </div>
        </div >
    );
}

export default ListMember;

