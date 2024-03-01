import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Pagination, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';


const CommissaryInventoryPage = () => {
    const [inventoryData, setInventoryData] = useState([]);
    
    // modify item quantity
    const [selectedItem , setSelectedItem] = useState('');
    const [requestedItem, setRequestedItem] = useState(0);
    const [modifyQty, setModifyQty] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    // add item
    const [addItemName , setAddItemName] = useState('');
    const [addQty, setAddQty] = useState(0);
    const [addModalVisible, setAddModalVisible] = useState(false);

    // add item verification
    const [addItemError, setAddItemError] = useState('');
    const [addQtyError, setAddQtyError] = useState('');

    //edit item validation
    const [isEditValid, setIsEditValid] = useState('false');

    useEffect(() => {
        retrieveInventoryItems();
    }, []);

    const setModalDetails = (item_id, item_name) => {
        setRequestedItem(item_id);
        setSelectedItem(item_name);
        setModalVisible(true);
    }

    async function retrieveInventoryItems(){
        const data = await fetch('http://127.0.0.1:8000/all_items');
        const response = await data.json();
        
        setInventoryData(response.items);
    }

    const validateAdding = () => {
        let valid = true;

        if (!addItemName.trim()) {
            setAddItemError('Please enter a valid item');
            valid = false;
        } else {
            setAddItemError('');
        }
        if (isNaN(addQty) || addQty < 0) {
            setAddQtyError('Please only enter a positive number');
            valid = false;
        } else {
            setAddQtyError('');
        }
        return valid;
    }

    async function createItem(){
        if (!validateAdding()) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                'item_name': addItemName,
                'commissary_stock': addQty
            })
        }

        console.log(addItemName);
        console.log(addQty);

        const response = await fetch(`http://127.0.0.1:8000/create_item`, requestOptions);
        const data = await response.json();
        
        console.log(data.response);
        if (data.response == 'Item Created'){
            setAddModalVisible(false);
            retrieveInventoryItems();
        }
    }

    async function addToStock(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                'stock_update': modifyQty
            })
        }

        const response = await fetch(`http://127.0.0.1:8000/update_item/${requestedItem}`, requestOptions);
        const data = await response.json();
        
        if (data.response == 'Item Updated'){
            setModalVisible(false);
            retrieveInventoryItems();
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
        
        setInventoryData(response.items);
    }

    return (
        <Box>
            <Typography variant='h5'>Commissary Inventory</Typography>
            <Typography variant='body1'>Listed below are all the inventory items within the system.</Typography>

            <Box id='search-box-container'>
                <Button variant='outlined' sx={{ marginRight: '2%' }} onClick={() => {setAddModalVisible(true)}}>Add Item</Button>
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
                            <TableCell align="center">
                                {item.commissary_stock}
                            </TableCell>
                            <TableCell align="center">
                                <EditIcon onClick={() => setModalDetails(item.id, item.item_name) } />
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
                <div className='modal'>
                    <Typography variant="h5" id="modal-title">Add Stock</Typography>

                    <Typography variant="h6" id='item-title'>{selectedItem}</Typography>
                    <TextField 
                        label="Add Quantity" 
                        type='number' 
                        id="modal-input-field" 
                        size='small' 
                        onChange={(event) => {
                            const value = event.target.value;
                            if (!isNaN(value) && parseInt(value) >= 0) {
                                setModifyQty(parseInt(value));
                                setIsEditValid(true);
                                setAddQtyError('');
                            } else {
                                setAddQtyError('Please enter a positive number');
                                setIsEditValid(false);
                            }
                        }}
                        defaultValue={0}
                        error={!!addQtyError}
                        helperText={addQtyError}
                    >
                    </TextField>
                    
                    <Box id='modal-buttons-container'>
                        <Button 
                        variant='outlined' 
                        onClick={() => addToStock() }
                        disabled={!isEditValid}
                        >Proceed</Button>
                        <Button variant='outlined' onClick={() => setModalVisible(false) }>Cancel</Button>
                    </Box>
                </div>
            </Modal>

            <Modal
                open={addModalVisible}
                onClose={() => setAddModalVisible(false)}
                sx={{ bgcolor: 'background.Paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal'>
                    <Typography variant="h5" id="modal-title">Add New Item</Typography>
                    
                    <Typography variant="h6" id='item-title'>Item Name</Typography>
                    <TextField 
                        label="Enter Name of Item..." 
                        type='text' 
                        size='small'
                        onChange={(itemName) => setAddItemName(itemName.target.value)}
                        error={!!addItemError}
                        helperText={addItemError}
                    >
                    </TextField>

                    <Typography variant="h6" id='item-title'>Quantity</Typography>
                    <TextField 
                        label="Amount of Items to Add" 
                        type='number' 
                        id="modal-input-field" 
                        size='small' 
                        onChange={(addQty) => setAddQty(addQty.target.value)}
                        defaultValue={0}
                        error={!!addQtyError}
                        helperText={addQtyError}
                    >
                    </TextField>
                    
                    <Box id='modal-buttons-container'>
                        <Button variant='outlined' onClick={() => createItem() }>Add Item</Button>
                        <Button variant='outlined' onClick={() => setAddModalVisible(false) }>Cancel</Button>
                    </Box>
                </div>
            </Modal>
        </Box>
    )
}

export default CommissaryInventoryPage;
