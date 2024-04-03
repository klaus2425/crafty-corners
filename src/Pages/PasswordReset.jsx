import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import toast from "react-hot-toast";

const PasswordReset = () => {
  const params = new URLSearchParams(window.location.search);
  const expires = params.get('expires');
  const signature = params.get('signature');
  const token = params.get('token')
  const email = params.get('email');
  const navigate = useNavigate();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [expired, setExpired] = useState();
  const [loading, setLoading] = useState();

  const handleReset = () => {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', passwordRef.current.value);
    formData.append('password_confirmation', confirmPasswordRef.current.value);
    axiosClient.post(`/reset-password?expires=${expires}&token=${token}&signature=${signature}`, formData)
    .then(res => {
      toast('Password successfully changed', {
        duration: 1500,
        position: "bottom-center",
        icon: "✅",
        style: {
          borderRadius: "100px",
          border: 0,
          boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
        }
      })
      navigate('/landing')
    })
    .catch(err => {
      if (err.response.request.status === 400) {
        toast('Password reset link is expired', {
          duration: 1500,
          position: "bottom-center",
          icon: "❌",
          style: {
            borderRadius: "100px",
            border: 0,
            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
          }
        })
      }
      else
      toast(Object.values(err.response.data.errors)[0], {
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

  return (
    <div className="reset-password-container">
      <div className="card">
        <div>
          <h1>Reset Password</h1>
        </div>
        <div className="inputs">
          Enter new password
          <input ref={passwordRef} type="Password" placeholder="Password" />
          Confirm new password
          <input ref={confirmPasswordRef} type="Password" placeholder="Password" />
        </div>
        <button onClick={handleReset} className="purple-button">Reset Password</button>
      </div>
    </div>
  )
}

export default PasswordReset;