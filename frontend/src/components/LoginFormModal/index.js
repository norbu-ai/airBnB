import React, { useState } from 'react'; 
import { Modal } from '../../context/Modal'; 
import LoginForm from './LoginForm';
import './LoginForm.css'; 

function LoginFormModal( {showLoginModal, setShowLoginModal }) {
    // const [showModal, setShowModal] = useState(false); 

    return (
        <>
        {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
                <LoginForm setShowLoginModal={setShowLoginModal} />
            </Modal>
            )
        }    
        </>
    )
}

export default LoginFormModal; 
