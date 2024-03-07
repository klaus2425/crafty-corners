import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

const Verify = () => {

  const { id, hash } = useParams();
  const params = new URLSearchParams(window.location.search);
  const expires = params.get('expires');
  const signature = params.get('signature');
  const [expired, setExpired] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    setLoading(true)
    axiosClient.get(`verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`)
      .then(response => {
        setLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        setError(error.response.data.message)
        setLoading(false);
        setExpired(true);
      });
  }, [id, hash, expires, signature]);
  
  if (!loading) {
    return expired ? (
      <div className="verify-container">
        <div className="card">
          <svg width="110" height="110" viewBox="0 0 232 232" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="116" cy="116" r="83.1333" fill="#A076F9" stroke="#222222" strokeWidth="11.6" />
            <path d="M159.5 116H118.417C117.082 116 116 114.918 116 113.583V82.1667" stroke="#222222" strokeWidth="11.6" strokeLinecap="round" />
          </svg>
          <div className="top"><h1>{error}</h1></div>
        </div>
      </div>
    ) :
      (
        <div className="verify-container">
          <div className="card">
            <svg width="110" height="110" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="68" cy="68" r="45.3333" fill="#A076F9" />
              <path d="M48.1667 62.3333L64.5656 78.7323C64.8976 79.0642 65.4358 79.0642 65.7677 78.7323L110.5 34" stroke="#222222" strokeWidth="6.8" />
              <path d="M109.694 59.7637C111.576 69.2905 110.139 79.1744 105.621 87.7705C101.104 96.3667 93.7792 103.157 84.8657 107.01C75.9522 110.864 65.9879 111.549 56.6309 108.951C47.274 106.353 39.0888 100.63 33.4377 92.7325C27.7865 84.8353 25.0103 75.2411 25.5709 65.5464C26.1315 55.8518 29.9952 46.6415 36.519 39.4484C43.0428 32.2553 51.8332 27.5132 61.4272 26.0113C71.0212 24.5095 80.8402 26.3385 89.25 31.1939" stroke="#222222" strokeWidth="5.66667" strokeLinecap="round" />
            </svg>
            <div className="top"><h1>Email Verified</h1></div>
            <div className="sub">You may now login to your account.</div>
          </div>
        </div>
      )
  }
  else return null;



}

export default Verify;