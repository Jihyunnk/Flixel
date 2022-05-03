import ReactDOM from 'react-dom';

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div>
      <div className="modal--container" onClick={() => onClose()}>
        <div className="modal">
          <div className="modal--header">
            <h2> Add Rating </h2>
          </div>
          <div className="modal--content"> {children} </div>
        </div>
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default Modal;
