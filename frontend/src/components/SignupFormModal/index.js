import React, { useState } from 'react'; 
import { Modal } from '../../context/Modal'; 
import SignupForm from './SignupForm';


function SignupFormModal( {showSignupModal, setShowSignupModal }){
    // const [showModal, setShowModal] = useState(false)

    return (
        <>

        {showSignupModal && (
            <Modal onClose={() => setShowSignupModal(false)}>
                <SignupForm setShowSignupModal={setShowSignupModal} />
            </Modal>
            )
        }
        </>
    ); 
}


export default SignupFormModal; 