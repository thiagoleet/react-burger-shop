import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/aux-hoc";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <Aux>
      <Backdrop clicked={props.modalClosed} show={props.show} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
