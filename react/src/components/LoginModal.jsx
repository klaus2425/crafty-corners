import React from 'react';



export default function LoginModal(props) {
    if(!props.isOpen) return null;
    return (
        <>
            <div className='overlay'>
                <div className='modal'>
                    <div>LoginModal</div>
                    <button onClick={() => props.setIsOpen(false)}>Button</button>
                </div>
            </div>
        </>
       
  )
}
