// DeleteConfirmationModal.jsx

import React from 'react';
import './DeleteConfirmationModal.scss'
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const DeleteConfirmationModal = ({ showDeleteModal, closeDeleteModal, onConfirm }) => {
    return (

        <div className="del-modal">
            <div className="del-modal-content">
                <div className="warnTitle">
                    <div className="warnSymbol">
                        <NotInterestedIcon />
                    </div>
                    <div className="warnText">
                        <span>Warning</span>
                    </div>
                </div>
                <div className="warnTab">
                    <div className="warnPara">
                        <p>
                            Are you sure you want to delete the part family?<br />
                            This will have an impact across all the plants.
                        </p>
                    </div>
                </div>
                <div className="warnButtons">

                    <button className="cancelButton" onClick={closeDeleteModal}>Cancel</button>
                    <button className="confirmButton" onClick={onConfirm}>Confirm</button>
                </div>


            </div>
        </div>

    );
};

export default DeleteConfirmationModal;
/*<div className="confirmation-buttons">

                </div>*/