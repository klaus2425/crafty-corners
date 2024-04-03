const NotVerified = () => {

  const onLogout = () => {
    axiosClient.post('/logout')
        .then(() => {
            setUser({});
            setToken(null);
            window.location.reload();
        })
  }

  return (
          <div style={{ height: "100dvh" }} >
              <div>
                  <span className='landing-title'>Crafty <br /> Corners</span>
                  <br />
                  <span className='landing-sub'>Cultivate you hobbies <br /> with a wide community</span>
              </div>
          </div>

  )

}


export default NotVerified;