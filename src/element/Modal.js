import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { Button } from "./index";
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
        <Button _onClick={props.onCloseModal} text="알겠어요!"></Button>
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
  width: 80%;
  z-index: 100;
  overflow: hidden;
  header {
    background: #4f005f;
    padding: 1rem;
  }

  header h2 {
    margin: 0;
    color: white;
  }

  content {
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
