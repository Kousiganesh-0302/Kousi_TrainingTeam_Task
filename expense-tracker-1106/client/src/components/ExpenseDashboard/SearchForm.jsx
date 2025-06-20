import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

function SearchForm({ value, onChange, onSubmit, onReset}) {
    return (
        <form
            style={{ margin: 'auto', padding: '15px', maxWidth: '400px', alignContent: 'center' }}
            className="d-flex input-group w-auto"
            onSubmit={onSubmit}
        >
            <input
                type="text"
                className="form-control"
                placeholder="Search by keyword..."
                value={value}
                onChange={onChange}
            />
            <MDBBtn type="submit" color="dark">
                Search
            </MDBBtn>
            <MDBBtn className="mx-2" color="info" onClick={onReset}>
                Reset
            </MDBBtn>
        </form>
    );
}

export default SearchForm;