import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Pagination} from "@mui/material";
import './styles.css';

const CafeInventoryPage = () => {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        retrieveInventoryItems();
    }, []);

    async function retrieveInventoryItems(){
        const data = await fetch('http://127.0.0.1:8000/all_items');
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
                            <Button variant='outlined'>Request Stock</Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

            <Pagination sx={{ marginTop: '2%' }} count={10} />
        </Box>
    )
}

export default CafeInventoryPage;
