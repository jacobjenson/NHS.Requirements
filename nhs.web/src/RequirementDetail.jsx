/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function RequirementDetail({ requirement, onClose }) {
    const [staff, setStaff] = useState([]);
    const [assignedTo, setAssignedTo] = useState(requirement.assignedTo?.id || "0");
    const [currentStatus, setCurrentStatus] = useState(requirement.status || "1");
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5157/staff')
            .then(response => response.json())
            .then(data => {
                setStaff(data);
            })
            .catch(error => {
                console.error("There was an error fetching the staff list", error);
            });
    }, []);

    const handleAssignedToChange = (e) => {
        const postValue = e.target.value == "0" ? "" : e.target.value;
        const selectedValue = e.target.value;

        fetch(`http://localhost:5157/assign/${requirement.id}/${postValue}`, {
            method: 'GET'
        })
            .then(() => {
                setAssignedTo(selectedValue);
                setIsSaved(true);  // Show "saved" label
                setTimeout(() => setIsSaved(false), 3000);  // Hide "saved" label after 3 seconds
            })
            .catch(error => {
                console.error("There was an error updating the requirement", error);
            });
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;

        fetch(`http://localhost:5157/update-status/${requirement.id}/${newStatus}`, {
            method: 'GET'
        })
            .then(() => {
                setCurrentStatus(newStatus);
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 3000);
            })
            .catch(error => {
                console.error("There was an error updating the requirement status", error);
            });
    };

    return (
        <div className="requirement-detail">
            <h2>Requirement Detail</h2>
            <p><strong>ID:</strong> {requirement.id}</p>
            <p><strong>Title:</strong> {requirement.title}</p>
            <p><strong>Description:</strong> {requirement.description}</p>
            <p><strong>Date Created:</strong> {new Date(requirement.dateCreated).toLocaleDateString()}</p>
            <p><strong>Status:</strong>
                <select value={currentStatus} onChange={handleStatusChange}>
                    <option value="1">Open</option>
                    <option value="2">Closed</option>
                </select>
            </p>

            <p><strong>Assigned To:</strong>
                <select value={assignedTo} onChange={handleAssignedToChange}>
                    <option value="0">Unassigned</option>
                    {staff.map(person => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>
            </p>
            <p>
                {isSaved && <span>Saved!</span>}  {/* Show "Saved!" label if isSaved is true */}
            </p>
            <button onClick={onClose}>Close Detail</button>
        </div>
    );
}

export default RequirementDetail;
