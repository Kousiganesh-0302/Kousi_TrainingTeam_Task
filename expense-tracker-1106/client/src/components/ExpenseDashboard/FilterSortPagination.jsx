import React from 'react';
import { MDBRow, MDBCol, MDBBtnGroup, MDBBtn } from 'mdb-react-ui-kit';
import { Pagination } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function FilterSortPagination({
    currentPage,
    postPerPage,
    totalExpenses,
    sortValue,
    sortOptions,
    sortOrder,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onSortToggle,
    onFilter,
    handleDateRangeChange
}) {
    const itemRender = (current, type, originalEl) => {
        if (type === 'prev') return <span>Previous</span>;
        if (type === 'next') return <span>Next</span>;
        return originalEl;
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '35px' }}>
                <Pagination
                    current={currentPage}
                    pageSize={postPerPage}
                    total={totalExpenses}
                    onChange={onPageChange}
                    showSizeChanger
                    onShowSizeChange={onPageSizeChange}
                    showQuickJumper
                    className="pagination"
                    pageSizeOptions={['5', '10', '20', '50', '100']}
                    itemRender={itemRender}
                />
            </div>
        
                <MDBRow>
                <MDBCol size={4}>
                    <h5>Sort By:</h5>
                    <div style={{ display: 'flex'}}>
                        <select
                            style={{ width: '90%', borderRadius: '2px', height: '35px' }}
                            onChange={onSortChange}
                            value={sortValue}
                        >
                            <option value="">Please select value</option>
                            {sortOptions.map((item, index) => (
                                <option value={item} key={index}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <span
                            onClick={onSortToggle}
                            style={{ cursor: sortValue ? 'pointer' : 'default', marginLeft: '8px', display: 'flex', alignItems: 'center', opacity: sortValue ? '1' : '0.5' }}
                            title={sortValue ? `Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}` : 'Select a column to sort'}
                        >
                            {sortOrder === 'asc' ? (
                                <CaretUpOutlined style={{ fontSize: '18px', color: '#555' }} />
                            ) : (
                                <CaretDownOutlined style={{ fontSize: '18px', color: '#555' }} />
                            )}
                        </span>
                    </div>
                </MDBCol>

                <MDBCol size={4}>
                    <h5>Filter By Date:</h5>
                    <RangePicker
                        onChange={handleDateRangeChange}
                        style={{ width: '90%', borderRadius: '2px', height: '35px' }}
                    />
                </MDBCol>

                <MDBCol size={4}>
                    <h5>Filter By Status:</h5>
                    <MDBBtnGroup>
                        <MDBBtn color="success" onClick={() => onFilter('Approved')}>Approved</MDBBtn>
                        <MDBBtn color="warning" style={{ marginLeft: '4px' }} onClick={() => onFilter('Pending')}>Pending</MDBBtn>
                        <MDBBtn color="danger" style={{ marginLeft: '4px' }} onClick={() => onFilter('Rejected')}>Rejected</MDBBtn>
                    </MDBBtnGroup>
                </MDBCol>
            </MDBRow>
        </>
    );
}

export default FilterSortPagination;