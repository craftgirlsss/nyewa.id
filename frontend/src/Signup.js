import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import RegisterValidation from './SignUpValidation'
import axios from 'axios'

function Signup(){
    // const [values, setValues] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    // })

    // const [errors, setErrors] = useState({})
    // const navigate = useNavigate

    // const handleInput = (event) => {
    //     setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))
    // }

    // const handleSubmit = (event) => {
    //     console.log(event)
    //     console.log(values.email)
    //     console.log(values.name)
    //     console.log(values.password)
    //     event.preventDefault();
    //     console.log("event prevent sudah dijalankan")
    //     setErrors(RegisterValidation(values));
    //     console.log("registerValidation(values sudah dijalankan)")

    //     if(errors.name !== "" && errors.email !== "" && errors.password !== ""){
    //         console.log("masuk ke if")
    //         axios.post("http://localhost:8081/signup", values)
    //          .then(res => navigate('/login'))
    //          .catch(err => console.log(err))
    //     }
    // }

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5001/api/auth/register', {name, email, password})
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{backgroundImage: 'url(https://donatpancake.my.id/images/banner-images/banner-image-1.png)'}}>
        <div className='bg-white p-4 rounded w-25'>
            <div>
                <img src='https://donatpancake.my.id/images/logo.png' className='img-fluid rounded'/>
            </div>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Nama Lengkap</strong></label>
                    <input type='name' placeholder='Masukkan nama anda' className='form-control rounded' onChange={(e) => setName(e.target.value)} name='name'/>
                    {/* {errors.name && <span className='text-danger'> {errors.name} </span>} */}
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Masukkan email anda' className='form-control rounded' onChange={(e) => setEmail(e.target.value)} name='email'/>
                    {/* {errors.email && <span className='text-danger'> {errors.email} </span>} */}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Kata Sandi</strong></label>
                    <input type='password' placeholder='Buat kata sandi' className='form-control rounded' onChange={(e) => setPassword(e.target.value)} name='password'/>
                    {/* {errors.password && <span className='text-danger'> {errors.password} </span>} */}
                </div>
                <button type='submit' className='btn btn-success w-100'><strong>Daftar</strong></button>
                <p className='align-items-center'>Terms and Conditions</p>
                <Link to="/" className='btn btn-default border w-100 bg-light'><strong>Masuk</strong></Link>
            </form>
        </div>
    </div>)
}

export default Signup