import { useStateContext } from "../context/ContextProvider";
import LoginModal from "./LoginModal";
import { useState } from "react";
import axiosClient from "../axios-client";
import DropDownItem from "./DropDownItem";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
    const { isOpen, setIsOpen, setUser, setToken, user, token } = useStateContext();
    const queryClient = useQueryClient();
    const [openDropDown, setOpenDropDown] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/Landing');
    }
    const onLogout = () => {
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
                queryClient.removeQueries('user');
                navigate('/');
            })
    }
    const handleDropDown = () => {
        openDropDown ? setOpenDropDown(false) : setOpenDropDown(true);
    }

    if (token) {
        const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
        const userPicture = `${storageBaseUrl}${user.profile_picture}`;
        return (
            <div className='authenticated-navbar'>
                <Toaster />
                <div style={{ cursor: 'pointer' }} onClick={handleNavigateHome} className='title'>
                    <svg width="82" height="80" viewBox="0 0 284 282" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M222.094 32.2117C201.503 18.7637 177.502 11.0201 152.689 9.81937C127.876 8.61864 103.196 14.0065 81.3208 25.3996C59.4458 36.7927 41.2092 53.7571 28.5854 74.456C15.9616 95.155 9.43147 118.8 9.70203 142.831C9.97258 166.862 17.0335 190.364 30.1204 210.792C43.2072 231.22 61.8214 247.797 83.9477 258.726C106.074 269.656 130.87 274.522 155.65 272.799C180.43 271.076 204.251 262.829 224.534 248.95L198.422 213.242C184.873 222.513 168.961 228.022 152.408 229.173C135.855 230.325 119.291 227.074 104.511 219.773C89.7304 212.472 77.2961 201.399 68.5541 187.753C59.8121 174.107 55.0954 158.408 54.9147 142.355C54.7339 126.302 59.096 110.507 67.5288 96.6803C75.9615 82.8534 88.1435 71.5212 102.756 63.9106C117.369 56.3 133.855 52.7009 150.43 53.503C167.005 54.3051 183.038 59.4778 196.792 68.4611L222.094 32.2117Z" fill="#A076F9" />
                        <path d="M222.094 32.2117C201.503 18.7637 177.502 11.0201 152.689 9.81937C127.876 8.61864 103.196 14.0065 81.3208 25.3996C59.4458 36.7927 41.2092 53.7571 28.5854 74.456C15.9616 95.155 9.43147 118.8 9.70203 142.831C9.97258 166.862 17.0335 190.364 30.1204 210.792C43.2072 231.22 61.8214 247.797 83.9477 258.726C106.074 269.656 130.87 274.522 155.65 272.799C180.43 271.076 204.251 262.829 224.534 248.95L198.422 213.242C184.873 222.513 168.961 228.022 152.408 229.173C135.855 230.325 119.291 227.074 104.511 219.773C89.7304 212.472 77.2961 201.399 68.5541 187.753C59.8121 174.107 55.0954 158.408 54.9147 142.355C54.7339 126.302 59.096 110.507 67.5288 96.6803C75.9615 82.8534 88.1435 71.5212 102.756 63.9106C117.369 56.3 133.855 52.7009 150.43 53.503C167.005 54.3051 183.038 59.4778 196.792 68.4611L222.094 32.2117Z" fill="#A076F9" />
                        <path d="M222.094 32.2117C201.503 18.7637 177.502 11.0201 152.689 9.81937C127.876 8.61864 103.196 14.0065 81.3208 25.3996C59.4458 36.7927 41.2092 53.7571 28.5854 74.456C15.9616 95.155 9.43147 118.8 9.70203 142.831C9.97258 166.862 17.0335 190.364 30.1204 210.792C43.2072 231.22 61.8214 247.797 83.9477 258.726C106.074 269.656 130.87 274.522 155.65 272.799C180.43 271.076 204.251 262.829 224.534 248.95L198.422 213.242C184.873 222.513 168.961 228.022 152.408 229.173C135.855 230.325 119.291 227.074 104.511 219.773C89.7304 212.472 77.2961 201.399 68.5541 187.753C59.8121 174.107 55.0954 158.408 54.9147 142.355C54.7339 126.302 59.096 110.507 67.5288 96.6803C75.9615 82.8534 88.1435 71.5212 102.756 63.9106C117.369 56.3 133.855 52.7009 150.43 53.503C167.005 54.3051 183.038 59.4778 196.792 68.4611L222.094 32.2117Z" stroke="#222222" strokeWidth="17.7196" />
                        <path d="M103.402 197.49C113.963 204.709 126.365 208.997 139.264 209.888C152.164 210.779 165.07 208.24 176.584 202.546C188.099 196.852 197.784 188.219 204.592 177.582C211.399 166.946 215.068 154.711 215.203 142.202C215.338 129.692 211.933 117.386 205.357 106.614C198.781 95.8426 189.284 87.0163 177.894 81.0908C166.505 75.1654 153.657 72.3665 140.741 72.9972C127.825 73.628 115.334 77.6643 104.619 84.6692L117.798 103.532C124.955 98.8532 133.3 96.1569 141.927 95.7356C150.555 95.3142 159.138 97.1839 166.746 101.142C174.354 105.1 180.698 110.996 185.091 118.192C189.484 125.387 191.759 133.608 191.668 141.964C191.578 150.32 189.127 158.493 184.58 165.598C180.033 172.704 173.563 178.47 165.871 182.274C158.179 186.078 149.558 187.774 140.941 187.179C132.324 186.583 124.04 183.719 116.985 178.896L103.402 197.49Z" fill="#A076F9" />
                        <path d="M103.402 197.49C113.963 204.709 126.365 208.997 139.264 209.888C152.164 210.779 165.07 208.24 176.584 202.546C188.099 196.852 197.784 188.219 204.592 177.582C211.399 166.946 215.068 154.711 215.203 142.202C215.338 129.692 211.933 117.386 205.357 106.614C198.781 95.8426 189.284 87.0163 177.894 81.0908C166.505 75.1654 153.657 72.3665 140.741 72.9972C127.825 73.628 115.334 77.6643 104.619 84.6692L117.798 103.532C124.955 98.8532 133.3 96.1569 141.927 95.7356C150.555 95.3142 159.138 97.1839 166.746 101.142C174.354 105.1 180.698 110.996 185.091 118.192C189.484 125.387 191.759 133.608 191.668 141.964C191.578 150.32 189.127 158.493 184.58 165.598C180.033 172.704 173.563 178.47 165.871 182.274C158.179 186.078 149.558 187.774 140.941 187.179C132.324 186.583 124.04 183.719 116.985 178.896L103.402 197.49Z" fill="#A076F9" />
                        <path d="M103.402 197.49C113.963 204.709 126.365 208.997 139.264 209.888C152.164 210.779 165.07 208.24 176.584 202.546C188.099 196.852 197.784 188.219 204.592 177.582C211.399 166.946 215.068 154.711 215.203 142.202C215.338 129.692 211.933 117.386 205.357 106.614C198.781 95.8426 189.284 87.0163 177.894 81.0908C166.505 75.1654 153.657 72.3665 140.741 72.9972C127.825 73.628 115.334 77.6643 104.619 84.6692L117.798 103.532C124.955 98.8532 133.3 96.1569 141.927 95.7356C150.555 95.3142 159.138 97.1839 166.746 101.142C174.354 105.1 180.698 110.996 185.091 118.192C189.484 125.387 191.759 133.608 191.668 141.964C191.578 150.32 189.127 158.493 184.58 165.598C180.033 172.704 173.563 178.47 165.871 182.274C158.179 186.078 149.558 187.774 140.941 187.179C132.324 186.583 124.04 183.719 116.985 178.896L103.402 197.49Z" stroke="#222222" strokeWidth="9.22369" />
                        <g clipPath="url(#clip0_467_457)">
                            <path d="M242.792 51.6811C244.116 50.6029 246.087 50.767 247.201 52.0483L249.216 54.3646C250.331 55.6458 250.161 57.552 248.837 58.6301L236.864 68.3758L232.075 72.2741L220.102 82.0197C218.777 83.0979 216.807 82.9338 215.692 81.6525L213.677 79.3362C212.563 78.0549 212.732 76.1488 214.057 75.0707L218.846 71.1724L216.831 68.8561C215.716 67.5748 215.886 65.6687 217.211 64.5906L222 60.6923C220.885 59.4111 221.055 57.5049 222.379 56.4268C223.704 55.3487 225.674 55.5128 226.789 56.794L231.578 52.8958C232.903 51.8176 234.873 51.9817 235.988 53.263L238.003 55.5793L242.792 51.6811ZM271.001 84.1099L266.212 88.0082L268.227 90.3246C269.341 91.6058 269.172 93.5119 267.847 94.5901L263.058 98.4883C264.173 99.7696 264.003 101.676 262.679 102.754C261.354 103.832 259.384 103.668 258.269 102.387L253.48 106.285C252.155 107.363 250.185 107.199 249.07 105.918L247.055 103.601L242.266 107.5C240.942 108.578 238.971 108.414 237.857 107.132L235.842 104.816C234.727 103.535 234.897 101.629 236.221 100.551L248.194 90.8049L252.983 86.9066L264.956 77.1609C266.281 76.0828 268.251 76.2469 269.366 77.5281L271.381 79.8445C272.495 81.1257 272.326 83.0318 271.001 84.1099ZM250.968 84.5902L246.179 88.4885L234.09 74.5904L238.879 70.6921L250.968 84.5902Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip1_467_457)">
                            <path d="M271.895 158.731C271.38 159.456 270.53 159.904 269.62 159.935L263.131 160.157L239.34 160.97C235.356 161.106 231.993 157.468 231.824 152.848C231.656 148.227 234.745 144.368 238.728 144.232C242.712 144.096 246.075 147.734 246.244 152.355C246.279 153.331 246.17 154.278 245.931 155.159L259.053 154.71L251.316 132.629L232.553 133.271C228.57 133.407 225.207 129.769 225.038 125.148C224.869 120.528 227.958 116.669 231.942 116.533C235.925 116.397 239.288 120.035 239.457 124.655C239.493 125.632 239.383 126.578 239.144 127.459L253.257 126.977L259.746 126.755C261.016 126.712 262.173 127.484 262.585 128.648L272.256 156.249C272.548 157.085 272.419 158.006 271.895 158.731Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip2_467_457)">
                            <path d="M267.261 200.604C270.162 196.919 269.425 191.653 265.615 188.846L242.614 171.903C238.805 169.097 233.36 169.81 230.459 173.495L214.695 193.52L212.944 195.745C211.975 196.976 212.22 198.727 213.493 199.664C214.765 200.602 216.575 200.364 217.544 199.134L222.144 202.522C221.176 203.753 221.421 205.504 222.693 206.442L245.694 223.385C246.966 224.322 248.777 224.085 249.746 222.854L251.497 220.629L267.261 200.604ZM239.66 180.273L225.647 198.072L221.047 194.684L235.059 176.884C236.028 175.653 237.839 175.416 239.111 176.353C240.383 177.29 240.628 179.042 239.66 180.273ZM255.159 195.205C255.792 195.671 255.915 196.553 255.433 197.164L244.924 210.514C244.442 211.126 243.531 211.246 242.898 210.78C242.266 210.314 242.142 209.432 242.624 208.82L253.133 195.47C253.615 194.858 254.527 194.739 255.159 195.205ZM250.833 193.776L240.324 207.126C239.842 207.738 238.931 207.857 238.298 207.391C237.666 206.925 237.542 206.043 238.024 205.431L248.533 192.082C249.015 191.47 249.926 191.35 250.559 191.816C251.191 192.282 251.315 193.164 250.833 193.776Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip3_467_457)">
                            <path d="M113.231 140.626C113.231 132.249 116.671 124.214 122.795 118.291C128.919 112.367 137.224 109.039 145.885 109.039C154.545 109.039 162.851 112.367 168.974 118.291C175.098 124.214 178.539 132.249 178.539 140.626C178.539 149.004 175.098 157.038 168.974 162.962C162.851 168.885 154.545 172.213 145.885 172.213C137.224 172.213 128.919 168.885 122.795 162.962C116.671 157.038 113.231 149.004 113.231 140.626ZM137.249 127.189C136.28 127.707 135.68 128.707 135.68 129.768V151.484C135.68 152.558 136.28 153.545 137.249 154.063C138.219 154.581 139.392 154.569 140.349 154.001L158.717 143.143C159.622 142.6 160.183 141.65 160.183 140.614C160.183 139.577 159.622 138.627 158.717 138.084L140.349 127.226C139.405 126.671 138.219 126.646 137.249 127.165V127.189Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip4_467_457)">
                            <path d="M101.483 95.5313C101.531 95.5542 101.58 95.5771 101.628 95.6001C103.584 96.551 104.045 98.9129 103.084 100.815L100.505 105.916C99.8067 107.297 100.399 108.965 101.826 109.641C102.009 109.727 102.197 109.79 102.386 109.841C102.99 109.991 103.634 110.012 104.281 110.04C105.185 110.074 106.081 110.11 106.862 110.48C108.575 111.29 109.563 113.152 108.795 114.842C108.708 115.027 108.622 115.212 108.527 115.399C104.805 122.762 95.6125 125.814 87.9956 122.211C80.3786 118.608 77.2241 109.716 80.9489 102.348C84.6736 94.9796 93.8657 91.9282 101.483 95.5313ZM93.0911 116.356C92.634 116.14 92.1067 116.108 91.6253 116.268C91.144 116.428 90.748 116.766 90.5244 117.208C90.3008 117.651 90.268 118.161 90.4332 118.626C90.5984 119.092 90.9481 119.475 91.4052 119.691C91.8624 119.908 92.3897 119.939 92.871 119.779C93.3524 119.62 93.7484 119.281 93.972 118.839C94.1955 118.397 94.2283 117.887 94.0631 117.421C93.8979 116.956 93.5483 116.573 93.0911 116.356ZM87.9198 113.91C88.1433 113.468 88.1761 112.958 88.011 112.492C87.8458 112.027 87.4961 111.643 87.0389 111.427C86.5818 111.211 86.0545 111.179 85.5732 111.339C85.0918 111.499 84.6958 111.837 84.4722 112.279C84.2487 112.722 84.2159 113.232 84.3811 113.697C84.5462 114.163 84.8959 114.546 85.3531 114.762C85.8102 114.978 86.3375 115.01 86.8188 114.85C87.3002 114.691 87.6962 114.352 87.9198 113.91ZM86.9632 103.127C86.506 102.91 85.9787 102.879 85.4974 103.038C85.016 103.198 84.62 103.536 84.3964 103.979C84.1729 104.421 84.1401 104.931 84.3053 105.396C84.4705 105.862 84.8201 106.245 85.2773 106.461C85.7344 106.678 86.2617 106.709 86.7431 106.55C87.2244 106.39 87.6204 106.052 87.844 105.609C88.0676 105.167 88.1004 104.657 87.9352 104.191C87.77 103.726 87.4203 103.343 86.9632 103.127ZM94.6633 100.57C94.8869 100.128 94.9197 99.6181 94.7545 99.1524C94.5893 98.6868 94.2397 98.3037 93.7825 98.0875C93.3253 97.8712 92.7981 97.8395 92.3167 97.9993C91.8354 98.1591 91.4393 98.4973 91.2158 98.9395C90.9922 99.3818 90.9594 99.8918 91.1246 100.357C91.2898 100.823 91.6394 101.206 92.0966 101.422C92.5538 101.639 93.081 101.67 93.5624 101.511C94.0438 101.351 94.4398 101.013 94.6633 100.57Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip5_467_457)">
                            <path d="M72.4829 148.78C72.5544 154.468 77.3831 159.027 83.2633 158.957C89.1434 158.888 93.856 154.217 93.7845 148.529L93.6117 134.792C93.5402 129.104 88.7115 124.545 82.8313 124.614C76.9512 124.684 72.2385 129.355 72.3101 135.043L72.4829 148.78ZM78.0469 132.399C78.0397 131.83 78.2666 131.281 78.6777 130.874C79.0888 130.466 79.6503 130.233 80.2388 130.227C80.8273 130.22 81.3945 130.439 81.8157 130.837C82.2369 131.234 82.4776 131.778 82.4847 132.347C82.4919 132.916 82.265 133.465 81.8539 133.872C81.4428 134.28 80.8813 134.512 80.2928 134.519C79.7043 134.526 79.1371 134.307 78.7159 133.909C78.2947 133.512 78.054 132.968 78.0469 132.399ZM85.6614 137.891C85.0729 137.898 84.5057 137.678 84.0845 137.281C83.6633 136.883 83.4227 136.34 83.4155 135.771C83.4083 135.201 83.6352 134.653 84.0463 134.245C84.4574 133.838 85.0189 133.605 85.6074 133.598C86.1959 133.591 86.7632 133.811 87.1843 134.208C87.6055 134.606 87.8462 135.149 87.8533 135.718C87.8605 136.288 87.6336 136.836 87.2225 137.244C86.8115 137.651 86.2499 137.884 85.6614 137.891ZM80.0434 149.979C79.3056 149.988 78.7048 149.42 78.6958 148.707C78.6869 147.993 79.2732 147.412 80.011 147.403L81.7861 147.382L81.7645 145.665C81.7556 144.952 82.3419 144.37 83.0797 144.362C83.8175 144.353 84.4183 144.92 84.4272 145.634L84.4488 147.351L86.224 147.33C86.9618 147.321 87.5626 147.889 87.5715 148.602C87.5805 149.316 86.9942 149.897 86.2564 149.906L84.4812 149.927L84.5028 151.644C84.5118 152.358 83.9255 152.939 83.1877 152.947C82.4499 152.956 81.8491 152.389 81.8401 151.675L81.8185 149.958L80.0434 149.979Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip6_467_457)">
                            <path d="M83.587 164.23L88.2603 168.951C89.5663 167.486 90.3661 165.587 90.4128 163.505C90.4306 162.707 90.3357 161.935 90.1447 161.198C87.6832 161.657 85.4382 162.722 83.587 164.23ZM82.2925 165.429C80.6553 167.152 79.4579 169.276 78.8778 171.635C79.6301 171.852 80.4238 171.977 81.248 171.994C83.4009 172.039 85.3964 171.348 86.9712 170.155L82.2925 165.429ZM93.1622 160.958C92.7529 160.949 92.3433 160.957 91.9389 160.981C92.1336 161.804 92.2265 162.664 92.2068 163.542C92.1494 166.108 91.1382 168.43 89.5108 170.214L92.8786 173.616L102.582 164.628C100.096 162.416 96.8008 161.034 93.1622 160.958ZM81.2091 173.729C80.3009 173.71 79.4175 173.583 78.5755 173.36C78.5331 173.749 78.5074 174.145 78.4985 174.541C78.4197 178.061 79.7044 181.305 81.8809 183.803L91.5841 174.815L88.2163 171.413C86.3038 172.908 83.861 173.785 81.2091 173.729ZM107.127 176.324C107.169 175.934 107.195 175.538 107.204 175.142C107.283 171.623 105.998 168.378 103.821 165.88L94.1182 174.868L97.486 178.27C99.393 176.775 101.841 175.898 104.493 175.954C105.401 175.973 106.285 176.1 107.127 176.324ZM106.825 178.048C106.072 177.832 105.279 177.707 104.454 177.689C102.301 177.644 100.306 178.335 98.7311 179.528L103.41 184.254C105.047 182.536 106.25 180.413 106.825 178.048ZM97.4366 180.727C96.136 182.197 95.3362 184.096 95.2896 186.179C95.2717 186.976 95.3666 187.748 95.5576 188.485C98.0191 188.026 100.264 186.961 102.115 185.454L97.4421 180.733L97.4366 180.727ZM96.1915 179.469L92.8237 176.067L83.1205 185.055C85.6007 187.267 88.8959 188.649 92.5401 188.725C92.9494 188.734 93.3591 188.726 93.7635 188.702C93.5688 187.879 93.4758 187.02 93.4955 186.141C93.553 183.576 94.5642 181.253 96.1915 179.469Z" fill="#222222" />
                        </g>
                        <defs>
                            <clipPath id="clip0_467_457">
                                <rect width="61.4021" height="49.4012" fill="white" transform="matrix(0.656316 0.754486 -0.775552 0.631284 243.701 39.4335)" />
                            </clipPath>
                            <clipPath id="clip1_467_457">
                                <rect width="44.664" height="46.1685" fill="white" transform="matrix(0.0365047 0.999334 -0.999416 0.0341614 270.873 115.202)" />
                            </clipPath>
                            <clipPath id="clip2_467_457">
                                <rect width="39.6435" height="45.7086" fill="white" transform="matrix(-0.618548 0.785747 -0.805142 -0.593082 272.516 193.929)" />
                            </clipPath>
                            <clipPath id="clip3_467_457">
                                <rect width="65.3078" height="63.1744" fill="white" transform="translate(113.231 109.039)" />
                            </clipPath>
                            <clipPath id="clip4_467_457">
                                <rect width="29.8948" height="30.5106" fill="white" transform="matrix(0.451153 -0.892447 0.903965 0.427606 74.2053 115.688)" />
                            </clipPath>
                            <clipPath id="clip5_467_457">
                                <rect width="34.3457" height="28.4042" fill="white" transform="matrix(-0.0125756 -0.999921 0.999931 -0.0117676 69.0622 159.125)" />
                            </clipPath>
                            <clipPath id="clip6_467_457">
                                <rect width="28.7116" height="27.7745" fill="white" transform="matrix(0.99978 0.0209577 -0.0223964 0.999749 78.8096 160.657)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <h1>Crafty Corners</h1>
                </div>
                <div className="search-post">
                    <input type='text' placeholder="Search for Discussions or Topics" />
                </div>
                <div className="profile">
                    <button className='add-post'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 20.6154L12 3.30768M3.34619 11.9615H20.6539" stroke="#677186" strokeWidth="5.76923" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {loading && <Skeleton containerClassName="navbar-header" />}
                    <h3 style={loading ? { display: 'none' } : { display: 'inline' }} className="navbar-header">Hi, {user.first_name}</h3>
                    {loading && <Skeleton className="navbar-img" />}
                    <img style={loading ? { display: 'none' } : { display: 'inline' }} className="navbar-img" src={userPicture} alt="Profile Picture" onClick={handleDropDown} onLoad={() => setLoading(false)} />

                    {openDropDown && (
                        <DropDownItem userData={user} logout={onLogout} picture={userPicture} type={user.type} />
                    )}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='navbar'>
                <Toaster />
                <div style={{ cursor: 'pointer' }} onClick={handleNavigateHome} className='title'>
                    <svg width="82" height="80" viewBox="0 0 284 282" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M222.094 32.2117C201.503 18.7637 177.502 11.0201 152.689 9.81937C127.876 8.61864 103.196 14.0065 81.3208 25.3996C59.4458 36.7927 41.2092 53.7571 28.5854 74.456C15.9616 95.155 9.43147 118.8 9.70203 142.831C9.97258 166.862 17.0335 190.364 30.1204 210.792C43.2072 231.22 61.8214 247.797 83.9477 258.726C106.074 269.656 130.87 274.522 155.65 272.799C180.43 271.076 204.251 262.829 224.534 248.95L198.422 213.242C184.873 222.513 168.961 228.022 152.408 229.173C135.855 230.325 119.291 227.074 104.511 219.773C89.7304 212.472 77.2961 201.399 68.5541 187.753C59.8121 174.107 55.0954 158.408 54.9147 142.355C54.7339 126.302 59.096 110.507 67.5288 96.6803C75.9615 82.8534 88.1435 71.5212 102.756 63.9106C117.369 56.3 133.855 52.7009 150.43 53.503C167.005 54.3051 183.038 59.4778 196.792 68.4611L222.094 32.2117Z" fill="#A076F9" />
                        <path d="M222.094 32.2117C201.503 18.7637 177.502 11.0201 152.689 9.81937C127.876 8.61864 103.196 14.0065 81.3208 25.3996C59.4458 36.7927 41.2092 53.7571 28.5854 74.456C15.9616 95.155 9.43147 118.8 9.70203 142.831C9.97258 166.862 17.0335 190.364 30.1204 210.792C43.2072 231.22 61.8214 247.797 83.9477 258.726C106.074 269.656 130.87 274.522 155.65 272.799C180.43 271.076 204.251 262.829 224.534 248.95L198.422 213.242C184.873 222.513 168.961 228.022 152.408 229.173C135.855 230.325 119.291 227.074 104.511 219.773C89.7304 212.472 77.2961 201.399 68.5541 187.753C59.8121 174.107 55.0954 158.408 54.9147 142.355C54.7339 126.302 59.096 110.507 67.5288 96.6803C75.9615 82.8534 88.1435 71.5212 102.756 63.9106C117.369 56.3 133.855 52.7009 150.43 53.503C167.005 54.3051 183.038 59.4778 196.792 68.4611L222.094 32.2117Z" fill="#A076F9" />
                        <path d="M222.094 32.2117C201.503 18.7637 177.502 11.0201 152.689 9.81937C127.876 8.61864 103.196 14.0065 81.3208 25.3996C59.4458 36.7927 41.2092 53.7571 28.5854 74.456C15.9616 95.155 9.43147 118.8 9.70203 142.831C9.97258 166.862 17.0335 190.364 30.1204 210.792C43.2072 231.22 61.8214 247.797 83.9477 258.726C106.074 269.656 130.87 274.522 155.65 272.799C180.43 271.076 204.251 262.829 224.534 248.95L198.422 213.242C184.873 222.513 168.961 228.022 152.408 229.173C135.855 230.325 119.291 227.074 104.511 219.773C89.7304 212.472 77.2961 201.399 68.5541 187.753C59.8121 174.107 55.0954 158.408 54.9147 142.355C54.7339 126.302 59.096 110.507 67.5288 96.6803C75.9615 82.8534 88.1435 71.5212 102.756 63.9106C117.369 56.3 133.855 52.7009 150.43 53.503C167.005 54.3051 183.038 59.4778 196.792 68.4611L222.094 32.2117Z" stroke="#222222" strokeWidth="17.7196" />
                        <path d="M103.402 197.49C113.963 204.709 126.365 208.997 139.264 209.888C152.164 210.779 165.07 208.24 176.584 202.546C188.099 196.852 197.784 188.219 204.592 177.582C211.399 166.946 215.068 154.711 215.203 142.202C215.338 129.692 211.933 117.386 205.357 106.614C198.781 95.8426 189.284 87.0163 177.894 81.0908C166.505 75.1654 153.657 72.3665 140.741 72.9972C127.825 73.628 115.334 77.6643 104.619 84.6692L117.798 103.532C124.955 98.8532 133.3 96.1569 141.927 95.7356C150.555 95.3142 159.138 97.1839 166.746 101.142C174.354 105.1 180.698 110.996 185.091 118.192C189.484 125.387 191.759 133.608 191.668 141.964C191.578 150.32 189.127 158.493 184.58 165.598C180.033 172.704 173.563 178.47 165.871 182.274C158.179 186.078 149.558 187.774 140.941 187.179C132.324 186.583 124.04 183.719 116.985 178.896L103.402 197.49Z" fill="#A076F9" />
                        <path d="M103.402 197.49C113.963 204.709 126.365 208.997 139.264 209.888C152.164 210.779 165.07 208.24 176.584 202.546C188.099 196.852 197.784 188.219 204.592 177.582C211.399 166.946 215.068 154.711 215.203 142.202C215.338 129.692 211.933 117.386 205.357 106.614C198.781 95.8426 189.284 87.0163 177.894 81.0908C166.505 75.1654 153.657 72.3665 140.741 72.9972C127.825 73.628 115.334 77.6643 104.619 84.6692L117.798 103.532C124.955 98.8532 133.3 96.1569 141.927 95.7356C150.555 95.3142 159.138 97.1839 166.746 101.142C174.354 105.1 180.698 110.996 185.091 118.192C189.484 125.387 191.759 133.608 191.668 141.964C191.578 150.32 189.127 158.493 184.58 165.598C180.033 172.704 173.563 178.47 165.871 182.274C158.179 186.078 149.558 187.774 140.941 187.179C132.324 186.583 124.04 183.719 116.985 178.896L103.402 197.49Z" fill="#A076F9" />
                        <path d="M103.402 197.49C113.963 204.709 126.365 208.997 139.264 209.888C152.164 210.779 165.07 208.24 176.584 202.546C188.099 196.852 197.784 188.219 204.592 177.582C211.399 166.946 215.068 154.711 215.203 142.202C215.338 129.692 211.933 117.386 205.357 106.614C198.781 95.8426 189.284 87.0163 177.894 81.0908C166.505 75.1654 153.657 72.3665 140.741 72.9972C127.825 73.628 115.334 77.6643 104.619 84.6692L117.798 103.532C124.955 98.8532 133.3 96.1569 141.927 95.7356C150.555 95.3142 159.138 97.1839 166.746 101.142C174.354 105.1 180.698 110.996 185.091 118.192C189.484 125.387 191.759 133.608 191.668 141.964C191.578 150.32 189.127 158.493 184.58 165.598C180.033 172.704 173.563 178.47 165.871 182.274C158.179 186.078 149.558 187.774 140.941 187.179C132.324 186.583 124.04 183.719 116.985 178.896L103.402 197.49Z" stroke="#222222" strokeWidth="9.22369" />
                        <g clipPath="url(#clip0_467_457)">
                            <path d="M242.792 51.6811C244.116 50.6029 246.087 50.767 247.201 52.0483L249.216 54.3646C250.331 55.6458 250.161 57.552 248.837 58.6301L236.864 68.3758L232.075 72.2741L220.102 82.0197C218.777 83.0979 216.807 82.9338 215.692 81.6525L213.677 79.3362C212.563 78.0549 212.732 76.1488 214.057 75.0707L218.846 71.1724L216.831 68.8561C215.716 67.5748 215.886 65.6687 217.211 64.5906L222 60.6923C220.885 59.4111 221.055 57.5049 222.379 56.4268C223.704 55.3487 225.674 55.5128 226.789 56.794L231.578 52.8958C232.903 51.8176 234.873 51.9817 235.988 53.263L238.003 55.5793L242.792 51.6811ZM271.001 84.1099L266.212 88.0082L268.227 90.3246C269.341 91.6058 269.172 93.5119 267.847 94.5901L263.058 98.4883C264.173 99.7696 264.003 101.676 262.679 102.754C261.354 103.832 259.384 103.668 258.269 102.387L253.48 106.285C252.155 107.363 250.185 107.199 249.07 105.918L247.055 103.601L242.266 107.5C240.942 108.578 238.971 108.414 237.857 107.132L235.842 104.816C234.727 103.535 234.897 101.629 236.221 100.551L248.194 90.8049L252.983 86.9066L264.956 77.1609C266.281 76.0828 268.251 76.2469 269.366 77.5281L271.381 79.8445C272.495 81.1257 272.326 83.0318 271.001 84.1099ZM250.968 84.5902L246.179 88.4885L234.09 74.5904L238.879 70.6921L250.968 84.5902Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip1_467_457)">
                            <path d="M271.895 158.731C271.38 159.456 270.53 159.904 269.62 159.935L263.131 160.157L239.34 160.97C235.356 161.106 231.993 157.468 231.824 152.848C231.656 148.227 234.745 144.368 238.728 144.232C242.712 144.096 246.075 147.734 246.244 152.355C246.279 153.331 246.17 154.278 245.931 155.159L259.053 154.71L251.316 132.629L232.553 133.271C228.57 133.407 225.207 129.769 225.038 125.148C224.869 120.528 227.958 116.669 231.942 116.533C235.925 116.397 239.288 120.035 239.457 124.655C239.493 125.632 239.383 126.578 239.144 127.459L253.257 126.977L259.746 126.755C261.016 126.712 262.173 127.484 262.585 128.648L272.256 156.249C272.548 157.085 272.419 158.006 271.895 158.731Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip2_467_457)">
                            <path d="M267.261 200.604C270.162 196.919 269.425 191.653 265.615 188.846L242.614 171.903C238.805 169.097 233.36 169.81 230.459 173.495L214.695 193.52L212.944 195.745C211.975 196.976 212.22 198.727 213.493 199.664C214.765 200.602 216.575 200.364 217.544 199.134L222.144 202.522C221.176 203.753 221.421 205.504 222.693 206.442L245.694 223.385C246.966 224.322 248.777 224.085 249.746 222.854L251.497 220.629L267.261 200.604ZM239.66 180.273L225.647 198.072L221.047 194.684L235.059 176.884C236.028 175.653 237.839 175.416 239.111 176.353C240.383 177.29 240.628 179.042 239.66 180.273ZM255.159 195.205C255.792 195.671 255.915 196.553 255.433 197.164L244.924 210.514C244.442 211.126 243.531 211.246 242.898 210.78C242.266 210.314 242.142 209.432 242.624 208.82L253.133 195.47C253.615 194.858 254.527 194.739 255.159 195.205ZM250.833 193.776L240.324 207.126C239.842 207.738 238.931 207.857 238.298 207.391C237.666 206.925 237.542 206.043 238.024 205.431L248.533 192.082C249.015 191.47 249.926 191.35 250.559 191.816C251.191 192.282 251.315 193.164 250.833 193.776Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip3_467_457)">
                            <path d="M113.231 140.626C113.231 132.249 116.671 124.214 122.795 118.291C128.919 112.367 137.224 109.039 145.885 109.039C154.545 109.039 162.851 112.367 168.974 118.291C175.098 124.214 178.539 132.249 178.539 140.626C178.539 149.004 175.098 157.038 168.974 162.962C162.851 168.885 154.545 172.213 145.885 172.213C137.224 172.213 128.919 168.885 122.795 162.962C116.671 157.038 113.231 149.004 113.231 140.626ZM137.249 127.189C136.28 127.707 135.68 128.707 135.68 129.768V151.484C135.68 152.558 136.28 153.545 137.249 154.063C138.219 154.581 139.392 154.569 140.349 154.001L158.717 143.143C159.622 142.6 160.183 141.65 160.183 140.614C160.183 139.577 159.622 138.627 158.717 138.084L140.349 127.226C139.405 126.671 138.219 126.646 137.249 127.165V127.189Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip4_467_457)">
                            <path d="M101.483 95.5313C101.531 95.5542 101.58 95.5771 101.628 95.6001C103.584 96.551 104.045 98.9129 103.084 100.815L100.505 105.916C99.8067 107.297 100.399 108.965 101.826 109.641C102.009 109.727 102.197 109.79 102.386 109.841C102.99 109.991 103.634 110.012 104.281 110.04C105.185 110.074 106.081 110.11 106.862 110.48C108.575 111.29 109.563 113.152 108.795 114.842C108.708 115.027 108.622 115.212 108.527 115.399C104.805 122.762 95.6125 125.814 87.9956 122.211C80.3786 118.608 77.2241 109.716 80.9489 102.348C84.6736 94.9796 93.8657 91.9282 101.483 95.5313ZM93.0911 116.356C92.634 116.14 92.1067 116.108 91.6253 116.268C91.144 116.428 90.748 116.766 90.5244 117.208C90.3008 117.651 90.268 118.161 90.4332 118.626C90.5984 119.092 90.9481 119.475 91.4052 119.691C91.8624 119.908 92.3897 119.939 92.871 119.779C93.3524 119.62 93.7484 119.281 93.972 118.839C94.1955 118.397 94.2283 117.887 94.0631 117.421C93.8979 116.956 93.5483 116.573 93.0911 116.356ZM87.9198 113.91C88.1433 113.468 88.1761 112.958 88.011 112.492C87.8458 112.027 87.4961 111.643 87.0389 111.427C86.5818 111.211 86.0545 111.179 85.5732 111.339C85.0918 111.499 84.6958 111.837 84.4722 112.279C84.2487 112.722 84.2159 113.232 84.3811 113.697C84.5462 114.163 84.8959 114.546 85.3531 114.762C85.8102 114.978 86.3375 115.01 86.8188 114.85C87.3002 114.691 87.6962 114.352 87.9198 113.91ZM86.9632 103.127C86.506 102.91 85.9787 102.879 85.4974 103.038C85.016 103.198 84.62 103.536 84.3964 103.979C84.1729 104.421 84.1401 104.931 84.3053 105.396C84.4705 105.862 84.8201 106.245 85.2773 106.461C85.7344 106.678 86.2617 106.709 86.7431 106.55C87.2244 106.39 87.6204 106.052 87.844 105.609C88.0676 105.167 88.1004 104.657 87.9352 104.191C87.77 103.726 87.4203 103.343 86.9632 103.127ZM94.6633 100.57C94.8869 100.128 94.9197 99.6181 94.7545 99.1524C94.5893 98.6868 94.2397 98.3037 93.7825 98.0875C93.3253 97.8712 92.7981 97.8395 92.3167 97.9993C91.8354 98.1591 91.4393 98.4973 91.2158 98.9395C90.9922 99.3818 90.9594 99.8918 91.1246 100.357C91.2898 100.823 91.6394 101.206 92.0966 101.422C92.5538 101.639 93.081 101.67 93.5624 101.511C94.0438 101.351 94.4398 101.013 94.6633 100.57Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip5_467_457)">
                            <path d="M72.4829 148.78C72.5544 154.468 77.3831 159.027 83.2633 158.957C89.1434 158.888 93.856 154.217 93.7845 148.529L93.6117 134.792C93.5402 129.104 88.7115 124.545 82.8313 124.614C76.9512 124.684 72.2385 129.355 72.3101 135.043L72.4829 148.78ZM78.0469 132.399C78.0397 131.83 78.2666 131.281 78.6777 130.874C79.0888 130.466 79.6503 130.233 80.2388 130.227C80.8273 130.22 81.3945 130.439 81.8157 130.837C82.2369 131.234 82.4776 131.778 82.4847 132.347C82.4919 132.916 82.265 133.465 81.8539 133.872C81.4428 134.28 80.8813 134.512 80.2928 134.519C79.7043 134.526 79.1371 134.307 78.7159 133.909C78.2947 133.512 78.054 132.968 78.0469 132.399ZM85.6614 137.891C85.0729 137.898 84.5057 137.678 84.0845 137.281C83.6633 136.883 83.4227 136.34 83.4155 135.771C83.4083 135.201 83.6352 134.653 84.0463 134.245C84.4574 133.838 85.0189 133.605 85.6074 133.598C86.1959 133.591 86.7632 133.811 87.1843 134.208C87.6055 134.606 87.8462 135.149 87.8533 135.718C87.8605 136.288 87.6336 136.836 87.2225 137.244C86.8115 137.651 86.2499 137.884 85.6614 137.891ZM80.0434 149.979C79.3056 149.988 78.7048 149.42 78.6958 148.707C78.6869 147.993 79.2732 147.412 80.011 147.403L81.7861 147.382L81.7645 145.665C81.7556 144.952 82.3419 144.37 83.0797 144.362C83.8175 144.353 84.4183 144.92 84.4272 145.634L84.4488 147.351L86.224 147.33C86.9618 147.321 87.5626 147.889 87.5715 148.602C87.5805 149.316 86.9942 149.897 86.2564 149.906L84.4812 149.927L84.5028 151.644C84.5118 152.358 83.9255 152.939 83.1877 152.947C82.4499 152.956 81.8491 152.389 81.8401 151.675L81.8185 149.958L80.0434 149.979Z" fill="#222222" />
                        </g>
                        <g clipPath="url(#clip6_467_457)">
                            <path d="M83.587 164.23L88.2603 168.951C89.5663 167.486 90.3661 165.587 90.4128 163.505C90.4306 162.707 90.3357 161.935 90.1447 161.198C87.6832 161.657 85.4382 162.722 83.587 164.23ZM82.2925 165.429C80.6553 167.152 79.4579 169.276 78.8778 171.635C79.6301 171.852 80.4238 171.977 81.248 171.994C83.4009 172.039 85.3964 171.348 86.9712 170.155L82.2925 165.429ZM93.1622 160.958C92.7529 160.949 92.3433 160.957 91.9389 160.981C92.1336 161.804 92.2265 162.664 92.2068 163.542C92.1494 166.108 91.1382 168.43 89.5108 170.214L92.8786 173.616L102.582 164.628C100.096 162.416 96.8008 161.034 93.1622 160.958ZM81.2091 173.729C80.3009 173.71 79.4175 173.583 78.5755 173.36C78.5331 173.749 78.5074 174.145 78.4985 174.541C78.4197 178.061 79.7044 181.305 81.8809 183.803L91.5841 174.815L88.2163 171.413C86.3038 172.908 83.861 173.785 81.2091 173.729ZM107.127 176.324C107.169 175.934 107.195 175.538 107.204 175.142C107.283 171.623 105.998 168.378 103.821 165.88L94.1182 174.868L97.486 178.27C99.393 176.775 101.841 175.898 104.493 175.954C105.401 175.973 106.285 176.1 107.127 176.324ZM106.825 178.048C106.072 177.832 105.279 177.707 104.454 177.689C102.301 177.644 100.306 178.335 98.7311 179.528L103.41 184.254C105.047 182.536 106.25 180.413 106.825 178.048ZM97.4366 180.727C96.136 182.197 95.3362 184.096 95.2896 186.179C95.2717 186.976 95.3666 187.748 95.5576 188.485C98.0191 188.026 100.264 186.961 102.115 185.454L97.4421 180.733L97.4366 180.727ZM96.1915 179.469L92.8237 176.067L83.1205 185.055C85.6007 187.267 88.8959 188.649 92.5401 188.725C92.9494 188.734 93.3591 188.726 93.7635 188.702C93.5688 187.879 93.4758 187.02 93.4955 186.141C93.553 183.576 94.5642 181.253 96.1915 179.469Z" fill="#222222" />
                        </g>
                        <defs>
                            <clipPath id="clip0_467_457">
                                <rect width="61.4021" height="49.4012" fill="white" transform="matrix(0.656316 0.754486 -0.775552 0.631284 243.701 39.4335)" />
                            </clipPath>
                            <clipPath id="clip1_467_457">
                                <rect width="44.664" height="46.1685" fill="white" transform="matrix(0.0365047 0.999334 -0.999416 0.0341614 270.873 115.202)" />
                            </clipPath>
                            <clipPath id="clip2_467_457">
                                <rect width="39.6435" height="45.7086" fill="white" transform="matrix(-0.618548 0.785747 -0.805142 -0.593082 272.516 193.929)" />
                            </clipPath>
                            <clipPath id="clip3_467_457">
                                <rect width="65.3078" height="63.1744" fill="white" transform="translate(113.231 109.039)" />
                            </clipPath>
                            <clipPath id="clip4_467_457">
                                <rect width="29.8948" height="30.5106" fill="white" transform="matrix(0.451153 -0.892447 0.903965 0.427606 74.2053 115.688)" />
                            </clipPath>
                            <clipPath id="clip5_467_457">
                                <rect width="34.3457" height="28.4042" fill="white" transform="matrix(-0.0125756 -0.999921 0.999931 -0.0117676 69.0622 159.125)" />
                            </clipPath>
                            <clipPath id="clip6_467_457">
                                <rect width="28.7116" height="27.7745" fill="white" transform="matrix(0.99978 0.0209577 -0.0223964 0.999749 78.8096 160.657)" />
                            </clipPath>
                        </defs>
                    </svg>

                    <h1>Crafty Corners</h1>
                </div>
                <div className="guest-buttons">
                    <button className="guest-login" onClick={() => setIsOpen(true)}>Log In</button>

                    <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>

            </div>
        );
    }


}

export default Navbar;
