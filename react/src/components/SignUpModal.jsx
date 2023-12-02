import Swal from 'sweetalert2';
import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
export default function SignUpModal(props) {

    const [image, setImage] = useState();
    if (!image) {setImage('/avatar.jpg')}
    const handleChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleError = () => {
        Swal.fire({
            title: "Error",
            text: `${Object.values(errors)[0]}`,
            icon: "warning"
          });
    }

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
    const [gender, setGender] = useState('');
    const numberRef = useRef();
    const profilePictureRef = useRef();
    const [errors, setError] = useState(null)
    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        errors && handleError();
        const formData = new FormData();
        formData.append('first_name', firstNameRef.current.value);
        formData.append('middle_name', middleNameRef.current.value);
        formData.append('last_name', lastNameRef.current.value);
        formData.append('user_name', userNameRef.current.value);
        formData.append('email', emailRef.current.value);
        formData.append('password', passwordRef.current.value);
        formData.append('password_confirmation', passwordConfirmationRef.current.value);
        formData.append('birthday', birthdayRef.current.value);
        formData.append('street_address', streetAddressRef.current.value);
        formData.append('municipality', municipalityRef.current.value);
        formData.append('province', provinceRef.current.value);
        formData.append('profile_picture', profilePictureRef.current.files[0]);
        formData.append('phone_number', numberRef.current.value);
        formData.append('gender', gender);
        axiosClient.post('/register', formData)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.errors);
                }
            });
    };

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
                        <div className='signup-main'>
                            <h2>Sign Up</h2>
                            <hr />
                            <div className="upload-picture">
                                <img id='update-picture'src={image}/>
                                <input ref={profilePictureRef} id='upload-button' type="file" onChange={handleChange} />
                                <label for='upload-button'>Upload File</label>
                                Maximum file size: 2MB
                            </div>
                            <div className="signup-inputs">
                                <div className="left">
                                    <label>First Name:</label>
                                    <input ref={firstNameRef} ></input>
                                    <label>Middle Name:</label>
                                    <input ref={middleNameRef} ></input>
                                    <label>Last Name:</label>
                                    <input ref={lastNameRef} ></input>
                                    <label>Username:</label>
                                    <input ref={userNameRef} ></input>
                                    <label>Birthday:</label>
                                    <input ref={birthdayRef} type='date'placeholder='Birthday' required></input>
                                    <label>Gender:</label>
                                    <div className="gender-container">
                                        <input type="radio" name="gender" value="Male"  onChange={ev => (setGender(ev.target.value))}/> Male
                                        <input type="radio" name="gender" value="Female" onChange={ev => (setGender(ev.target.value))}/> Female
                                        <input type="radio" name="gender" value="Other" onChange={ev => (setGender(ev.target.value))}/> Other
                                    </div>
                                    <label>Phone Number:</label>
                                    <input type="number" ref={numberRef} required />
                                </div>
                                <div className="right">
                                    
                                    <label>Email Address:</label>
                                    <input ref={emailRef} type='email' ></input>
                                    <label>Password:</label>
                                    <input ref={passwordRef} type='password' ></input>
                                    <label>Confirm Password:</label>
                                    <input ref={passwordConfirmationRef} type='password' ></input>
                                    <label>Street Address:</label>
                                    <input ref={streetAddressRef} ></input>
                                    <label>Municipality:</label>
                                    <input ref={municipalityRef}  required></input>
                                    <label>Province:</label>
                                    <input ref={provinceRef} ></input>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="sign-up-button-container">
                            <button className='sign-up'>Sign Up</button>
                        </div>   
                    </form>                 
                </div>
            </div>
        </>
       
  )
}
