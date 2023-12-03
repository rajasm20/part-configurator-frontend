import React from 'react';

const SuccessModal = ({ closeModal }) => {
    return (
        <div className="modal show">
            <div className="modal-content">
                <div className="successTitle">
                    <label className="successTitleContent">Part Family Added Successfully</label>
                    <div className="greenbar"></div>
                </div>
                <div className="successMessage">
                    <p>Your part family has been added successfully!</p>
                </div>
                <div className="successButtons">
                    <button className="successCloseButton" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
