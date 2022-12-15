
import React, { useRef, useState, useContext, useEffect } from "react"
import ReactDOM from 'react-dom'; 
import './Modal.css'; 

const ModalContext = React.createContext(); 

export function ModalProvider({children}) {

    const modalRef = useRef(); 
    const [value, setValue] = useState(); 

    useEffect(() => {
        setValue(modalRef.current); 
    }, [])

    // const closeModal = () => {
    //     setModalContent(null); //clear modal contents
    //     if(typeof onModalClose === 'function'){
    //     //if cb-func truthy, call cb-func & reset it to null
    //         setOnModalClose(null); 
    //         onModalClose(); 
    //     }
    // }; 

    // const contextValue = { 
    //     modalRef, //reference to model div 
    //     modalContent, //react component to render inside modal
    //     setModalContent, //function to set react component to render inside modal
    //     setOnModalClose, //function to set the cb-fun to be called when model is closing
    //     closeModal, //function to close the modal
    // }   

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}; 

// Modal component 
export const Modal = ({ onClose, children }) => {
    const modalNode = useContext(ModalContext); 
    if (!modalNode) return null; 

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">{children}</div>
        </div>,
        modalNode
    ); 
}

