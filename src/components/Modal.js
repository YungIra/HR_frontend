const Modal = ({ isVisible, title, content, onClose }) => {

    return !isVisible ? null : (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <span className="modal-close" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className="modal-body">
                    <div className="modal-content">{content}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal