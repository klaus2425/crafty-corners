import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';



export default function SignUpModal(props) {

    const [image, setImage] = useState();
    if (!image) {setImage('/avatar.jpg')}
    const handleChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const middleNameRef = useRef();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const birthdayRef = useRef();
    const streetAddressRef = useRef();
    const municipalityRef = useRef();
    const provinceRef = useRef();
    const profilePictureRef = useRef();
    const [errors, setError] = useState(null)
    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            first_name: firstNameRef.current.value,
            last_name: middleNameRef.current.value,
            middle_name: lastNameRef.current.value,
            user_name: userNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            birthday: birthdayRef.current.value,
            street_address: streetAddressRef.current.value,
            municipality: municipalityRef.current.value,
            province: provinceRef.current.value,
            profile_picture: profilePictureRef.current.files[0]
        }
        console.log(payload);
        axiosClient.post('/register', payload)
        .then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422){
                setError(response.data.errors);
            }
        });
    }

    if(!props.isOpen) return null;
    return (
        <>
            <div className='overlay'>
                <div className='modal'>
                    <div className='close-login'>
                        <button onClick={() => props.setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                            <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round"/>
                            <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round"/>
                            <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <form enctype="multipart/form-data" onSubmit={onSubmit}>
                        <div className='login-main'>
                            <h2>Sign Up</h2>
                            {errors && <div className='alert'>
                                {Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}    
                            </div>}
                            <hr />
                            <div className="upload-picture">
                                <img id='update-picture'src={image}/>
                                <input ref={profilePictureRef} id='upload-button' type="file" onChange={handleChange} />
                                <label for='upload-button'>Upload File</label>
                            </div>
                            <input ref={firstNameRef} placeholder='First Name'></input>
                            <input ref={middleNameRef} placeholder='Middle Name'></input>
                            <input ref={lastNameRef} placeholder='Last Name'></input>
                            <input ref={userNameRef} placeholder='Username'></input>
                            <input ref={emailRef} type='email' placeholder='Email Address'></input>
                            <input ref={passwordRef} type='password' placeholder='Password'></input>
                            <input ref={passwordConfirmationRef} type='password' placeholder='Password Confirmation'></input>
                            <input ref={birthdayRef} type='date'placeholder='Birthday'></input>
                            <input ref={streetAddressRef} placeholder='Street Address'></input>
                            <input ref={municipalityRef} placeholder='Municipality'></input>
                            <input ref={provinceRef} placeholder='Province'></input>
                        </div>
                        <div className="login-button">
                            <button>Sign Up</button>
                        </div>   
                    </form>                 
                </div>
            </div>
        </>
       
  )
}
