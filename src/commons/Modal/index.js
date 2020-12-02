import React from 'react';
import './modal.css';
import FontAwesome from 'react-fontawesome';

const Modal = (props) => {
  const { closeModal } = props;



  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <i class="fa fa-times-circle" onClick={closeModal}
            style={{
            color: '#000000',
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 0,
            position: 'absolute',
            top: '0.3rem',
            right: '0.5rem',
            }}
        ></i>
        {props.children}
      </div>
    </div>
  );
};


export default Modal;
