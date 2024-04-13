import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import toast from 'react-hot-toast';


export default function SignUpModal(props) {
    const [image, setImage] = useState();
    if (!image) { setImage('/avatar.svg') }
    const handleChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const middleNameRef = useRef();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const studentIdRef = useRef();
    const programRef = useRef();
    const passwordConfirmationRef = useRef();
    const birthdayRef = useRef();
    const numberRef = useRef();
    const profilePictureRef = useRef();
    const genderRef = useRef();
    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('first_name', firstNameRef.current.value);
        formData.append('middle_name', middleNameRef.current.value);
        formData.append('last_name', lastNameRef.current.value);
        formData.append('user_name', userNameRef.current.value);
        formData.append('email', emailRef.current.value);
        formData.append('password', passwordRef.current.value);
        formData.append('password_confirmation', passwordConfirmationRef.current.value);
        formData.append('birthday', birthdayRef.current.value);
        formData.append('profile_picture', profilePictureRef.current.files[0]);
        formData.append('phone_number', numberRef.current.value);
        formData.append('gender', genderRef.current.value);
        formData.append('program', programRef.current.value);
        formData.append('student_id', studentIdRef.current.value)

        toast.promise(axiosClient.post('/register', formData), {
            loading: 'Signing up',
            success: () => {
                props.setIsOpen(false);
                setImage(null);
                return <b>Verification sent to email address</b>
            },
            error: (err) => {
                return `${Object.values(err.response.data.errors)[0]}`
            },
        },
        )
    };

    if (!props.isOpen) return null;
    return (
        <>
            <div className='overlay' >
                <div className='modal'>
                    <div className='close-login'>
                        <button onClick={() => { props.setIsOpen(false), setImage(null) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                                <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round" />
                                <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
                                <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <form encType="multipart/form-data" onSubmit={onSubmit}>
                        <div className='signup-main'>
                            <h2>Sign Up</h2>
                            <hr />
                            <div className="upload-picture">
                                <img id='update-picture' src={image} />
                                <input ref={profilePictureRef} id='upload-button' type="file" onChange={handleChange} />
                                <label htmlFor='upload-button'>Upload File</label>
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
                                    <label>Password:</label>
                                    <input ref={passwordRef} type='password' ></input>
                                    <label>Confirm Password:</label>
                                    <input ref={passwordConfirmationRef} type='password' ></input>

                                </div>
                                <div className="right">
                                    <label>Birthday:</label>
                                    <input ref={birthdayRef} type='date' placeholder='Birthday' required></input>
                                    <label>Phone Number:</label>
                                    <input type="number" ref={numberRef} required />
                                    <label>Email Address:</label>
                                    <input ref={emailRef} type='email' ></input>
                                    <label>Student ID: <em>(Format: 20-00000)</em></label>
                                    <input ref={studentIdRef} type='text' pattern='^\d{2}-\d{5}$' ></input>
                                    <label>Program: </label>
                                    <select ref={programRef} >
                                        <option value="Bachelor of Science in Agriculture">Bachelor of Science in Agriculture</option>
                                        <option value="Bachelor of Technical-Vocational Teacher Education">Bachelor of Technical-Vocational Teacher Education</option>
                                        <option value="BS Agricultural and Biosystem Engineering">BS Agricultural and Biosystem Engineering</option>
                                        <option value="Bachelor of Elementary Education">Bachelor of Elementary Education</option>
                                        <option value="Bachelor of Science in Industrial Technology">Bachelor of Science in Industrial Technology</option>
                                        <option value="Bachelor in Secondary Education">Bachelor in Secondary Education</option>
                                        <option value="Bachelor in Public Administration">Bachelor in Public Administration</option>
                                        <option value="Bachelor of Science in Accountancy">Bachelor of Science in Accountancy</option>
                                        <option value="Bachelor of Science in Business Administration">Bachelor of Science in Business Administration</option>
                                        <option value="Bachelor of Science in Psychology">Bachelor of Science in Psychology</option>
                                        <option value="Bachelor of Arts in Psychology">Bachelor of Arts in Psychology</option>
                                        <option value="Bachelor of Early Childhood Education">Bachelor of Early Childhood Education</option>
                                        <option value="Bachelor of Elementary Education">Bachelor of Elementary Education</option>
                                        <option value="Bachelor in Secondary Education">Bachelor in Secondary Education</option>
                                        <option value="Bachelor of Science in Architecture">Bachelor of Science in Architecture</option>
                                        <option value="Bachelor of Science in Civil Engineering">Bachelor of Science in Civil Engineering</option>
                                        <option value="Bachelor of Science in Electrical Engineering">Bachelor of Science in Electrical Engineering</option>
                                        <option value="Bachelor of Science in Electronics Engineering">Bachelor of Science in Electronics Engineering</option>
                                        <option value="Bachelor of Science in Mechanical Engineering">Bachelor of Science in Mechanical Engineering</option>
                                        <option value="Bachelor of Science in Industrial Engineering">Bachelor of Science in Industrial Engineering</option>
                                        <option value="Bachelor of Science in Nursing">Bachelor of Science in Nursing</option>
                                        <option value="Bachelor of Science in Hospitality Management">Bachelor of Science in Hospitality Management</option>
                                        <option value="Bachelor of Science in Tourism Management">Bachelor of Science in Tourism Management</option>
                                        <option value="Bachelor of Arts in Communication">Bachelor of Arts in Communication</option>
                                        <option value="Bachelor of Science in Midwifery">Bachelor of Science in Midwifery</option>
                                        <option value="Bachelor of Technical-Vocational Teacher Education">Bachelor of Technical-Vocational Teacher Education</option>
                                        <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
                                        <option value="Bachelor of Science in Information Technology">Bachelor of Science in Information Technology</option>
                                        <option value="BS Entertainment & Multimedia Computing">BS Entertainment & Multimedia Computing</option>
                                        <option value="Bachelor of Industrial Technology">Bachelor of Industrial Technology</option>
                                        <option value="Bachelor of Sscience in Fisheries">Bachelor of Science in Fisheries</option>
                                        <option value="Bachelor of Technical Livelihood Education">Bachelor of Technical Livelihood Education</option>
                                        <option value="Bachelor of Physical Education">Bachelor of Physical Education</option>
                                        <option value="Bachelor of Science in Exercise and Sports Science">Bachelor of Science in Exercise and Sports Science</option>

                                    </select>
                                    <label>Gender:</label>
                                    <input ref={genderRef} type='text' placeholder='' required></input>
                                </div>
                            </div>
                        </div>
                        <div className="sign-up-button-container">
                            <button className='btn btn--purple'>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}
