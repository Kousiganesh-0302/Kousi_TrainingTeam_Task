// import React from 'react';

// const UploadFile = () => {
//     return (
//         <div style={{ textAlign: 'center', padding: '50px' }}>
//             <h1 style={{ fontSize: '2.5em', color: '#333' }}>Upload Your Files</h1>
//             <p style={{ fontSize: '1.2em', color: '#666' }}>This section is for uploading expense receipts or other documents.</p>
//         </div>
//     );
// };

// export default UploadFile;

// import React, { useState, useEffect } from 'react';
// import { Upload, Button, message, Space, List, Typography, Input, Modal, Progress, Card } from 'antd';
// import {
//     InboxOutlined,
//     CloudUploadOutlined,
//     FileOutlined,
//     DeleteOutlined,
//     SearchOutlined,
// } from '@ant-design/icons';
// import authService from '../API/authService'; 

// const { Dragger } = Upload;
// const { Text } = Typography;

// const UploadFile = () => {
//     const [filesToUpload, setFilesToUpload] = useState([]);
//     const [uploadProgress, setUploadProgress] = useState({});
//     const [isUploading, setIsUploading] = useState(false);
//     const [storedFiles, setStoredFiles] = useState([]);
//     const [isLoadingFiles, setIsLoadingFiles] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const fetchFiles = async () => {
//         setIsLoadingFiles(true);
//         try {
//            message.info('Fetching uploaded files list is not yet implemented in the backend.');
//             setStoredFiles([]); 
//         } catch (err) {
//             message.error('Failed to fetch files from backend.');
//         } finally {
//             setIsLoadingFiles(false);
//         }
//     };

//     useEffect(() => {
//         fetchFiles();
//     }, []);

//     const validFileTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
//     const maxFileSize = 3 * 1024 * 1024; 

//     const handleBeforeUpload = (file) => {
//         const isCorrectType = validFileTypes.includes(file.type);
//         if (!isCorrectType) {
//             message.error(`You can only upload CSV or XLSX files! File: ${file.name}`);
//             return Upload.LIST_IGNORE;
//         }
//         const isLt3M = file.size <= maxFileSize;
//         if (!isLt3M) {
//             message.error(`File must be smaller than 3MB! File: ${file.name}`);
//             return Upload.LIST_IGNORE;
//         }
//         const isDuplicate = filesToUpload.some(f => f.name === file.name);
//         if (isDuplicate) {
//             message.error(`File already added to upload list: ${file.name}`);
//             return Upload.LIST_IGNORE;
//         }

//         const isStoredDuplicate = storedFiles.some(f => f.originalName === file.name);
//         if (isStoredDuplicate) {
//             Modal.confirm({
//                 title: 'File Exists',
//                 content: `${file.name} already exists. Do you want to replace it?`,
//                 onOk() {
//                     setFilesToUpload(prev => {
//                         const existingFileIndex = prev.findIndex(f => f.name === file.name);
//                         if (existingFileIndex > -1) {
//                             const newFiles = [...prev];
//                             newFiles[existingFileIndex] = file;
//                             return newFiles;
//                         }
//                         return [...prev, file];
//                     });
//                     return Promise.resolve();
//                 },
//                 onCancel() {
//                     return Promise.reject('File not replaced');
//                 },
//             });
//             return Upload.LIST_IGNORE;
//         }

//         setFilesToUpload(prev => [...prev, file]);
//         setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
//         return false; 
//     };

//     const handleUpload = async () => {
//         if (!filesToUpload.length) {
//             message.warning('Please add files before uploading!');
//             return;
//         }

//         setIsUploading(true);
//         try {
//             await Promise.all(filesToUpload.map(async (file) => {
//                 const formData = new FormData();
//                 formData.append('file', file); 
//                 await authService.axiosInstance.post('/file/upload-expense', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                     onUploadProgress: (progressEvent) => {
//                         if (progressEvent.lengthComputable) {
//                             setUploadProgress(prev => ({
//                                 ...prev,
//                                 [file.name]: Math.round((progressEvent.loaded * 100) / progressEvent.total)
//                             }));
//                         }
//                     }
//                 });
//                 message.success(`${file.name} uploaded successfully!`);
//             }));
//             message.success('All selected files uploaded successfully!');
//             setFilesToUpload([]);
//             fetchFiles(); 
//         } catch (err) {
//             console.error('Upload failed:', err.response ? err.response.data : err.message);
//             let errorMessage = 'Failed to upload some files.';
//             if (err.response && err.response.data && err.response.data.err_message) {
//                 errorMessage = err.response.data.err_message; 
//             } else if (err.message) {
//                 errorMessage = err.message;
//             }
//             message.error(errorMessage);
//         } finally {
//             setIsUploading(false);
//             setUploadProgress({});
//         }
//     };

//     const handleRemoveStagedFile = (fileToRemove) => {
//         setFilesToUpload(prev => prev.filter(file => file.uid !== fileToRemove.uid));
//         setUploadProgress(prev => {
//             const newProgress = { ...prev };
//             delete newProgress[fileToRemove.name];
//             return newProgress;
//         });
//     };

//     const confirmDelete = (file) => {
//         Modal.confirm({
//             title: 'Confirm Delete',
//             content: `Are you sure you want to delete "${file.originalName}"?`,
//             okText: 'Delete',
//             okType: 'danger',
//             cancelText: 'Cancel',
//             onOk: async () => {
//                     message.info('File deletion is not yet implemented in the backend.');
//                 setStoredFiles(prev => prev.filter(f => f._id !== file._id)); 
//             },
//         });
//     };

//     const filteredStoredFiles = storedFiles.filter(file =>
//         file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const formatFileSize = bytes => bytes < 1024 ? `${bytes} bytes` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//     const formatDate = dateStr => new Date(dateStr).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

//     return (
//         <div style={{ padding: '20px' }}>
//             <Card title="Upload Expense CSV Files" style={{ marginBottom: '20px' }}>
//                 <Text type="secondary">Max file size: 3MB. Accepted types: .csv, .xlsx</Text>
//                 <Dragger
//                     name="file"
//                     multiple={true}
//                     customRequest={() => { }}
//                     beforeUpload={handleBeforeUpload}
//                     showUploadList={false}
//                     accept=".csv,.xlsx"
//                     style={{ marginTop: '20px' }}
//                 >
//                     <p className="ant-upload-drag-icon">
//                         <InboxOutlined />
//                     </p>
//                     <p className="ant-upload-text">Drag & drop your files here or click to browse</p>
//                     <p className="ant-upload-hint">Support for single or bulk upload of CSV/XLSX expense files.</p>
//                 </Dragger>

//                 {filesToUpload.length > 0 && (
//                     <Card title="Files Ready for Upload" size="small" style={{ marginTop: '20px' }}>
//                         <List
//                             itemLayout="horizontal"
//                             dataSource={filesToUpload}
//                             renderItem={file => (
//                                 <List.Item
//                                     actions={[
//                                         <Button
//                                             type="text"
//                                             danger
//                                             icon={<DeleteOutlined />}
//                                             onClick={() => handleRemoveStagedFile(file)}
//                                             disabled={isUploading}
//                                         />
//                                     ]}
//                                 >
//                                     <List.Item.Meta
//                                         avatar={<FileOutlined />}
//                                         title={file.name}
//                                         description={formatFileSize(file.size)}
//                                     />
//                                     {isUploading && uploadProgress[file.name] !== undefined && (
//                                         <Progress percent={uploadProgress[file.name]} size="small" style={{ width: '100px' }} />
//                                     )}
//                                 </List.Item>
//                             )}
//                         />
//                         <Space style={{ marginTop: '16px', justifyContent: 'flex-end', width: '100%' }}>
//                             <Button onClick={() => setFilesToUpload([])} disabled={isUploading}>
//                                 Clear All
//                             </Button>
//                             <Button
//                                 type="primary"
//                                 icon={<CloudUploadOutlined />}
//                                 onClick={handleUpload}
//                                 loading={isUploading}
//                                 disabled={!filesToUpload.length}
//                             >
//                                 {isUploading ? 'Uploading...' : 'Upload Selected Files'}
//                             </Button>
//                         </Space>
//                     </Card>
//                 )}
//             </Card>

//             <Card
//                 title="Previously Uploaded Files"
//                 extra={
//                     <Input
//                         placeholder="Search files..."
//                         prefix={<SearchOutlined />}
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         style={{ width: 200 }}
//                     />
//                 }
//                 loading={isLoadingFiles}
//             >
//                 {filteredStoredFiles.length > 0 ? (
//                     <List
//                         itemLayout="horizontal"
//                         dataSource={filteredStoredFiles}
//                         renderItem={file => (
//                             <List.Item
//                                 actions={[
//                                     <Button
//                                         type="text"
//                                         danger
//                                         icon={<DeleteOutlined />}
//                                         onClick={() => confirmDelete(file)}
//                                     />
//                                 ]}
//                             >
//                                 <List.Item.Meta
//                                     avatar={<FileOutlined />}
//                                     title={file.originalName}
//                                     description={
//                                         <Space size="middle">
//                                             <Text type="secondary">{formatFileSize(file.size)}</Text>
//                                             <Text type="secondary">{formatDate(file.uploadDate)}</Text>
//                                         </Space>
//                                     }
//                                 />
//                             </List.Item>
//                         )}
//                     />
//                 ) : (
//                     <Typography.Paragraph type="secondary" style={{ textAlign: 'center' }}>
//                         No files uploaded yet.
//                     </Typography.Paragraph>
//                 )}
//             </Card>
//         </div>
//     );
// };

// export default UploadFile;

import React, { useState, useRef } from 'react';
import {
    Box, Typography, Button, LinearProgress,
    List, ListItem, ListItemIcon, ListItemText, IconButton
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    InsertDriveFile as FileIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import authService from '../API/authService';


const UploadFile = () => {
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const VALID_FILE_TYPES = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const MAX_FILE_SIZE = 3 * 1024 * 1024; 

    const validateAndStageFile = (file) => {
        if (!VALID_FILE_TYPES.includes(file.type)) {
            alert(`Invalid file type: ${file.name}. Only CSV or XLSX files are allowed.`);
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {
            alert(`File too large: ${file.name}. Max size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
            return false;
        }
        if (filesToUpload.some(f => f.name === file.name)) {
            alert(`File "${file.name}" is already in the upload queue.`);
            return false;
        }
        return true;
    };

    const handleAddFiles = (fileList) => {
        const validFiles = Array.from(fileList).filter(validateAndStageFile);
        if (validFiles.length > 0) {
            setFilesToUpload(prev => [...prev, ...validFiles]);
            setUploadProgress(prev => {
                const newProgress = { ...prev };
                validFiles.forEach(file => { newProgress[file.name] = 0; });
                return newProgress;
            });
        }
    };

    const handleFileInputChange = (e) => {
        handleAddFiles(e.target.files);
        e.target.value = '';
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        handleAddFiles(e.dataTransfer.files);
    };

    const handleUpload = async () => {
        if (filesToUpload.length === 0) {
            alert('Please add files before uploading.');
            return;
        }
        setIsUploading(true);
        try {
            await Promise.all(filesToUpload.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                await authService.axiosInstance.post('/file/upload-expense', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (e) => {
                        if (e.lengthComputable) {
                            setUploadProgress(prev => ({ ...prev, [file.name]: Math.round((e.loaded * 100) / e.total) }));
                        }
                    }
                });
                alert(`"${file.name}" uploaded successfully!`);
            }));
            setFilesToUpload([]);
        } catch (err) {
            console.error('Upload failed:', err.response ? err.response.data : err.message);
            const displayMessage = err.response?.data?.err_message || err.message;
            alert(`Upload failed: ${displayMessage}`);
        } finally {
            setIsUploading(false);
            setUploadProgress({});
        }
    };

    const handleRemoveStagedFile = (fileToRemove) => {
        setFilesToUpload(prev => prev.filter(file => file.uid !== fileToRemove.uid));
        setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileToRemove.name];
            return newProgress;
        });
    };

    const formatFileSize = bytes => {
        if (bytes < 1024) return `${bytes} bytes`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <Box
            sx={{
                padding: { xs: '20px', sm: '30px', md: '40px' },
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: '550px',
                margin: '30px auto',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                fontFamily: 'Arial, sans-serif'
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
                Upload Expense Files
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                Max file size: {MAX_FILE_SIZE / (1024 * 1024)}MB. Accepted types: .csv, .xlsx
            </Typography>

            <Box
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                sx={{
                    border: '2px dashed #9e9e9e',
                    borderRadius: '10px',
                    padding: '30px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease',
                    '&:hover': { borderColor: '#2196f3' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                }}
            >
                <CloudUploadIcon sx={{ fontSize: 50, color: '#2196f3' }} />
                <Typography variant="body1" color="text.secondary">
                    Drag & drop files here or
                    <Button
                        variant="text"
                        onClick={() => fileInputRef.current.click()}
                        sx={{ ml: 1, textTransform: 'none', color: '#2196f3' }}
                    >
                        browse
                    </Button>
                </Typography>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept=".csv,.xlsx"
                    multiple
                    style={{ display: 'none' }}
                />
            </Box>

            {filesToUpload.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1, color: '#444' }}>Files Ready:</Typography>
                    <List sx={{ border: '1px solid #eee', borderRadius: '8px', p: 1 }}>
                        {filesToUpload.map((file) => (
                            <ListItem
                                key={file.name}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => handleRemoveStagedFile(file)} disabled={isUploading}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                sx={{ mb: 1, bgcolor: '#f9f9f9', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                            >
                                <ListItemIcon><FileIcon sx={{ color: '#78909c' }} /></ListItemIcon>
                                <ListItemText primary={file.name} secondary={formatFileSize(file.size)} />
                                {isUploading && uploadProgress[file.name] !== undefined && (
                                    <Box sx={{ width: '100px', ml: 2 }}>
                                        <LinearProgress variant="determinate" value={uploadProgress[file.name]} sx={{ height: 6, borderRadius: 3 }} />
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, textAlign: 'center', display: 'block' }}>
                                            {uploadProgress[file.name]}%
                                        </Typography>
                                    </Box>
                                )}
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setFilesToUpload([])}
                            disabled={isUploading}
                        >
                            Clear All
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            onClick={handleUpload}
                            disabled={isUploading || filesToUpload.length === 0}
                            sx={{
                                backgroundColor: '#4caf50',
                                '&:hover': { backgroundColor: '#388e3c' }
                            }}
                        >
                            {isUploading ? 'Uploading...' : 'Upload Files'}
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default UploadFile;
