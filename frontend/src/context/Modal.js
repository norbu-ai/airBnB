
import React, { useRef, useState, useContext } from "react"
import ReactDOM from 'react-dom'; 
import './Modal.css'; 

const ModalContext = React.createContext(); 

export function ModalProvider({children}) {

    const modalRef = useRef(); 
    const [modalContent, setModalContent] = useState(null); 
    const [onModalClose, setOnModalClose] = useState(null); 

    const closeModal = () => {
        setModalContent(null); //clear modal contents
        if(typeof onModalClose === 'function'){
        //if cb-func truthy, call cb-func & reset it to null
            setOnModalClose(null); 
            onModalClose(); 
        }
    }; 

    const contextValue = { 
        modalRef, //reference to model div 
        modalContent, //react component to render inside modal
        setModalContent, //function to set react component to render inside modal
        setOnModalClose, //function to set the cb-fun to be called when model is closing
        closeModal, //function to close the modal
    }   

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}; 

// Modal component 
export const Modal = () => {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext); 
    if (!modalRef || !modalRef.current || !modalContent) return null; 

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={closeModal} />
            <div id="modal-content">{modalContent}</div>
        </div>,
        modalRef.current
    ); 
}

// custom useContext hook 
export const useModal = () => useContext(ModalContext); 