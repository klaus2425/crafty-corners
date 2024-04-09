import React, { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginModal(props) {
  const { setUser, setToken } = useStateContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const onForgotSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('email', emailRef.current.value)
    axiosClient.post('/forgot-password', formData)
      .then(() => {
        toast('Password reset link sent to email', {
          duration: 1500,
          position: "bottom-center",
          icon: "✅",
          style: {
            borderRadius: "100px",
            border: 0,
            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
          }
        })
      })
      .catch(err => {
        toast(err.response.data.message, {
          duration: 1500,
          position: "bottom-center",
          icon: "❗",
          style: {
            borderRadius: "100px",
            border: 0,
            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
          }
        })
      })
      ;
  }
  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    })
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        if (data.user.email_verified_at === null) {
          toast('Verify your account first!', {
            duration: 1500,
            position: "bottom-center",
            icon: "❗",
            style: {
              borderRadius: "100px",
              border: 0,
              boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
            }
          })
          axios.post(`${import.meta.env.VITE_API_BASE_URL}/send-email-verification`, null, {
            headers: {

              'Authorization': `Bearer ${data.token}`,
              'Content-Type': 'application/json'
            }
          })
            .catch(err => console.error(err));
        }
        else {
          setUser(data.user);
          setToken(data.token);
          props.setIsOpen(false);
          if (data.roles === 'admin') {
            return <Navigate to='/Users' />
          }
        }
      })
      .catch((err) => {
        const response = err.response.data.message;
        toast(response, {
          duration: 5000,
          position: "bottom-center",
          icon: "❗",
          style: {
            borderRadius: "100px",
            border: 0,
            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
          }
        })
      });
  };

  if (!props.isOpen) return null;

  return openForgotPassword ?
    (
      <>
        <div className="overlay" >
          <div className="modal">
            <div className="close-login">
              <svg onClick={() => {
                props.setIsOpen(false);
                setOpenForgotPassword(false);
              }}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                  stroke="#222222"
                  strokeLinecap="round"
                />
                <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
                <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
              </svg>
            </div>
            <form>
              <div className="login-main">
                <h2>Forgot Password</h2>
                <input ref={emailRef} placeholder="Email Address" />
              </div>
              <div className="login-button">
                <button className="purple-button" onClick={onForgotSubmit}>Send reset link</button>
              </div>
            </form>
          </div>
        </div>
      </>
    ) :
    (
      <>
        <div className="overlay" >
          <div className="modal">
            <div className="close-login">
              <svg onClick={() => props.setIsOpen(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z"
                  stroke="#222222"
                  strokeLinecap="round"
                />
                <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
                <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
              </svg>
            </div>
            <form>
              <div className="login-main">
                <h2>Log In</h2>
                <input ref={emailRef} placeholder="Email Address"></input>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                ></input>
                <span style={{ cursor: 'pointer' }} onClick={() => {
                  setOpenForgotPassword(true);
                }} >Forgot your password?</span>
              </div>
              <div className="login-button">
                <button className="purple-button" onClick={onSubmit}>Log In</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}
