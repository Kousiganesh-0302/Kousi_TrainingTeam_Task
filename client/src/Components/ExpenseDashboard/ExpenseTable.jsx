import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ExpenseRow from './ExpenseRow';

function ExpenseTable({ data, currentPage, postPerPage }) {
    return (
        <MDBTable>
            <MDBTableHead dark>
                <tr className='text-center'>
                    <th scope="col">SL. No.</th>
                    <th scope="col">ID</th>
                    <th scope="col">Vendor</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody className='text-center'>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center">
                            No data found
                        </td>
                    </tr>
                ) : (
                    data.map((item, idx) => (
                        <ExpenseRow
                            key={item.id || idx}
                            item={item}
                            index={idx}
                            currentPage={currentPage}
                            postPerPage={postPerPage}
                        />
                    ))
                )}
            </MDBTableBody>
        </MDBTable>
    );
}

export default ExpenseTable;
