import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, 
    TextField, Modal, IconButton } from "@mui/material";
import './styles.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CafeInventoryPage = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [requestedItem, setRequestedItem] = useState(0);
    const [requestedQuantity, setRequestedQuantity] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [spoiledItemName, setSpoiledItemName] = useState('');
    const [spoiledItemId, setSpoiledItemId] = useState(0);
    const [spoiledQty, setSpoiledQty] = useState('');
    const [spoiledModalVisible, setSpoiledModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reqQuantityError, setReqQuantityError] = useState('');
    const [isReqQtyValid, setIsReqQtyValid] = useState(false);
    const [reqSpoiledError, setReqSpoiledError] = useState('');
    const [isReqSpoiledValid, setIsReqSpoiledValid] = useState('');
    const [sortOrder, setSortOrder] = useState({
        field: '',
        ascending: true,
    });

    useEffect(() => {
        retrieveInventoryItems();
    }, []);

    useEffect(() => {
        setIsReqQtyValid(!isNaN(requestedQuantity) && requestedQuantity > 0 && requestedQuantity <= inventoryData.find(item => item.id === requestedItem)?.commissary_stock);
        setReqQuantityError(validateQuantity(requestedQuantity, requestedItem));
    }, [requestedQuantity, requestedItem, inventoryData]);

    useEffect(() => {
        setIsReqSpoiledValid(!isNaN(spoiledQty) && spoiledQty >= 1 && spoiledQty <= inventoryData.find(item => item.id === spoiledItemId)?.commissary_stock);
        setReqSpoiledError(validateQuantity(spoiledQty, spoiledItemId));
    }, [spoiledQty, spoiledItemId, inventoryData]);

    const setModalDetails = (item_id, item_name) => {
        setRequestedItem(item_id);
        setSelectedItem(item_name);
        setModalVisible(true);
    };

    const setSpoiledModalDetails = (item_id, item_name) => {
        setSpoiledItemId(item_id);
        setSpoiledItemName(item_name);
        setSpoiledModalVisible(true);
    };

    const handleSort = (field) => {
        if (field === 'item_name') {
            return; 
        }

        const isAsc = sortOrder.field === field ? !sortOrder.ascending : true;
        setSortOrder({ field, ascending: isAsc });

        const sortedInventory = [...inventoryData];

        if (field === 'um') {
            
            sortedInventory.sort((a, b) => {
                const aValue = a['um'].toString().toLowerCase();
                const bValue = b['um'].toString().toLowerCase();
                return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            });
        } else {
            
            sortedInventory.sort((a, b) => {
                const aValue = field === 'item_name' ? a[field].toString().toLowerCase() : a[field];
                const bValue = field === 'item_name' ? b[field].toString().toLowerCase() : b[field];
                return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            });
        }

        setInventoryData(sortedInventory);
    };

    async function retrieveInventoryItems() {
        const data = await fetch('http://127.0.0.1:8000/all_items');
        const response = await data.json();
        setInventoryData(response.items);
    }

    const validateRequest = (quantity, itemId) => {
        let valid = true;
        const quantityError = validateQuantity(quantity, itemId);

        if (quantityError) {
            setReqQuantityError(quantityError);
            valid = false;
        } else {
            setReqQuantityError('');
        }

        return valid;
    };

    const validateQuantity = (quantity, itemId) => {
        if (isNaN(quantity) || quantity < 0) {
            return '';
        }

        const currentStock = inventoryData.find(item => item.id === itemId)?.commissary_stock;

        if (quantity > 0 && quantity > currentStock) {
            return 'Requested quantity exceeds available stock.';
        }

        return '';
    };

    async function requestItem() {
        if (!validateRequest(requestedQuantity, requestedItem)) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                'item_id': requestedItem,
                'request_quantity': requestedQuantity,
                'transactor': JSON.parse(localStorage.getItem('user_data'))
            })
        };

        const response = await fetch(`http://127.0.0.1:8000/request_item/${requestedItem}`, requestOptions);
        const data = await response.json();
        
        if (data.response === 'Request Made.'){
            setModalVisible(false);
        }
    }

    async function reportSpoiledItem() {
        if (!validateRequest(spoiledQty, spoiledItemId)) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                'item_id': spoiledItemId,
                'spoil_amount': spoiledQty,
                'report_creator': JSON.parse(localStorage.getItem('user_data'))
            })
        };

        const response = await fetch(`http://127.0.0.1:8000/report_spoiled/${spoiledItemId}`, requestOptions);
        const data = await response.json();
        
        if (data.response === 'Spoil Report Created' || data.response === 'Invalid Spoil Report'){
            setSpoiledModalVisible(false);
            retrieveInventoryItems();
        }
    }

    return (
        <Box>
            <Typography variant='h5'>Inventory</Typography>
            <Typography variant='body1'>Listed below are all the inventory items within the system.</Typography>

            <TableContainer component={Paper} id='inventory-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
    <TableRow>
        <TableCell align="center">
            Item Name
        </TableCell>
        <TableCell align="center" onClick={() => handleSort('category')}>
            Category
            {sortOrder.field === 'category' && sortOrder.ascending ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </TableCell>
        <TableCell align="center" onClick={() => handleSort('um')}>
    Current Stock
    {sortOrder.field === 'um' && sortOrder.ascending ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
</TableCell>
        <TableCell align="center">Request Item</TableCell>
        <TableCell align="center">Report Spoil</TableCell>
    </TableRow>
</TableHead>

                    <TableBody>
                        {inventoryData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component="th" align='center' scope="row">
                                    {item.item_name}
                                </TableCell>
                                <TableCell align="center">
                                    {item.category}
                                </TableCell>
                                <TableCell align="center">
                                    {item.cafe_stock} {item.um}
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant='outlined' onClick={() => setModalDetails(item.id, item.item_name)}>
                                        Request Stock
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant='outlined' onClick={() => setSpoiledModalDetails(item.id, item.item_name)}>
                                        Report Spoiled Item
                                    </Button>
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
                    <Typography variant="h5" id="modal-title">Request Item from Commissary</Typography>
                    <Typography variant="h6" id='item-title'>{selectedItem}</Typography>
                    <TextField 
                        label="Request Quantity" 
                        type='number' 
                        id="modal-input-field" 
                        size='small'
                        placeholder='0' 
                        onChange={(qty) => setRequestedQuantity(qty.target.value)}
                        error={!!reqQuantityError}
                        helperText={reqQuantityError}
                    />
                    <Box id='modal-buttons-container'>
                        <Button variant='outlined' onClick={() => requestItem() } disabled={!isReqQtyValid}>
                            Proceed
                        </Button>
                        <Button variant='outlined' onClick={() => setModalVisible(false) }>
                            Cancel
                        </Button>
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
                <div className='modal'>
                    <Typography variant="h5" id="modal-title">Report Spoiled Item</Typography>
                    <Typography variant="h6" id='item-title'>{spoiledItemName}</Typography>
                    <TextField 
                        label="Amount of Items Spoiled" 
                        type='number' 
                        id="modal-input-field" 
                        size='small' 
                        placeholder='0' 
                        onChange={(spoilQty) => setSpoiledQty(spoilQty.target.value)}
                        error={!!reqSpoiledError}
                        helperText={reqSpoiledError}
                    />
                    <Box id='modal-buttons-container'>
                        <Button 
                            variant='outlined' 
                            onClick={() => reportSpoiledItem()}
                            disabled={!isReqSpoiledValid}
                        >
                            Report
                        </Button>
                        <Button variant='outlined' onClick={() => setSpoiledModalVisible(false) }>
                            Cancel
                        </Button>
                    </Box>
                </div>
            </Modal>
        </Box>
    );
};

export default CafeInventoryPage;
