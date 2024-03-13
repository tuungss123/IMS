import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Pagination, Modal, Select, MenuItem, FormControl, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './styles.css';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

const CommissaryInventoryPage = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [sortOrder, setSortOrder] = useState({ column: '', direction: 'asc' });

    // modify item quantity
    const [selectedItem, setSelectedItem] = useState('');
    const [requestedItem, setRequestedItem] = useState(0);
    const [modifyQty, setModifyQty] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    // add item
    const [addItemName, setAddItemName] = useState('');
    const [addQty, setAddQty] = useState(0);
    const [category, setCategory] = useState('Dry Ingredients');
    const [um, setUM] = useState('KG');
    const [addModalVisible, setAddModalVisible] = useState(false);

    // add item verification
    const [addItemError, setAddItemError] = useState('');
    const [addQtyError, setAddQtyError] = useState('');

    // edit item validation
    const [isEditValid, setIsEditValid] = useState(false); // changed to false initially

    useEffect(() => {
        retrieveInventoryItems();
    }, []);

    useEffect(() => {
        // Reset state when add modal is opened
        if (addModalVisible) {
            setAddItemName('');
            setAddQty(0);
            setAddItemError('');
            setAddQtyError('');
        }
    }, [addModalVisible]);

    const setModalDetails = (item_id, item_name) => {
        setRequestedItem(item_id);
        setSelectedItem(item_name);
        setModalVisible(true);
    }

    async function retrieveInventoryItems(){
        const data = await fetch('http://127.0.0.1:8000/all_items');
        //const data = await fetch('https://ims-be-j66p.onrender.com/all_items');
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
        
        const itemExists = inventoryData.some(item => item.item_name === addItemName);
        if (itemExists) {
            setAddItemError('Item name already exists');
            valid = false;
        }
        if (isNaN(addQty) || addQty < 0) {
            setAddQtyError('Please enter a positive number');
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
                'commissary_stock': addQty,
                'category': category,
                'um': um
            })
        }

        const response = await fetch(`http://127.0.0.1:8000/create_item`, requestOptions);
        // const response = await fetch(`https://ims-be-j66p.onrender.com/create_item`, requestOptions);
        const data = await response.json();
        
        console.log(data.response);
        if (data.response === 'Item Created'){
            setAddModalVisible(false);
            retrieveInventoryItems();
            setCategory('Dry Ingredients');
            setUM('KG');
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
        //const response = await fetch(`https://ims-be-j66p.onrender.com/update_item/${requestedItem}`, requestOptions);
        const data = await response.json();
        
        if (data.response === 'Item Updated'){
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
        //const data = await fetch('https://ims-be-j66p.onrender.com/search_items', requestOptions);
        const response = await data.json();
        
        setInventoryData(response.items);
    }

    const sortInventoryData = (column) => {
        let direction = 'asc';
        if (sortOrder.column === column && sortOrder.direction === 'asc') {
            direction = 'desc';
        }
        setSortOrder({ column, direction });

        const sortedData = [...inventoryData].sort((a, b) => {
            if (column === 'commissary_stock') {
               
                if (a.um !== b.um) {
                    return a.um.localeCompare(b.um);
                } else {
                    
                    return (sortOrder.direction === 'asc' ? a.commissary_stock - b.commissary_stock : b.commissary_stock - a.commissary_stock);
                }
            } else if (column === 'category') {
                return (sortOrder.direction === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category));
            }
            return 0;
        });
        setInventoryData(sortedData);
    };

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
                            <TableCell align="center" className='table-header'>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Item Name
                                </div>
                            </TableCell>
                            <TableCell align="center" className='table-header'>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Category
                                    <IconButton onClick={() => sortInventoryData('category')}>
                                        {sortOrder.column === 'category' && sortOrder.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                                    </IconButton>
                                </div>
                            </TableCell>
                            <TableCell align="center" className='table-header'>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Current Stock
                                    <IconButton onClick={() => sortInventoryData('commissary_stock')}>
                                        {sortOrder.column === 'commissary_stock' && sortOrder.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                                    </IconButton>
                                </div>
                            </TableCell>
                            <TableCell align="center" className='table-header'>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventoryData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell align="center" component="th" scope="row">
                                    {item.item_name}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {item.category}
                                </TableCell>
                                <TableCell align="center">
                                    {item.commissary_stock} {item.um}
                                </TableCell>
                                <TableCell align="center">
                                    <EditIcon onClick={() => setModalDetails(item.id, item.item_name)} fontSize="small" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={modalVisible}
                onClose={() => setModalVisible(false)}
                sx={{ bgcolor: 'background.Paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal'>
                    <Typography variant="h5" id="modal-title">Edit Stock</Typography>

                    <Typography variant="h6" id='item-title'>{selectedItem}</Typography>
                    <TextField 
                        label="Edit Quantity" 
                        type='number' 
                        id="modal-input-field" 
                        size='small' 
                        placeholder='0'
                        onChange={(event) => {
                            const value = event.target.value;
                            if (!isNaN(value) && parseInt(value) >= 0) {
                                setModifyQty(parseInt(value));
                                setIsEditValid(true);
                                setAddQtyError('');
                            } else {
                                setAddQtyError('Enter a positive number');
                                setIsEditValid(false);
                            }
                        }}
                   
                        error={!!addQtyError}
                        helperText={addQtyError}
                    />
                    
                    <Box id='modal-buttons-container'>
                        <Button 
                        variant='outlined' 
                        onClick={() => addToStock() }
                        disabled={!isEditValid}
                        >
                        Proceed
                        </Button>
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
                        value={addItemName}
                        onChange={(event) => setAddItemName(event.target.value)}
                        error={!!addItemError}
                        helperText={addItemError}
                    />

                    <Typography variant="h6" id='item-title'>Quantity</Typography>
                    <TextField 
                        label="Amount of Items to Add" 
                        type='number' 
                        id="modal-input-field" 
                        size='small' 
                        placeholder='0'
                        
                        onChange={(event) => setAddQty(event.target.value)}
                        error={!!addQtyError}
                        helperText={addQtyError}
                    />

                    <Typography variant="h6" id='item-title'>Category</Typography>
                    <FormControl fullWidth>
                        <Select
                            value={category}
                            onChange={(changeValue) => setCategory(changeValue.target.value)}
                        >
                            <MenuItem value={'Dry Ingredients'}>Dry Ingredients</MenuItem>
                            <MenuItem value={'Proteins'}>Proteins</MenuItem>
                            <MenuItem value={'Baking'}>Baking</MenuItem>
                            <MenuItem value={'Spices'}>Spices</MenuItem>
                            <MenuItem value={'Sauces and Condiments'}>Sauces and Condiments</MenuItem>
                            <MenuItem value={'Others (packagings)'}>Others (packagings)</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Typography variant="h6" id='item-title'>Unit of Measure</Typography>
                    <FormControl fullWidth>
                        <Select
                            value={um}
                            onChange={(changeValue) => setUM(changeValue.target.value)}
                        >
                            <MenuItem value={'KG'}>KG (Kilogram)</MenuItem>
                            <MenuItem value={'g'}>g (Gram)</MenuItem>
                            <MenuItem value={'L'}>L (Liter)</MenuItem>
                            <MenuItem value={'mL'}>mL (Milliliter)</MenuItem>
                            <MenuItem value={'PC'}>PC (Piece)</MenuItem>
                        </Select>
                    </FormControl>
                    
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
