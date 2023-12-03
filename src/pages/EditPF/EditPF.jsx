import React, {useEffect, useState} from 'react';
import './EditPF.scss';
import '../PartFamilyMaster/PFMaster.jsx';
import axios from "axios";

function EditModal({ showModal, closeModal, data, onUpdate }) {
    const [inputValue, setInputValue] = useState('');
    const [selectedShopType, setSelectedShopType] = useState('');
    const [selectedShopTypes, setSelectedShopTypes] = useState([]);
    const [selectedCriticality, setSelectedCriticality] = useState([]);

    useEffect(() => {
        if (data) {
            setInputValue(data.partFamilyName || '');
            setSelectedShopType(data.selectedShopType || '');
            setSelectedShopTypes(data.applicableShopTypes || []);
            setSelectedCriticality(data.criticality || []);
        }
        else {
            // Clear state when data is null (modal is closed or no data provided)
            setInputValue('');
            setSelectedShopType('');
            setSelectedShopTypes([]);
            setSelectedCriticality([]);
        }
    }, [data]);
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedShopType(selectedValue);
        if (selectedValue && !selectedShopTypes.includes(selectedValue)) {
            setSelectedShopTypes([...selectedShopTypes, selectedValue]);
        }
    };

    const handleCriticalityChange = (e) => {
        const selectedValue = e.target.value;
        if (e.target.checked) {
            setSelectedCriticality([...selectedCriticality, selectedValue]);
        } else {
            setSelectedCriticality(selectedCriticality.filter((c) => c !== selectedValue));
        }
    };


    const removeShopType = (typeToRemove) => {
        setSelectedShopTypes(selectedShopTypes.filter((type) => type !== typeToRemove));
    };

    const handleEdit = async () => {
        try {
            const updatedData = {
                ...data,
                partFamilyName: inputValue,
                applicableShopTypes: selectedShopTypes,
                criticality: selectedCriticality,
            };


            const response = await fetch(`http://localhost:8080/PFMaster/${data.uuid}`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                onUpdate(responseData);
                closeModal();
            } else {

                console.error('Error updating data:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }

};


    return (<div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
            <div className="editPFTitle">
                <label className="editPFTitleContent">Edit Part Family</label>
                <div className="greenbar"></div>
            </div>
            <div className="editPFBox">
                <div className="editPFName">
                    <div className="editPFNameContent">
                        <label>Part Family Name</label>
                    </div>

                    <input type="text" className="editPFNameField" value={inputValue} onChange={handleChange}
                           />

                </div>
                <div className="editPFPara">
                    <p>* Part family name should have all caps<br/>
                        * Use descriptive and easy to understand names<br/>
                        * Avoid using repetitive names eg.STEERING 1, STEERING 2 etc<br/>
                        * Special characters are not allowed</p>

                </div>

                <div className="editPFShopType">
                    <div className="editPFShopTypeContent">
                        <label>Applicable Shop Types</label>
                    </div>
                    <select
                        className="editPFShopTypeSelect"
                        value={selectedShopType}
                        onChange={handleSelectChange}
                    >
                        <option value="">Select Shop Type</option>
                        <option value="Cab">Cab</option>
                        <option value="Chassis">Chassis</option>
                        <option value="Engine">Engine</option>
                        <option value="Paint">Paint</option>
                        <option value="Xenon Trim">Xenon Trim</option>
                        <option value="Front Axel">Front Axel</option>
                        <option value="Rear Axel">Rear Axel</option>
                    </select>
                </div>
            </div>
            <div className="editPFType">
                <div className="editPFTypeContent">
                    <label>Shop Types</label>
                </div>
                <div className="selected-shop-types-row">
                    {selectedShopTypes.map((type, index) => (<div key={index} className="selected-shop-type-row">
                        {type}
                        <span
                            className="remove-shop-type"
                            onClick={() => removeShopType(type)}
                        >
                  &times;
                </span>
                    </div>))}
                </div>
            </div>

            <div className="editPFCriticalityContent">
                <label>Tag Criticality</label>
            </div>
            <div className="editPFCriticalitySelector">
                <div className="editPFCriticalitySelectorSafety">
                    <input type="checkbox" className="checkBox" value="Safety" checked={selectedCriticality.includes('Safety')}
                           onChange={(e) => handleCriticalityChange(e, 'Safety')}
                           />
                    <label>Safety</label>
                </div>
                <div className="editPFCriticalitySelectorEmission">
                    <input type="checkbox" className="checkBox" value="Emission" checked={selectedCriticality.includes('Emission')}
                           onChange={(e) => handleCriticalityChange(e, 'Emission')}
                        />
                    <label>Emission</label>
                </div>
                <div className="editPFCriticalitySelectorQuality">
                    <input type="checkbox" className="checkBox" value="Quality" checked={selectedCriticality.includes('Quality')}
                           onChange={(e) => handleCriticalityChange(e, 'Quality')}/>

                    <label>Quality</label>
                </div>
            </div>
            <div className="editPFButtons">
                <button className="editPFCancelButton" onClick={closeModal}>Cancel</button>
                <button className="editPFConfirmButton" onClick={handleEdit} >Confirm</button>
            </div>
        </div>
    </div>);
}

export default EditModal;
