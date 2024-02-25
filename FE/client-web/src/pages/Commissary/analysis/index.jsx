import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Modal } from "@mui/material";
import './styles.css';

const CommissaryAnalyis = () => {
    const [spoilageData, setSpoilageData] = useState([]);
    
    // stock request
    const [selectedItem , setSelectedItem] = useState('');
    const [requestedItem, setRequestedItem] = useState(0);
    const [requestedQuantity, setRequestedQuantity] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const [isDataRequestModalVisible, setIsDataRequestModalVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        retrieveSpoilageReports();
    }, []);

    const setModalDetails = (item_id, item_name) => {
        setRequestedItem(item_id);
        setSelectedItem(item_name);
        setModalVisible(true);
    }

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);

        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
    }

    async function retrieveSpoilageReports(){
        const data = await fetch('http://127.0.0.1:8000/retrieve_spoilage_reports');
        const response = await data.json();
        
        console.log(response.spoilage_reports);
        setSpoilageData(response.spoilage_reports);
    }

    async function requestData(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                'start_date': startDate,
                'end_date': endDate
            })
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/retrieve_transaction_summary', requestOptions);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', `Transaction Data Request ${new Date()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            
            setStartDate('');
            setEndDate('');
            setIsDataRequestModalVisible(false);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    return (
        <Box>
            <Typography variant='h5'>Stock Analysis</Typography>
            <Typography variant='body1'>A summative report on transactions and items within the system.</Typography>

            <Box id='search-box-container'>
                <TextField label='Search Inventory' id='search-box' size="small" onChange={(search_item) => search(search_item.target.value)}>Search</TextField>
            </Box>
            

            <Typography variant='h6'>Spoilage Reports</Typography>
            <TableContainer component={Paper} id='spoilage-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow id='header-row'>
                        <TableCell align="center" className='table-header'>Item Name</TableCell>
                        <TableCell align="center" className='table-header'>Spoiled Amount</TableCell>
                        <TableCell align="center" className='table-header'>Incident Reporter</TableCell>
                        <TableCell align="center" className='table-header'>Date Reported</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {spoilageData.map((spoilage) => (
                        <TableRow key={spoilage.id}>
                            <TableCell component="th" scope="row">
                                {spoilage.item.item_name}
                            </TableCell>
                            <TableCell align="center">{spoilage.spoil_amount}</TableCell>
                            <TableCell align="center">{spoilage.report_creator}</TableCell>
                            <TableCell align="center">{formatDateTime(spoilage.date_created)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Button variant='outlined' onClick={() => setIsDataRequestModalVisible(true)} sx={{ marginTop: '2%' }}>Request Split Data</Button>

            {/* <Pagination sx={{ marginTop: '2%' }} count={10} /> */}

            <Modal
                open={isDataRequestModalVisible}
                onClose={() => setIsDataRequestModalVisible(false)}
                sx={{ bgcolor: 'background.Paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div class='modal'>
                    <Typography variant="h5" id="modal-title">Request Transaction Data</Typography>

                    <Box id='date-pickers'>
                        <Typography variant="h6" id='item-title'>Start Date:</Typography>
                        <input type='date' onChange={(start_date) => setStartDate(start_date.target.value)}></input>

                        <Typography variant="h6" id='item-title'>End Date:</Typography>
                        <input type='date' onChange={(end_date) => setEndDate(end_date.target.value)}></input>
                    </Box>
                    
                    <Box id='modal-buttons-container'>
                        <Button variant='outlined' onClick={() => requestData() }>Proceed</Button>
                        <Button variant='outlined' onClick={() => setIsDataRequestModalVisible(false) }>Cancel</Button>
                    </Box>
                </div>
            </Modal>
        </Box>
    )
}

export default CommissaryAnalyis;
