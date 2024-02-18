import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Pagination, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';


const CommissaryInventoryPage = () => {
    const [inventoryData, setInventoryData] = useState([]);
    
    // stock request
    const [selectedItem , setSelectedItem] = useState('');
    const [requestedItem, setRequestedItem] = useState(0);
    const [requestedQuantity, setRequestedQuantity] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    // spoil report
    const [spoiledItemName , setSpoiledItemName] = useState('');
    const [spoiledItemId, setSpoiledItemId] = useState(0);
    const [spoiledQty, setSpoiledQty] = useState(0);
    const [spoiledModalVisible, setSpoiledModalVisible] = useState(false);

    useEffect(() => {
        retrieveInventoryItems();
    }, []);

    const setModalDetails = (item_id, item_name) => {
        setRequestedItem(item_id);
        setSelectedItem(item_name);
        setModalVisible(true);
    }

    const setSpoiledModalDetails = (item_id, item_name) => {
        setSpoiledItemId(item_id);
        setSpoiledItemName(item_name);
        setSpoiledModalVisible(true);
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
                'item_id': requestedItem,
                'request_quantity': requestedQuantity,
                'transactor': JSON.parse(localStorage.getItem('user_data'))
            })
        }

        const response = await fetch(`http://127.0.0.1:8000/request_item/${requestedItem}`, requestOptions);
        const data = await response.json();
        
        if (data.response == 'Request Made.'){
            setModalVisible(false);
        }
    }

    async function search(searched_item){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                'search': searched_item
            })
        }

        const data = await fetch('http://127.0.0.1:8000/search_items', requestOptions);
        const response = await data.json();
        
        console.log(response.items);
        setInventoryData(response.items);
    }

    return (
        <Box>
            <Typography variant='h5'>Commissary Inventory</Typography>
            <Typography variant='body1'>Listed below are all the inventory items within the system.</Typography>

            <Box id='search-box-container'>
                <Button variant='outlined' sx={{ marginRight: '2%' }}>Add Item</Button>
                <TextField label='Search Inventory' id='search-box' size="small" onChange={(search_item) => search(search_item.target.value)}>Search</TextField>
            </Box>

            <TableContainer component={Paper} id='inventory-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow id='header-row'>
                        <TableCell align="center" className='table-header'>Item Name</TableCell>
                        <TableCell align="center" className='table-header'>Current Stock</TableCell>
                        <TableCell align="center" className='table-header'>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inventoryData.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                                {item.item_name}
                            </TableCell>
                            <TableCell align="center">{item.commissary_stock}</TableCell>
                            <TableCell align="center">
                                <EditIcon />
                                <DeleteIcon  />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

            {/* <Pagination sx={{ marginTop: '2%' }} count={10} /> */}

            <Modal
                open={modalVisible}
                onClose={() => setModalVisible(false)}
                sx={{ bgcolor: 'background.Paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div class='modal'>
                    <Typography variant="h5" id="modal-title">Request Item from Commissary</Typography>

                    <Typography variant="h6" id='item-title'>{selectedItem}</Typography>
                    <TextField 
                        label="Request Quantity" 
                        type='number' 
                        id="modal-input-field" 
                        size='small' 
                        onChange={(qty) => setRequestedQuantity(qty.target.value)}
                    >
                    </TextField>
                    
                    <Box id='modal-buttons-container'>
                        <Button variant='outlined' onClick={() => requestItem() }>Proceed</Button>
                        <Button variant='outlined' onClick={() => setModalVisible(false) }>Cancel</Button>
                    </Box>
                </div>
            </Modal>

            <Modal
                open={spoiledModalVisible}
                onClose={() => setSpoiledModalVisible(false)}
                sx={{ bgcolor: 'background.Paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div class='modal'>
                    <Typography variant="h5" id="modal-title">Report Spoiled Item</Typography>

                    <Typography variant="h6" id='item-title'>{spoiledItemName}</Typography>
                    <TextField 
                        label="Amount of Items Spoiled" 
                        type='number' 
                        id="modal-input-field" 
                        size='small' 
                        onChange={(spoilQty) => setSpoiledQty(spoilQty.target.value)}
                    >
                    </TextField>
                    
                    <Box id='modal-buttons-container'>
                        <Button variant='outlined' onClick={() => reportSpoiledItem() }>Report</Button>
                        <Button variant='outlined' onClick={() => setSpoiledModalVisible(false) }>Cancel</Button>
                    </Box>
                </div>
            </Modal>
        </Box>
    )
}

export default CommissaryInventoryPage;
