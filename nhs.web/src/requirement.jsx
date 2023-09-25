/* eslint-disable react/prop-types */

const Requirement = ({ requirement, onRowClick }) => {

    return (
        <tr key={requirement.id} onClick={() => onRowClick(requirement)}>
            <td>{requirement.id}</td>
            <td>{requirement.title}</td>
            <td>{requirement.description}</td>
            <td>{new Date(requirement.dateCreated).toLocaleDateString()}</td>
            <td>{requirement.status == 1 ? "Open" : "Closed" }</td>
            <td>{requirement.assignedTo ? requirement.assignedTo.name : 'Unassigned'}</td>
        </tr>
    );
};

export default Requirement;