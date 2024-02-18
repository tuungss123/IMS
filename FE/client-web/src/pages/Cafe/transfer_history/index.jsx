import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './styles.css';

const TransferHistoryPage = () => {
  const [transferData, setTransferData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
      retrieveInventoryItems();
  }, []);

  async function retrieveInventoryItems(){
    const data = await fetch('http://127.0.0.1:8000/all_transactions');
    const response = await data.json();
    
    console.log(response.transactions);
    setTransferData(response.transactions);
}

  async function deleteTransaction(transaction_id){
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json' }
    }

    const response = await fetch(`http://127.0.0.1:8000/delete_transaction/${transaction_id}`, requestOptions);
    const data = await response.json();

    console.log(data.response);
    retrieveInventoryItems();
  }

  return (
    <Box>
      <Typography variant="h5">Transfer Requests</Typography>
      <Typography variant='body1'>Listed below are all the transfer requests made within the system.</Typography>

      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search Transactions..."
            size="small"
            sx={{ marginTop: '7.5%' }}
          />
        </div>
      </div>
        <TableContainer component={Paper} id='transfers-table'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow id='header-row'>
                  <TableCell align="center" className='table-header'>Requested Item</TableCell>
                  <TableCell align="center" className='table-header'>Quantity</TableCell>
                  <TableCell align="center" className='table-header'>Transactor</TableCell>
                  <TableCell align="center" className='table-header'>Request Date</TableCell>
                  <TableCell align="center" className='table-header'>Approval Status</TableCell>
                  <TableCell align="center" className='table-header'>Options</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
              {transferData.map((transfer) => (
                  <TableRow key={transfer.id}>
                      <TableCell component="th" align="center">{transfer.transacted_item.item_name}</TableCell>
                      <TableCell align="center">{transfer.transacted_amount}</TableCell>
                      <TableCell align="center">{transfer.transactor}</TableCell>
                      <TableCell align="center">{transfer.date_created}</TableCell>
                      <TableCell align="center">{transfer.approval}</TableCell>
                      {transfer.approval === 'Pending' && (
                        <TableCell align="center">
                          <EditOutlinedIcon />
                          <DeleteOutlineOutlinedIcon onClick={() => deleteTransaction(transfer.id)} />
                        </TableCell>
                      )}
                      {transfer.approval != 'Pending' && (
                        <TableCell align="center">
                          -
                        </TableCell>
                      )}
                  </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>

        {/* <Modal
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
        </Modal> */}
    </Box>
  )
}

export default TransferHistoryPage;
