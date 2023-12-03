import React, {useState} from 'react';
import './AddPF.scss';
import '../PartFamilyMaster/PFMaster.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';


function Modal({showModal, closeModal, onAdd, onSuccess}) {
    const [inputValue, setInputValue] = useState('');
    const [selectedShopType, setSelectedShopType] = useState('');
    const [selectedShopTypes, setSelectedShopTypes] = useState([]);
    const [selectedCriticality, setSelectedCriticality] = useState([]);

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

    const handleSubmit = async () => {
        try {

            const newData = {
                partFamilyName: inputValue, applicableShopTypes: selectedShopTypes, criticality: selectedCriticality
            };


            const response = await axios.post('http://localhost:8080/PFMaster', newData).catch(err => {
                console.log({err})
            });

            if (response.status === 200) {

                onAdd(response.data);

                closeModal();
                setInputValue('');
                setSelectedShopType('');
                setSelectedShopTypes([]);
                setSelectedCriticality([]);
            } else {
                console.error('Request failed with status:', response.status);

            }
        }
        catch (error) {
            console.error('Error fetching data:', error);}


    };


    const removeShopType = (typeToRemove) => {
        setSelectedShopTypes(selectedShopTypes.filter((type) => type !== typeToRemove));
    };

    return (<div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
            <div className="addPFTitle">
                <label className="addPFTitleContent">Add Part Family</label>
                <div className="greenbar"></div>
            </div>
            <div className="addPFBox">
                <div className="addPFName">
                    <div className="addPFNameContent">
                        <label>Part Family Name</label>
                    </div>

                    <input type="text" className="addPFNameField" value={inputValue}
                           onChange={handleChange}/>

                </div>
                <div className="addPFPara">
                    <p>* Part family name should have all caps<br/>
                        * Use descriptive and easy to understand names<br/>
                        * Avoid using repetitive names eg.STEERING 1, STEERING 2 etc<br/>
                        * Special characters are not allowed</p>

                </div>

                <div className="addPFShopType">
                    <div className="addPFShopTypeContent">
                        <label>Applicable Shop Types</label>
                    </div>

                    <select
                        className="addPFShopTypeSelect"
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
            <div className="addPFType">
                <div className="addPFTypeContent">
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

            <div className="addPFCriticalityContent">
                <label>Tag Criticality</label>
            </div>
            <div className="addPFCriticalitySelector">
                <div className="addPFCriticalitySelectorSafety">
                    <input type="checkbox" className="checkBox" value="Safety"
                           onChange={handleCriticalityChange} checked={selectedCriticality.includes('Safety')}/>
                    <label>Safety</label>
                </div>
                <div className="addPFCriticalitySelectorEmission">
                    <input type="checkbox" className="checkBox" value="Emission"
                           onChange={handleCriticalityChange} checked={selectedCriticality.includes('Emission')}/>
                    <label>Emission</label>
                </div>
                <div className="addPFCriticalitySelectorQuality">
                    <input type="checkbox" className="checkBox" value="Quality"
                           onChange={handleCriticalityChange} checked={selectedCriticality.includes('Quality')}/>
                    <label>Quality</label>
                </div>
            </div>
            <div className="addPFButtons">
                <button className="addPFCancelButton" onClick={closeModal}>Cancel</button>
                <button className="addPFAddButton" onClick={handleSubmit}>Add</button>
            </div>
        </div>
    </div>);
}

export default Modal;
