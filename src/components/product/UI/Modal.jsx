import { Fragment } from "react";
import { createPortal } from "react-dom";

import classes from "./css/Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${classes.modal} ${props.className}`}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const backdropElement = document.getElementById("overlay-root");
const overlayElement = document.getElementById("overlay-root");

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose} />, backdropElement)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayElement)}
    </Fragment>
  );
};

export default Modal;
