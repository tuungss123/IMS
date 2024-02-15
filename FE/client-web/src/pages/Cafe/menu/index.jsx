import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Pagination, Modal } from "@mui/material";
import './styles.css';

const CafeInventoryPage = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [selectedItem , setSelectedItem] = useState('');
    const [requestedItem, setRequestedItem] = useState(0);
    const [requestedQuantity, setRequestedQuantity] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        retrieveInventoryItems();
    }, []);

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    const setModalDetails = (item_id, item_name) => {
        setRequestedItem(item_id);
        setSelectedItem(item_name);
        setModalVisible(true);
    }

    async function retrieveInventoryItems(){
        const data = await fetch('http://127.0.0.1:8000/all_items');
        const response = await data.json();
        
        console.log(response.items);
        setInventoryData(response.items);
    }

    async function requestItem(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                'request_quantity': requestedQuantity
            })
        }

        const data = await fetch(`http://127.0.0.1:8000/request_item/${this.requestedQuantity}`, requestOptions);
        const response = await data.json();
        
        console.log(response.items);
        setInventoryData(response.items);
    }

    return (
        <Box>
            <Typography variant='h5'>Inventory</Typography>
            <Typography variant='body1'>Listed below are all the inventory items within the system.</Typography>

            <Box id='search-box-container'>
                <TextField label='Search Inventory' id='search-box' size="small">Search</TextField>
            </Box>

            <TableContainer component={Paper} id='inventory-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" className='table-header'>Item Name</TableCell>
                        <TableCell align="center" className='table-header'>Current Stock</TableCell>
                        <TableCell align="center" className='table-header'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inventoryData.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                            {item.item_name}
                        </TableCell>
                        <TableCell align="center">{item.cafe_stock}</TableCell>
                        <TableCell align="center">
                            <Button variant='outlined' onClick={() => setModalDetails(item.id, item.item_name)}>
                                Request Stock
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

            <Pagination sx={{ marginTop: '2%' }} count={10} />

            <Modal
                open={modalVisible}
                onClose={handleCloseModal}
                id='modal'
                sx={{ bgcolor: 'background.Paper' }}
            >
                <div>
                    <Typography variant="h5">Test</Typography>
                    <TextField label="Request Quantity" type='number'></TextField>
                </div>
            </Modal>
        </Box>
    )
}

export default CafeInventoryPage;
