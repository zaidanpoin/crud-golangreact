import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'




const EditMember = () => {

    const [name, setName] = React.useState('')
    const [image, setImage] = React.useState(null)
    const [preview, setPreview] = React.useState(null)
    const navigate = useNavigate()
    const id = useParams().id

    const saveMember = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Tambahkan name ke FormData
        formData.append('name', name);

        // Validasi apakah image ada sebelum menambahkannya
        if (image) {
            formData.append('image', image);
        }

        try {


            if (image) {
                const response = await axios.patch(
                    `http://localhost:8080/api/v1/members/${id}`,
                    formData,
                    {

                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            } else {

                const response = await axios.patch(
                    `http://localhost:8080/api/v1/members/${id}`,
                    formData
                );

            }

            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };



    const loadImage = (e) => {
        const image = e.target.files[0]


        setImage(image)
        setPreview(URL.createObjectURL(image))



    }





    const loadMember = async () => {

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/members/${id}`);
            const re = response.data.data

            setName(re[0].name);
            setPreview(re[0].url);
            setImage(re[0].image);




        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadMember()
    }, [])











    return (
        <div className='mx-auto w-4/6 mt-12'>
            <form onSubmit={saveMember}>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Nama member</label>
                    <input
                        placeholder='nama member' value={name} onChange={(e) => setName(e.target.value)} name='name' required type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "></input>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Nama member</label>
                    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                        <input
                            type="file"

                            name='image'
                            id="default-input"
                            onChange={loadImage}
                            className="">

                        </input>
                        {preview ? <img src={preview} className='mt-4' alt="" /> : null}



                    </div>



                </div>

                <div className="mb-6 flex gap-2">
                    <button type='submit' className='btn bg-blue-500 text-white text-center items-center p-2 w-20 rounded'>save</button>
                    <Link to='/' className='btn bg-red-500  text-center items-center text-white p-2 w-20 rounded'>cancel</Link>
                </div>

            </form >
        </div >
    )
}

export default EditMember
