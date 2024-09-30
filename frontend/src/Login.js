import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Validation from './LoginValidation'
import axios from 'axios'

function Login(){

    // const [values, setValues] = useState({
    //     email: '',
    //     password: '',
    // })

    // const [errors, setErrors] = useState({})
    // const navigate = useNavigate

    // const handleInput = (event) => {
    //     setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(Validation(values));

    //     if(errors.email === "" && errors.password === ""){
    //         axios.post("http://localhost:8081/login", values)
    //          .then(res => {
    //             if(res.data === "Success"){
    //                 navigate('/home')
    //             }else{
    //                 alert("Can't find account")
    //             }
    //          })
    //          .catch(err => console.log(err))
    //     }
    // }

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/auth/login', {email, password})
            .then(result => {
                console.log(result)
                navigate('/dashboard')
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
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter email address' className='form-control rounded' onChange={(e) => setEmail(e.target.value)} name='email'/>
                    {/* {errors.email && <span className='text-danger'> {errors.email} </span>} */}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Kata Sandi</strong></label>
                    <input type='password' placeholder='Enter your password' className='form-control rounded' onChange={(e) => setPassword(e.target.value)} name='password'/>
                    {/* {errors.password && <span className='text-danger'> {errors.password} </span>} */}
                </div>
                <button type='submit' className='btn btn-success w-100'><strong>Masuk</strong></button>
                <p className='align-items-center'>Terms and Conditions</p>
                <Link to="/signup" className='btn btn-default border w-100 bg-light'><strong>Buat Akun</strong></Link>
            </form>
        </div>
    </div>)
}

export default Login