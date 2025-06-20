
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import SearchForm from './SearchForm';
import ExpenseTable from './ExpenseTable';
import FilterSortPagination from './FilterSortPagination';
import { exportToCSV } from './csvExporter';
import ExpenseCharts from './ExpenseCharts';


export default function ExpenseDashboard() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const sortOptions = ['vendor', 'amount', 'category', 'date', 'status'];

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [currentFilterStatus, setCurrentFilterStatus] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [dateRange, setDateRange] = useState([]);
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0
  });

  useEffect(() => {
    loadExpenseData();
    loadStats();
  }, [currentPage, postPerPage, sortValue, currentFilterStatus, sortOrder, dateRange]);

  const loadExpenseData = () => {
    let expenseJsonDb = `http://localhost:5001/api/expenses?_page=${currentPage}&_limit=${postPerPage}`;

    if (currentFilterStatus) {
      expenseJsonDb += `&status=${currentFilterStatus}`;
    }
    if (sortValue) {
      expenseJsonDb += `&_sort=${sortValue}&_order=${sortOrder}`;
    }
    if (value) {
      expenseJsonDb += `&q=${value}`;
    }
    if (dateRange && dateRange.length === 2) {
      expenseJsonDb += `&date_gte=${dateRange[0]}&date_lte=${dateRange[1]}`;
    }

    return axios.get(expenseJsonDb)
      .then((response) => {
        setData(response.data);
        setTotalExpenses(parseInt(response.headers['x-total-count'], 10));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadStats = () => {
    let statsUrl = 'http://localhost:5001/api/expenses?_limit=0';

    if (dateRange && dateRange.length === 2) {
      statsUrl += `&date_gte=${dateRange[0]}&date_lte=${dateRange[1]}`;
    }
    if (value) {
      statsUrl += `&q=${value}`;
    }

    axios.get(statsUrl)
      .then(response => {
        const newStats = {
          approved: 0,
          pending: 0,
          rejected: 0
        };

        response.data.forEach(item => {
          if (item.status === 'Approved') newStats.approved += item.amount;
          else if (item.status === 'Pending') newStats.pending += item.amount;
          else if (item.status === 'Rejected') newStats.rejected += item.amount;
        });

        setStats(newStats);
      })
      .catch(console.log);
  };

    const handleSearch = async (e) => {
      e.preventDefault();
      return await axios
        .get(`http://localhost:5001/api/expenses?q=${value}&_page=1&_limit=${postPerPage}`)
        .then((response) => {
          setData(response.data);
          setTotalExpenses(parseInt(response.headers['x-total-count'], 10) || response.data.length);
          setCurrentPage(1);
          setSortValue('');
          setSortOrder('asc');
          setCurrentFilterStatus(null);
        })
        .catch((err) =>
          console.log(err));
    };


    const handleReset = () => {
      setCurrentPage(1);
      setPostPerPage(5);
      setValue('');
      setSortValue('');
      setSortOrder('asc');
      setCurrentFilterStatus(null);
    };

    const handleSort = async (e) => {
      const selectedSort = e.target.value;
      setSortValue(selectedSort);
      if (selectedSort === "") {
        setSortOrder('asc');
      } else {
        setSortOrder('asc');
      }
    };


    const handleSortOrderToggle = () => {
      if (!sortValue) return;
      const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newOrder);
    };


    const handleFilter = async (statusValue) => {
      setCurrentFilterStatus(statusValue);
      setCurrentPage(1);
    };

    const onShowSizeChange = (page, size) =>
      { setCurrentPage(page);
        setPostPerPage(size);
       };

    const handleCSVExport = () => {
      try {
        exportToCSV(data, currentPage, postPerPage, 'expenses');
      } catch (error) {
        console.error('Export failed:', error);
        alert(error.message || 'Failed to export CSV');
      }
      };

    const handleDateRangeChange = (dates) => {
      setCurrentPage(1);
      if (dates && dates[0] && dates[1]) {
        setDateRange([dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]);
      } else {
        setDateRange([]);
      }
    }; 

  return (
    <MDBContainer>
      <SearchForm
        value={value}
        onChange={e => setValue(e.target.value)}
        onSubmit={handleSearch}
        onReset={handleReset}
      />
      <div style={{ marginTop: '30px' }}>
        <h2 className="text-center">Expense Tracker Dashboard</h2>

        {/* Add stats display row */}
        <MDBRow className="mb-3">
          <MDBCol>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '10px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <div><strong>Approved:</strong> ${stats.approved.toFixed(2)}</div>
              <div><strong>Pending:</strong> ${stats.pending.toFixed(2)}</div>
              <div><strong>Rejected:</strong> ${stats.rejected.toFixed(2)}</div>
            </div>
          </MDBCol>
        </MDBRow>

        <MDBCol className="text-end">
          <MDBBtn color="success" onClick={handleCSVExport}
            style={{
              marginBottom: '30px'
            }}>
            Export to CSV
          </MDBBtn>
        </MDBCol>

        <ExpenseTable data={data} currentPage={currentPage} postPerPage={postPerPage} />

      </div>
      <FilterSortPagination
        currentPage={currentPage}
        postPerPage={postPerPage}
        totalExpenses={totalExpenses}
        sortValue={sortValue}
        sortOptions={sortOptions}
        sortOrder={sortOrder}
        onPageChange={p => setCurrentPage(p)}
        onPageSizeChange={onShowSizeChange}
        onSortChange={handleSort}
        onSortToggle={handleSortOrderToggle}
        onFilter={(status) => {
          setCurrentPage(1);
          handleFilter(status);
        }}
        handleDateRangeChange={handleDateRangeChange}
      />
 

      <ExpenseCharts expenses={data} />

    </MDBContainer>
    
  );
}