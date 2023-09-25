/* eslint-disable react/prop-types */
import { useState } from 'react';

function RequirementForm({ onSubmit }) {
    const [newRequirement, setNewRequirement] = useState({ title: '', description: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRequirement(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newRequirement);
        setNewRequirement({ title: '', description: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={newRequirement.title} onChange={handleInputChange} />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={newRequirement.description} onChange={handleInputChange} />
            </label>
            <button type="submit">Save</button>
        </form>
    );
}

export default RequirementForm;
