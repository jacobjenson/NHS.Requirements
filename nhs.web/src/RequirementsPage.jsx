// RequirementsPage.js
import { useState, useEffect } from 'react';
import Requirement from './requirement';
import RequirementForm from './RequirementForm';
import RequirementDetail from './RequirementDetail';

function RequirementsPage() {
    console.log('RequirementsPage mounted');
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedRequirement, setSelectedRequirement] = useState(null);

    useEffect(() => {
        fetchRequirements()
    }, []);


    const fetchRequirements = () => {
        console.log("fetchRequirements called")
        setLoading(true);
        fetch('http://localhost:5157')
            .then(response => response.json())
            .then(data => {
                setRequirements(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the requirements", error);
                setLoading(false);
            });
    };

    const handleAddRequirement = async (newRequirement) => {
        try {
            const response = await fetch('http://localhost:5157/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRequirement)
            });

            if (response.ok) {
                fetchRequirements();
                setShowForm(false);
            } else {
                console.error("Error adding the requirement:", await response.text());
            }
        } catch (error) {
            console.error("There was an error sending the POST request:", error);
        }
    };

    const handleRowClick = (req) => {
        setSelectedRequirement(req);
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {selectedRequirement ? (
                <RequirementDetail
                    requirement={selectedRequirement}
                    onClose={() => {
                        setSelectedRequirement(null);
                        fetchRequirements();
                    }} />
            ) : (
                <div>
                    <button onClick={() => setShowForm(!showForm)}>Add Requirement</button>
                    {showForm && <RequirementForm onSubmit={handleAddRequirement} />}

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date Created</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requirements.map(req => (
                                <Requirement key={req.id} requirement={req} onRowClick={handleRowClick} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default RequirementsPage;
