import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

const Backdrop = (props) => {
  return <BackdropEl onClick={props.onCloseModal} />;
};
const ModalOverlay = (props) => {
  return (
    <ModalEl>
      <header>
        <h2>{props.title}</h2>
      </header>
      <div>
        <p>{props.message}</p>
      </div>
      <div>{props.children}</div>
      <footer>
        <button onClick={props.onCloseModal}>알겠어요!</button>
      </footer>
    </ModalEl>
  );
};

const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onCloseModal={props.onCloseModal}
        >{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

const BackdropEl = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;
const ModalEl = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: fixed;
  top: 25vh;
  left: 10%;
  width: 60%;
  height:25vh;
  z-index: 100;
  overflow: hidden;

  button{
    font-size:18px;
    background-color:transparent;
    width: 50%;
    margin:auto;
    cursor:pointer;
    &:hover{
      box-shadow: 5px 8px #888888;
    }
  }

  header {
    background: #14B885;
    padding: 1rem;
    
  }

  header h2 {
    margin: 0;
    color: white;
  }

  p {
    margin: auto;
    padding: 1rem;
  }
  footer {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }
  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Modal;
