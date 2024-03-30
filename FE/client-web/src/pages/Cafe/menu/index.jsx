import { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, 
    TextField, Modal, IconButton, Pagination } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import './styles.css';

const CafeInventoryPage = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [requestedItem, setRequestedItem] = useState(0);
    const [requestedQuantity, setRequestedQuantity] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editmodalVisible, seteditModalVisible] = useState(false);
    const [spoiledItemName, setSpoiledItemName] = useState('');
    const [spoiledItemId, setSpoiledItemId] = useState(0);
    const [spoiledQty, setSpoiledQty] = useState('');
    const [spoiledModalVisible, setSpoiledModalVisible] = useState(false);
    const [editModifyQty, seteditModifyQty] = useState();
    const [reqQuantityError, setReqQuantityError] = useState('');
    const [isReqQtyValid, setIsReqQtyValid] = useState(false);
    const [isReqSpoiledValid, setIsReqSpoiledValid] = useState('');
    const [addQtyError, setAddQtyError] = useState('');
    const [stockDifference, setStockDifference] = useState(0);
    const [code, setCode] = useState('');
    const [codeModalVisible, setCodeModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [displayedData, setDisplayedData] = useState([]);
    const [sortOrder, setSortOrder] = useState({ field: '', ascending: true });
    const [isEditValid, setIsEditValid] = useState();
    const [editRequestedItem, seteditRequestedItem] = useState();
    const [editSelectedItem, seteditSelectedItem] = useState();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedPassword = localStorage.getItem('password');
        if (storedPassword) {
          setPassword(storedPassword);
        }
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedData = inventoryData.slice(startIndex, endIndex);
        setDisplayedData(slicedData);
    }, [currentPage, inventoryData, itemsPerPage]); 

    useEffect(() => {
        retrieveInventoryItems();
    }, []);

    useEffect(() => {
        setIsReqQtyValid(!isNaN(requestedQuantity) && requestedQuantity > 0 && requestedQuantity <= inventoryData.find(item => item.id === requestedItem)?.commissary_stock);
        setReqQuantityError(validateQuantity(requestedQuantity, requestedItem));
    }, [requestedQuantity, requestedItem, inventoryData]);

    useEffect(() => {
        setIsReqSpoiledValid(!isNaN(spoiledQty) && spoiledQty >= 0.1 && spoiledQty <= inventoryData.find(item => item.id === spoiledItemId)?.cafe_stock);
    }, [spoiledQty, spoiledItemId, inventoryData]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };    

    const setModalDetails = (item_id, item_name) => {
        setRequestedItem(item_id);
        setSelectedItem(item_name);
        setModalVisible(true);
    }

    const seteditModalDetails = (item_id, item_name) => {
        seteditRequestedItem(item_id);
        seteditSelectedItem(item_name);
        setCodeModalVisible(true);
    }

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

    const retrieveInventoryItems = async () => {
        const data = await fetch('http://127.0.0.1:8000/all_items');
        const response = await data.json();
        setInventoryData(response.items);
        setCurrentPage(1);
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
            return 'Please enter a quantity within the allowable limit.';
        }

        return '';
    };

    const requestItem = async () => {
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

    const reportSpoiledItem = async () => {
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

    const search = async (searched_item) => {
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

    const addToStock = async () => {
        if (editModifyQty > inventoryData.find(item => item.id === editRequestedItem)?.cafe_stock) {
            setAddQtyError('Entered quantity exceeds current stock');
            setIsEditValid(false);
            return;
        } else {
            const currentStock = inventoryData.find(item => item.id === editRequestedItem)?.cafe_stock;
            const difference = currentStock - editModifyQty;
            setStockDifference(difference);
            setAddQtyError('');
            setIsEditValid(true);
        }
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                'stock_update': editModifyQty
            })
        }

        const response = await fetch(`http://127.0.0.1:8000/update_cafe_item/${editRequestedItem}`, requestOptions);
        const data = await response.json();
        
        if (data.response === 'Item Updated'){
            setModalVisible(false);
            retrieveInventoryItems();
        }
    }

    const handleCodeVerification = () => {
        if (code === password) {
            seteditModalVisible(true);
            setCodeModalVisible(false);
            setCode('');
        } else {
            setErrorMessage('Incorrect password. Please try again.');
            setCode('');
        }
    };
    
    const handleCloseModal = () => {
        setCodeModalVisible(false);
        setErrorMessage('');
    };

    
    return (
        <Box>
            <Typography variant='h5'>Inventory</Typography>
            <Typography variant='body1'>Listed below are all the inventory items within the system.</Typography>

            

            <Box id='search-box-container'>
                <TextField label='Search Inventory' id='search-box' size="small" onChange={(search_item) => search(search_item.target.value)}>Search</TextField>
            </Box>

            <TableContainer component={Paper} id='inventory-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">
                        Item Name
                    </TableCell>
                    <TableCell align="center">
                        Category
                <IconButton onClick={() => handleSort('category')}>
                    {sortOrder.field === 'category' && sortOrder.ascending ? <ArrowDownward fontSize='small' /> : <ArrowUpward fontSize='small' />}
                </IconButton>
                    </TableCell>
                <TableCell align="center">
                        Current Stock
                <IconButton onClick={() => handleSort('um')}>
                    {sortOrder.field === 'um' && sortOrder.ascending ? <ArrowDownward fontSize='small'/> : <ArrowUpward fontSize='small' />}
                </IconButton>
                    </TableCell>

                    <TableCell align="center">Request Item</TableCell>
                    <TableCell align="center">Report Spoil</TableCell>
                    <TableCell align="center" className='table-header'>Options</TableCell>
                </TableRow>
            </TableHead>

                    <TableBody>
                        {displayedData.map((item) => (
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
                                <TableCell align="center">
                                    <EditIcon onClick={() => seteditModalDetails(item.id, item.item_name) } />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={modalVisible}
                onClose={() => {setModalVisible(false); setRequestedQuantity('0');}}
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
                        <Button variant='outlined' onClick={() => {setModalVisible(false); setRequestedQuantity('0');} }>
                            Cancel
                        </Button>
                    </Box>
                </div>
            </Modal>


            <Modal
                open={editmodalVisible}
                onClose={() => {seteditModalVisible(false); seteditModifyQty('0')}}
                sx={{ bgcolor: 'background.Paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal'>
                    <Typography variant="h5" id="modal-title">Update Stock</Typography>

                    <Typography variant="h6" id='item-title'>{editSelectedItem}</Typography>
                    <TextField 
                        label="Update Quantity" 
                        type='number' 
                        id="modal-input-field" 
                        size='small' 
                        onChange={(event) => {
                            const value = event.target.value;
                            if (!isNaN(value) && parseFloat(value) >= 0) {
                                seteditModifyQty(parseFloat(value));
                                if (parseFloat(value) > inventoryData.find(item => item.id === editRequestedItem)?.cafe_stock) {
                                    setAddQtyError('Entered quantity exceeds current stock');
                                    setIsEditValid(false);
                                } else {
                                    setAddQtyError('');
                                    setIsEditValid(true);
                                }
                            } else {
                                setAddQtyError('Enter a positive number');
                                setIsEditValid(false);
                            }
                        }}
                   
                        error={!!addQtyError}
                        helperText={addQtyError}
                    />
                    <Typography variant="body2" color="textSecondary" sx={{paddingTop:"2rem"}}>{`Used ${stockDifference} of the amount today`}</Typography>
                    
                    <Box id='modal-buttons-container'>
                        <Button 
                        variant='outlined' 
                        onClick={() => {addToStock(); seteditModalVisible(false)} }
                        disabled={!isEditValid}
                        >
                        Proceed
                        </Button>
                        <Button variant='outlined' onClick={() => seteditModalVisible(false) }>Cancel</Button>
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
            <Modal
                open={codeModalVisible}
                onClose={handleCloseModal}
                sx={{ bgcolor: 'background.Paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal'>
                    <Typography variant="h5" id="modal-title">Enter Password</Typography>
                    <TextField
                        label="Enter Password"
                        type='password'
                        id="modal-input-field"
                        size='small'
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                    />
                     {errorMessage && <Typography variant="body1" style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</Typography>}
                    <Box id='modal-buttons-container'>
                        <Button variant='outlined' onClick={handleCodeVerification}>Submit</Button>
                        <Button variant='outlined' onClick={handleCloseModal}>Cancel</Button>
                    </Box>
                </div>
            </Modal>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                count={Math.ceil(inventoryData.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
            />
            </Box>

        </Box>
    );
};

export default CafeInventoryPage;
