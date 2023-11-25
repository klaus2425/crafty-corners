const Posts = () => {
    return (
        <div className="post">
                    <div className="post-header" id="posts">
                        <div className="left">
                            <img className='post-image' src="/kafka.jpg" alt="" />
                            <div className='post-user'>
                                <h4>Kafka</h4>
                                <span id='post-time'>2 hours ago</span>
                            </div>
                        </div>
                        <div className="right">
                            <span>/Singing</span>
                        </div>
                        </div>
                        <div className="post-content">
                            <img className='post-image'src="/kafkasing.jpg" alt="" />
                        </div>
                        <div className="post-footer">
                            <div className="like">
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                    <path d="M6.30508 19.7033L16.1546 28.9559C16.4939 29.2746 16.6635 29.434 16.8636 29.4732C16.9536 29.4909 17.0463 29.4909 17.1364 29.4732C17.3364 29.434 17.506 29.2746 17.8453 28.9559L27.6948 19.7033C30.4661 17.1 30.8026 12.816 28.4719 9.81193L28.0336 9.24707C25.2453 5.65332 19.6486 6.25602 17.6894 10.361C17.4127 10.9409 16.5873 10.9409 16.3105 10.361C14.3513 6.25602 8.75457 5.65332 5.96632 9.24706L5.52806 9.81193C3.1973 12.816 3.53383 17.1 6.30508 19.7033Z" stroke="#677186" stroke-width="2.83333"/>
                                </svg>
                                <span className="count">1000</span>
                            </div>
                            <div className="comments"></div>
                        </div>
                </div>
    )
}

export default Posts;