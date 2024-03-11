import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField} from "@mui/material";
import './styles.css';

const CommissaryAnalyis = () => {
    const [critStock, setCritStock] = useState([]);
 


    useEffect(() => {
        retrieveCommissaryCritical();
    }, []);

 
    
    async function retrieveCommissaryCritical(){
        const data = await fetch('http://127.0.0.1:8000/retrieve_commissary_critical');
        //const data = await fetch('https://ims-be-j66p.onrender.com/retrieve_commissary_critical');
        const response = await data.json();
        
        setCritStock(response.items);

      
    }


    return (
        <Box>
            <Typography variant='h5'>Stock Analysis</Typography>
            <Typography variant='body1'>A summative report on transactions and items within the system.</Typography>

            <Box id='search-box-container'>
                <TextField label='Search Critical Item' id='search-box' size="small" onChange={(search_item) => search(search_item.target.value)}>Search</TextField>
            </Box>
            
            
            <Typography variant='h6'>Items with Critical Stock</Typography>
            <TableContainer component={Paper} id='spoilage-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow id='header-row'>
                        <TableCell align="center" className='table-header'>Item Name</TableCell>
                        <TableCell align="center" className='table-header'>Category</TableCell>
                        <TableCell align="center" className='table-header'>Current Stock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {critStock.map((stock) => (
                        <TableRow key={stock.id}>
                            <TableCell component="th" scope="row">
                                {stock.item_name}
                            </TableCell>
                            <TableCell align="center">{stock.category}</TableCell>
                            <TableCell align="center">{stock.commissary_stock}{stock.um}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

        </Box>
    )
}

export default CommissaryAnalyis;
