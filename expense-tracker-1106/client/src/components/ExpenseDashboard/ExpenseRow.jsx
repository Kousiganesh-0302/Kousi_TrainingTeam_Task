import React from 'react';

function ExpenseRow({ item, index, currentPage, postPerPage }) {
    
    const statusColors = {
        Approved: '#d4edda', 
        Pending: '#fff3cd', 
        Rejected: '#f8d7da', 
    };

    const textColors = {
        Approved: '#155724',
        Pending: '#856404',
        Rejected: '#721c24',
      };
    const bgColor = statusColors[item.status] || 'transparent';
    const color = textColors[item.status] || '#000';

    return (
        <tr key={item.id || index}>
            <th scope="row">{(currentPage - 1) * postPerPage + index + 1}</th>
            <td>{item.id}</td>
            <td>{item.vendor}</td>
            <td>{item.amount}</td>
            <td>{item.category}</td>
            <td>{item.date}</td>
            <td
                style={{
                    backgroundColor: bgColor,
                    color: color,
                    borderRadius: '4px',
                }}
            >
                {item.status}
            </td>
        </tr>
    );
}

export default ExpenseRow;
