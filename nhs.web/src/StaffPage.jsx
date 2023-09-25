import { useState, useEffect } from 'react';
import StaffForm from './staffForm';

function StaffPage() {
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = () => {
        setLoading(true);
        fetch('http://localhost:5157/staff')
            .then(response => response.json())
            .then(data => {
                setStaffList(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the staff", error);
                setLoading(false);
            });
    };

    const handleAddStaff = async (newStaff) => {
        try {
            const response = await fetch('http://localhost:5157/staff/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStaff)
            });

            if (response.ok) {
                fetchStaff();  // Refresh the staff list
                setShowForm(false); // Hide the form
            } else {
                console.error("Error adding the staff:", await response.text());
            }
        } catch (error) {
            console.error("There was an error sending the POST request:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>Add Staff</button>
            {showForm && <StaffForm onSubmit={handleAddStaff} />}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.map(staff => (
                        <tr key={staff.id}>
                            <td>{staff.id}</td>
                            <td>{staff.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StaffPage;
