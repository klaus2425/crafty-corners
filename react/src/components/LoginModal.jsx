import React from 'react';



export default function LoginModal(props) {
    if(!props.isOpen) return null;
    return (
        <>
            <div className='overlay'>
                <div className='modal'>
                    <div className='close-login'>
                        <button onClick={() => props.setIsOpen(false)}>X</button>
                    </div>
                    <div className='login-main'>LoginModal</div>
                    
                </div>
            </div>
        </>
       
  )
}
