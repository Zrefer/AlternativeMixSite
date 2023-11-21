import { FC, MouseEventHandler, ReactNode, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import genStyles from "../../styles/generalStyles.module.css";
import React from "react";

import CloseIcon from "../../../public/images/close-icon.svg";

interface ModalProps {
  onClose?: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) => {
      if (!onClose) return;
      if (evt.key !== "Escape") return;
      onClose();
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  const handleOverlayClose: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!onClose) return;
    if (!event.target) return;
    if (event.target !== overlayRef.current) return;
    onClose();
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modalOverlay}
      onMouseDown={handleOverlayClose}
      ref={overlayRef}
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={`${genStyles.button} ${styles.closeButton}`}
          onClick={onClose}
        >
          <CloseIcon className={styles.closeIcon} />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modals")!
  );
};
export default Modal;
