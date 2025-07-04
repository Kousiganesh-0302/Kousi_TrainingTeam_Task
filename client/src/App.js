// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBTable,
//   MDBTableHead,
//   MDBTableBody,
//   MDBBtn,
//   MDBBtnGroup,
// } from 'mdb-react-ui-kit';
// import { Pagination } from 'antd';
// import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
// import './App.css';


// function App() {
//   const [data, setData] = useState([]);
//   const [value, setValue] = useState('');
//   const [sortValue, setSortValue] = useState('');
//   const sortOptions = ['vendor', 'amount', 'category', 'date', 'status'];

//   const [currentPage, setCurrentPage] = useState(1);
//   const [postPerPage, setPostPerPage] = useState(5);
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const [currentFilterStatus, setCurrentFilterStatus] = useState(null);
//   const [sortOrder, setSortOrder] = useState('asc');

//   const onShowSizeChange = (current, pageSize) => {
//     setCurrentPage(current);
//     setPostPerPage(pageSize);
//   };

//   // Corrected itemRender function definition
//   const itemRender = (current, type, originalElement) => {
//     if (type === 'prev') {
//       return <span>Previous</span>;
//     }
//     if (type === 'next') {
//       return <span>Next</span>;
//     }
//     return originalElement;
//   };

//   useEffect(() => {
//     loadExpenseData();
//   }, [currentPage, postPerPage, sortValue, currentFilterStatus, sortOrder]);

//   const loadExpenseData = () => {
//     let expenseJsonDb = `http://localhost:5000/expenses?_page=${currentPage}&_limit=${postPerPage}`;

//     if (currentFilterStatus) {
//       expenseJsonDb += `&status=${currentFilterStatus}`;
//     }
//     if (sortValue) {
//       expenseJsonDb += `&_sort=${sortValue}&_order=${sortOrder}`;
//     }
//     if (value) {
//       expenseJsonDb += `&q=${value}`;
//     }

//     return axios.get(expenseJsonDb)
//       .then((response) => {
//         setData(response.data);
//         setTotalExpenses(parseInt(response.headers['x-total-count'], 10));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     return await axios
//       .get(`http://localhost:5000/expenses?q=${value}&_page=1&_limit=${postPerPage}`)
//       .then((response) => {
//         setData(response.data);
//         setTotalExpenses(parseInt(response.headers['x-total-count'], 10) || response.data.length);
//         setCurrentPage(1);
//         setSortValue('');
//         setSortOrder('asc');
//         setCurrentFilterStatus(null);
//       })
//       .catch((err) =>
//         console.log(err));
//   };

//   const handleReset = () => {
//     setCurrentPage(1);
//     setPostPerPage(5);
//     setValue('');
//     setSortValue('');
//     setSortOrder('asc');
//     setCurrentFilterStatus(null);
//   };

//   const handleSort = async (e) => {
//     const selectedSort = e.target.value;
//     setSortValue(selectedSort);
//     if (selectedSort === "") {
//       setSortOrder('asc');
//     } else {
//       setSortOrder('asc');
//     }
//   };

//   const handleSortOrderToggle = () => {
//     if (!sortValue) return;
//     const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
//     setSortOrder(newOrder);
//   };

//   const handleFilter = async (statusValue) => {
//     setCurrentFilterStatus(statusValue);
//     setCurrentPage(1);
//   };

//   return (
//     <MDBContainer>
//       {/* Search Form */}
//       <form
//         style={{ margin: 'auto', padding: '15px', maxWidth: '400px', alignContent: 'center' }}
//         className="d-flex input-group w-auto"
//         onSubmit={handleSearch}
//       >
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by keyword..."
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />
//         <MDBBtn type="submit" color="dark">
//           Search
//         </MDBBtn>
//         <MDBBtn className="mx-2" color="info" onClick={handleReset}>
//           Reset
//         </MDBBtn>
//       </form>

//       {/* Data Table */}
//       <div style={{ marginTop: '30px' }}>
//         <h2 className="text-center">Search, Filter, Sort and Pagination</h2>
//         <MDBRow>
//           <MDBCol size={12}>
//             <MDBTable>
//               <MDBTableHead dark>
//                 <tr>
//                   <th scope="col">SL. No.</th>
//                   <th scope="col">ID</th>
//                   <th scope="col">Vendor</th>
//                   <th scope="col">Amount</th>
//                   <th scope="col">Category</th>
//                   <th scope="col">Date</th>
//                   <th scope="col">Status</th>
//                 </tr>
//               </MDBTableHead>
//               <MDBTableBody>
//                 {data.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="text-center">
//                       No data found
//                     </td>
//                   </tr>
//                 ) : (
//                   data.map((item, index) => (
//                     <tr key={item.id || index}>
//                       <th scope="row">{(currentPage - 1) * postPerPage + index + 1}</th>
//                       <td>{item.id}</td>
//                       <td>{item.vendor}</td>
//                       <td>{item.amount}</td>
//                       <td>{item.category}</td>
//                       <td>{item.date}</td>
//                       <td>{item.status}</td>
//                     </tr>
//                   ))
//                 )}
//               </MDBTableBody>
//             </MDBTable>
//           </MDBCol>
//         </MDBRow>
//       </div>

//       {/* Ant Design Pagination component */}
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '35px' }}>
//         <Pagination
//           onChange={(page) => setCurrentPage(page)}
//           current={currentPage}
//           pageSize={postPerPage}
//           total={totalExpenses}
//           showSizeChanger
//           onShowSizeChange={onShowSizeChange}
//           showQuickJumper
//           className="pagination"
//           pageSizeOptions={['5', '10', '20', '50', '100']}
//           itemRender={itemRender} 
//         />
//       </div>

//       {/* Sort Dropdown and Filter Buttons */}
//       <MDBRow>
//         <MDBCol size={8} style={{ marginBottom: '1rem' }}>
//           <h5>Sort By:</h5>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <select
//               style={{ width: '50%', borderRadius: '2px', height: '35px' }}
//               onChange={handleSort}
//               value={sortValue}
//             >
//               <option value="">Please select value</option>
//               {sortOptions.map((item, index) => (
//                 <option value={item} key={index}>
//                   {item}
//                 </option>
//               ))}
//             </select>

//             {/* Sort arrow icons: Always rendered, and aligned horizontally within this new div */}
//             <span
//               onClick={handleSortOrderToggle}
//               style={{ cursor: sortValue ? 'pointer' : 'default', marginLeft: '8px', display: 'flex', alignItems: 'center', opacity: sortValue ? '1' : '0.5' }}
//               title={sortValue ? `Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}` : 'Select a column to sort'}
//             >
//               {sortOrder === 'asc' ? (
//                 <CaretUpOutlined style={{ fontSize: '18px', color: '#555' }} />
//               ) : (
//                 <CaretDownOutlined style={{ fontSize: '18px', color: '#555' }} />
//               )}
//             </span>
//           </div>
//         </MDBCol>

//         <MDBCol size="4">
//           <h5>Filter By Status: </h5>
//           <MDBBtnGroup>
//             <MDBBtn color="success" onClick={() => handleFilter("Approved")}>
//               Approved
//             </MDBBtn>
//             {/* <MDBBtn className="mx-2" color="warning" onClick={() => handleFilter("Pending")}>
//             </MDBBtn> */}
//             {/* <MDBBtn color="danger" onClick={() => handleFilter("Rejected")}>
//               Rejected
//             </MDBBtn> */}
//             <MDBBtn color="warning" style={{ marginLeft: "4px" }} onClick={() => handleFilter("Pending")}>
//               Pending
//             </MDBBtn>
//             <MDBBtn color="danger" style={{ marginLeft: "4px" }} onClick={() => handleFilter("Rejected")}>
//               Rejected
//             </MDBBtn>
//           </MDBBtnGroup>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default App;

// src/App.jsx
// import React from 'react';
// import './App.css';
// import './components/css/component.css'
// import ExpenseDashboard from './components/ExpenseDashboard/ExpenseDashboard';


// function App() {
//   return (
//     <ExpenseDashboard />
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
import './CSS/component.css';
import './CSS/Pages.css';
import 'antd/dist/reset.css'; 

import ExpenseDashboard from './Components/ExpenseDashboard/ExpenseDashboard';
import LoginSignup from './Components/LoginSignupComponent/LoginSignup';
import Layout from './Components/LayoutComponent/Layout'; 
import Home from './Pages/Home'; 
import Profile from './Pages/Profile'; 
import UploadFile from './Pages/UploadFile'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); 
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home'); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'expense-dashboard':
        return <ExpenseDashboard />;
      case 'profile':
        return <Profile />;
      case 'upload-file':
        return <UploadFile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <Layout
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
        >
          {renderPageContent()} 
        </Layout>
      ) : (
        <LoginSignup onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;



