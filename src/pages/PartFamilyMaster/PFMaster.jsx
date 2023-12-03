import arrow from '../../assets/arrow_back_black_24dp.png';
import './PFMaster.scss';
import '../../styles/colorCodes.scss';
import {useEffect, useState} from "react";
import Modal from "../AddPF/AddPF.jsx";
import { Virtuoso } from 'react-virtuoso';
import SuccessModal from "../SuccessModal/SuccessModal.jsx";
import EditModal from "../EditPF/EditPF.jsx";
import axios from "axios";
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import {useNavigate} from "react-router-dom";




const PFList = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const isEditDisabled = selectedRows.length !== 1;
    const isDeleteDisabled = selectedRows.length === 0;
    const isAddDisabled = selectedRows.length !== 0;

    const navigate = useNavigate();

    const handleClick = () => {

        navigate('/');
    };

    const openDeleteModal = () => {
        console.log("open");
        setShowDeleteModal(true);

    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);


    };



    const closeEditModal = () => {
        setShowEditModal(false);
    };





    const handleAddData = (newData) => {

        setTableData([...tableData, newData]);
    };





    const handleRowToggle = (row) => {
        if (selectedRows.includes(row)) {
            setSelectedRows(selectedRows.filter((selectedRow) => selectedRow !== row));
        } else {
            setSelectedRows([...selectedRows, row]);
        }
    };

    const handleSelectAllToggle = () => {
        setSelectAll(!selectAll);

        if (!selectAll) {
            setSelectedRows([...tableData]);
        } else {
            setSelectedRows([]);
        }
    };

    const openEditModal = () => {
        if (selectedRows.length === 1) {
            setEditedData(selectedRows[0]);
            setShowEditModal(true);
        }
    };
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/PFMaster');
            const data = response.data;
            setTableData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditUpdate =(updatedData) => {



        // Update the selected rows in the tableData array
        setTableData((prevData) => {
            return prevData.map((row) => {
                if (selectedRows.includes(row)) {
                    setSelectedRows([]);
                    return updatedData;
                }
                return row;
            });
        });
    };

    const handleDelete = async () => {
        setShowDeleteModal(true);
        try {
            for (const selectedRow of selectedRows) {
                const rowId = selectedRow.uuid;
                await axios.delete(`http://localhost:8080/PFMaster/${rowId}`);
            }

            // Refresh the table data
            await fetchData();


            setSelectedRows([]);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
        closeDeleteModal();
    };

    return (
        <>
            <div className="backTab">
                <div className="backButton" onClick={handleClick}>
                    <img className="backArrow" src={arrow} alt="backarrow"/>

                </div>
                <h1>Part Family Master List</h1>
            </div>

            <div className="main-tab">
                <div className="partFamilyTab">
                       <h2>Part Family Master</h2>
                       <div className="partFamilyTabCounter">{tableData.length}</div>
                </div>
                <div className="whiteTab"></div>

            </div>
            <div className="displayTable">
                {loading? (
                    <p>Loading ......</p>
                    ) : (
                    <Virtuoso
                        style={{ height: '100%', width: '100%' }}
                        totalCount={tableData.length + 1} //
                        itemContent={(index) => {
                            if (index === 0) {
                                // Header row
                                return (
                                    <div className="header-row" key={index}>
                                        <div className="serial">
                                        <div>
                                            <input type="checkbox" className="selectAll" checked={selectAll} onChange={handleSelectAllToggle} />
                                        </div>
                                        <div>#</div>
                                        </div>
                                        <div className="header-cell-pfname">Part Family</div>
                                        <div className="header-cell-shopType">Applicable Shops</div>
                                        <div className="header-cell-criticality">Critical To</div>
                                        <div className="header-cell-updatedBy">Updated By</div>
                                        <div className="header-cell-updatedOn">Last Updated On</div>
                                    </div>
                                );
                            }

                            const item = tableData[index - 1];
                            const dateObject = new Date(item.lastUpdatedOn);
                            const timeString = dateObject.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            });
                            const shopTypes = item.applicableShopTypes ? item.applicableShopTypes.join(', ') : '';
                            const criticalities = item.criticality ? item.criticality.join(', ') : '';
                            return (
                                <div className="table-row" key={index}>
                                    <div className="table-cell-check">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item)}
                                            onChange={() => handleRowToggle(item)}

                                        />

                                    </div>
                                    <div className="table-cell-index">{index}</div>
                                    <div className="table-cell-pfname">{item.partFamilyName}</div>
                                    <div className="table-cell-shopType">{shopTypes}</div>
                                    <div className="table-cell-criticality">{criticalities}</div>
                                    <div className="table-cell-updatedBy">{item.updatedBy}</div>
                                    <div className="table-cell-updatedOn">
                                        {timeString} {dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </div>
                                </div>
                            );
                        }}
                    />
                )}
            </div>

            <div className="functionButtons">
                <button className="customiseButton">CUSTOMISE TABLE</button>
                <div className="delete">
                <button className={`deleteButton ${isDeleteDisabled ? 'disabled' : ''}`} onClick={openDeleteModal} disabled={isDeleteDisabled}>DELETE</button>
                <DeleteConfirmationModal
                    showDeleteModal={showDeleteModal}
                    closeDeleteModal={closeDeleteModal}
                    onConfirm={handleDelete}
                />
                </div>
                <div className="edit">
                    <button className={`editButton ${isEditDisabled ? 'disabled' : ''}`} onClick={openEditModal}>EDIT</button>
                    <EditModal showModal={showEditModal} closeModal={closeEditModal}  data={editedData} onUpdate={handleEditUpdate}/>
                </div>

                <div className="add">
                    <button className={`addButton ${isAddDisabled ? 'disabled' : ''}`} onClick={openModal}>ADD PART FAMILY</button>
                    <Modal showModal={showModal} closeModal={closeModal} onAdd={handleAddData} />

                </div>
            </div>

        </>
    );
}

export default PFList;

