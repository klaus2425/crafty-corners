import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import toast from 'react-hot-toast';
import ReactSelect from 'react-select';


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
    const numberRef = useRef();
    const profilePictureRef = useRef();
    const sexRef = useRef();
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isPolicyOpen, setIsPolicyOpen] = useState(false);

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
        formData.append('profile_picture', profilePictureRef.current.files[0]);
        formData.append('phone_number', numberRef.current.value);
        formData.append('sex', sexRef.current.value);
        formData.append('program', programRef.current);
        formData.append('student_id', studentIdRef.current.value)

        toast.promise(axiosClient.post('/register', formData), {
            loading: 'Signing up',
            success: () => {
                props.setIsOpen(false);
                setImage(null);
                return <b>Verification sent to email address</b>
            },
            error: (err) => {
                return `${Object.values(err.response.data.errors)[0][0]}`
            },
        },
        )
    };

    const handleInputNumberChange = (event) => {
        const value = event.target.value;
        const regex = /^[0-9]*$/;
        const numericValue = value.replace(/\D/g, '');
        setInputValue(numericValue);
    }

    const options = [
        { value: "Bachelor of Science in Agriculture", label: "Bachelor of Science in Agriculture" },
        { value: "Bachelor of Technical-Vocational Teacher Education", label: "Bachelor of Technical-Vocational Teacher Education" },
        { value: "BS Agricultural and Biosystem Engineering", label: "BS Agricultural and Biosystem Engineering" },
        { value: "Bachelor of Elementary Education", label: "Bachelor of Elementary Education" },
        { value: "Bachelor of Science in Industrial Technology", label: "Bachelor of Science in Industrial Technology" },
        { value: "Bachelor in Secondary Education", label: "Bachelor in Secondary Education" },
        { value: "Bachelor in Public Administration", label: "Bachelor in Public Administration" },
        { value: "Bachelor of Science in Accountancy", label: "Bachelor of Science in Accountancy" },
        { value: "Bachelor of Science in Business Administration", label: "Bachelor of Science in Business Administration" },
        { value: "Bachelor of Science in Psychology", label: "Bachelor of Science in Psychology" },
        { value: "Bachelor of Arts in Psychology", label: "Bachelor of Arts in Psychology" },
        { value: "Bachelor of Early Childhood Education", label: "Bachelor of Early Childhood Education" },
        { value: "Bachelor of Science in Architecture", label: "Bachelor of Science in Architecture" },
        { value: "Bachelor of Science in Civil Engineering", label: "Bachelor of Science in Civil Engineering" },
        { value: "Bachelor of Science in Electrical Engineering", label: "Bachelor of Science in Electrical Engineering" },
        { value: "Bachelor of Science in Electronics Engineering", label: "Bachelor of Science in Electronics Engineering" },
        { value: "Bachelor of Science in Mechanical Engineering", label: "Bachelor of Science in Mechanical Engineering" },
        { value: "Bachelor of Science in Industrial Engineering", label: "Bachelor of Science in Industrial Engineering" },
        { value: "Bachelor of Science in Nursing", label: "Bachelor of Science in Nursing" },
        { value: "Bachelor of Science in Hospitality Management", label: "Bachelor of Science in Hospitality Management" },
        { value: "Bachelor of Science in Tourism Management", label: "Bachelor of Science in Tourism Management" },
        { value: "Bachelor of Arts in Communication", label: "Bachelor of Arts in Communication" },
        { value: "Bachelor of Science in Midwifery", label: "Bachelor of Science in Midwifery" },
        { value: "Bachelor of Technical-Vocational Teacher Education", label: "Bachelor of Technical-Vocational Teacher Education" },
        { value: "Bachelor of Science in Computer Science", label: "Bachelor of Science in Computer Science" },
        { value: "Bachelor of Science in Information Technology", label: "Bachelor of Science in Information Technology" },
        { value: "BS Entertainment & Multimedia Computing", label: "BS Entertainment & Multimedia Computing" },
        { value: "Bachelor of Industrial Technology", label: "Bachelor of Industrial Technology" },
        { value: "Bachelor of Sscience in Fisheries", label: "Bachelor of Science in Fisheries" },
        { value: "Bachelor of Technical Livelihood Education", label: "Bachelor of Technical Livelihood Education" },
        { value: "Bachelor of Physical Education", label: "Bachelor of Physical Education" },
        { value: "Bachelor of Science in Exercise and Sports Science", label: "Bachelor of Science in Exercise and Sports Science" }
    ];


    if (!props.isOpen) return null;
    return (
        <>
            <div className='overlay' >
                <div className='modal' id='sign-up-modal'>
                    <div className='close-login close-signup'>
                        <h2>Sign Up</h2>
                        <svg onClick={() => { props.setIsOpen(false), setImage(null) }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                            <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round" />
                            <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
                            <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
                        </svg>
                    </div>
                    <form encType="multipart/form-data" onSubmit={onSubmit}>
                        <div className='signup-main'>
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
                                    <label>Phone Number:</label>
                                    <input className='phoneNumberInput' id='phoneNumberInput' onChange={handleInputNumberChange} value={inputValue} ref={numberRef} required />
                                    <label>Email Address: (Use your BPSU email)</label>
                                    <input ref={emailRef} type='text' ></input>
                                    <label>Student ID: <em>(Format: 20-00000)</em></label>
                                    <input ref={studentIdRef} type='text' pattern='^\d{2}-\d{5}$' ></input>
                                    <label>Program: </label>
                                    <ReactSelect options={options}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        autoFocus={false}
                                        maxMenuHeight='10rem'
                                        placeholder='Program'
                                        menuPlacement='auto'
                                        onChange={(value) => {
                                            programRef.current = value.value
                                        }}
                                    />
                                    <label>Sex:</label>
                                    <select ref={sexRef} name="sex" id="sex">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="sign-up-button-container">
                            <p>
                                By pressing sign up, you are accepting our <span className='terms-conditions' onClick={() => setIsTermsOpen(true)}>
                                    Terms and Conditions</span> and <span className="terms-conditions" onClick={() => setIsPolicyOpen(true)}>Privacy Policy</span> for Crafty Corners.
                            </p>
                            <button className='btn btn--purple'>Sign Up</button>
                        </div>
                    </form>
                </div>
                {
                    isTermsOpen &&
                    <div className="overlay">
                        <div className="modal terms-modal">
                            <div className='close-login close-signup'>
                                <h2>Terms and Conditions</h2>

                                <svg onClick={() => setIsTermsOpen(false)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round" />
                                    <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
                                    <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3>Introduction</h3>
                            <p>
                                Welcome to Crafty Corners, a website dedicated to cultivating different hobbies for BPSU (Bataan
                                Peninsula State University) students with the aid of collaborative filtering technology. Before using
                                our services, please carefully read and understand the following terms and conditions:
                            </p>
                            <p>
                                <strong>1. Acceptance of Terms:</strong> By accessing or using Crafty Corners, you agree to be bound by these
                                Terms & Conditions, as well as any additional terms and policies referenced herein.
                            </p>
                            <p>
                                <strong>2. Use of Services:</strong> Crafty Corners provides a platform for BPSU students to discover and engage
                                in various hobbies through collaborative filtering technology. Users are solely responsible for their
                                interactions and activities on the website.
                            </p>
                            <p>
                                <strong>3. Registration:</strong>  Some features of Crafty Corners may require user registration. By registering, you
                                agree to provide accurate and complete information. You are responsible for maintaining the
                                confidentiality of your account credentials and for all activities that occur under your account.
                            </p>

                            <p>
                                <strong>4. User Content:</strong> Users may contribute content such as hobby recommendations, reviews, and
                                comments. By submitting content to Crafty Corners, you grant us a non-exclusive, royalty-free,
                                perpetual, and worldwide license to use, modify, publish, and distribute your content for any
                                purpose.
                            </p>
                            <p>
                                <strong>5. Collaborative Filtering:</strong> Crafty Corners utilizes collaborative filtering technology to
                                recommend hobbies based on user preferences and interactions. While we strive to provide
                                accurate recommendations, we cannot guarantee the accuracy, completeness, or reliability of the
                                recommendations.
                            </p>

                            <p>
                                <strong>6. Prohibited Activities:</strong> Users agree not to engage in any of the following activities:
                                <ul>
                                    <li>Violating any applicable laws or regulations.</li>
                                    <li>Interfering with the operation of Crafty Corners or the rights of other users.</li>
                                    <li>Uploading or distributing malicious software, sexual, or harmful content.</li>
                                    <li>Impersonating another person or entity</li>
                                    <li>Collecting or harvesting personal information from other users.</li>
                                </ul>
                            </p>
                            <p>
                                <strong>7. Privacy Policy:</strong> Crafty Corners respects your privacy and handles your personal information in
                                accordance with our Privacy Policy, which is incorporated herein by reference.
                            </p>
                            <p>
                                <strong>8. Termination:</strong> Crafty Corners reserves the right to suspend or terminate your access to the
                                website at any time, with cause, and with prior notice.
                            </p>
                            <p>
                                <strong>9. Disclaimer of Warranties:</strong> Crafty Corners do not guarantee that the website will be error-free
                                or uninterrupted. The user will bear sole risk for use.
                            </p>
                            <p>
                                <strong>10. Limitation of Liability:</strong> In no event shall Crafty Corners or its affiliates be liable for any indirect,
                                incidental, special, or consequential damages arising out of or in connection with your use of the
                                website.
                            </p>
                            <p>
                                <strong>11. Governing Law:</strong> These Terms & Conditions shall be governed by and construed in accordance
                                with the laws of the jurisdiction where Crafty Corners operates.
                            </p>
                            <p>
                                <strong>12. Changes to Terms:</strong> Crafty Corners reserves the right to update or modify these Terms &
                                Conditions at any time without prior notice. Your continued use of the website after any such
                                changes constitutes acceptance of the modified terms
                            </p>
                            <footer>
                                <span>
                                    <strong>Contact Us:</strong> If you have any questions or concerns about these Terms & Conditions, please contact
                                    us at <strong >craftycorners2023@gmail.com</strong>
                                </span>
                                <span>
                                    By using Crafty Corners, you acknowledge that you have read, understood, and agree to be bound
                                    by these Terms & Conditions.
                                </span>
                                <span>
                                    Last updated: April 22, 2024
                                </span>
                                <button className='btn btn--purple' onClick={() => setIsTermsOpen(false)}>Accept</button>
                            </footer>
                        </div>
                    </div>

                }
                {
                    isPolicyOpen &&
                    <div className="overlay">
                        <div className="modal terms-modal">
                            <div className='close-login close-signup'>
                                <h2>Privacy Policy</h2>

                                <svg onClick={() => setIsPolicyOpen(false)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round" />
                                    <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
                                    <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h4>Effective Date: April 22, 2024</h4>
                            <p>
                                Crafty Corners is committed to protecting the privacy of our users. This Privacy Policy
                                describes how we collect, use, and disclose information when you visit our website www.craftycorners.online.
                            </p>

                            <p>
                                <strong>1. Information We Collect <br /></strong> We may collect personal information that you voluntarily provide
                                to us when you interact with our Site or use our services. This may include:
                                <ul>
                                    <li>Contact information such as your name, email address, and phone number.</li>
                                    <li>Account credentials such as username and password.</li>
                                    <li>Payment information if you make a purchase on our Site.</li>
                                    <li>Information you provide when you contact us for customer support or other inquiries.</li>
                                    <li>Usage data such as your IP address, browser type, operating system, and device information.</li>
                                </ul>
                            </p>

                            <p>
                                <strong>2. Use of Information <br /></strong> We may use the information we collect for the following purposes:
                                <ul>
                                    <li>To provide and maintain our services.</li>
                                    <li>To personalize your experience and improve our Site.</li>
                                    <li>To communicate with you, including responding to your inquiries and providing customer support.</li>
                                    <li>To process transactions and fulfill orders.</li>
                                    <li>To send you promotional and marketing communications, if you have opted in to receive them.</li>
                                    <li>To detect, prevent, and address technical issues and security vulnerabilities.</li>
                                </ul>
                            </p>
                            <p>
                                <strong>3. Sharing of Information</strong> <br /> We may share your information with third parties for the following purposes:
                                <ul>
                                    <li>With service providers who assist us in operating our Site and providing our services.</li>
                                    <li>With third-party vendors, consultants, and other service providers who need access to such information to perform services on our behalf.</li>
                                    <li>With law enforcement authorities or other government officials if required by law or to protect our rights or the rights of others.</li>
                                </ul>
                            </p>
                            <p>
                                <strong>4. Changes to this Privacy Policy</strong> <br />We may update this Privacy Policy from time to time, and any changes will be posted on this page. Please review this Privacy Policy periodically for any updates.
                            </p>
                            <p>

                            </p>
                            <footer>
                                <span>
                                    <strong>Contact Us <br /></strong>
                                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at craftycorners2023@gmail.com
                                </span>
                                <span>
                                    By using our Site or services, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.
                                    <br />
                                </span>
                                <span>
                                    Last updated: April 22, 2024
                                </span>
                                <button className='btn btn--purple' onClick={() => setIsPolicyOpen(false)}>Accept</button>
                            </footer>
                        </div>
                    </div>
                }
            </div>
        </>

    )
}
