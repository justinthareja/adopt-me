import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Doesn't trap focus in a modal
// bad accessability
const Modal = ({ children }) => {
  // useRef creates a DOM element that persists through re-renders
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // returning a function in useEffect is considered cleanup function
    // equivalent to componentWillUnmount
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // renders to a separate div outside app's root
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
