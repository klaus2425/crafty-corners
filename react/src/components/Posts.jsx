const Posts = () => {
    return (
        <div className="post">
                    <div className="post-header">
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
                        <div className="post-footers">
                    </div>
                </div>
    )
}

export default Posts;