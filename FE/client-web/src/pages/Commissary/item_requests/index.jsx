import React, { useState, useEffect } from "react";
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import './styles.css';

const CommissaryTransferHistoryPage = () => {
  const [transferData, setTransferData] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [modalDate, setModalDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    isOpen: false,
    action: '',
    transactionId: null,
  });

  useEffect(() => {
    retrieveInventoryItems();
  }, []);

  async function retrieveInventoryItems() {
    const data = await fetch('http://127.0.0.1:8000/all_transactions');
    const response = await data.json();

    setTransferData(response.transactions);
  }

  async function processTransaction(transaction_id, action) {
    setConfirmationData({
      isOpen: true,
      action,
      transactionId: transaction_id,
    });
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

  function confirmTransaction() {
    const { action, transactionId } = confirmationData;
    setIsModalVisible(true);
    executeTransaction(action, transactionId);
    setConfirmationData({
      isOpen: false,
      action: '',
      transactionId: null,
    });
  }

  function cancelConfirmation() {
    setConfirmationData({
      isOpen: false,
      action: '',
      transactionId: null,
    });
  }

  async function executeTransaction(action, transaction_id) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'id': transaction_id,
        'action': action,
      }),
    };

    const response = await fetch(`http://127.0.0.1:8000/process_transaction/${transaction_id}`, requestOptions);
    const data = await response.json();

    setModalDate(data.date_changed);
    setModalMessage(data.response);
    retrieveInventoryItems();
  }

  async function search(searched_item) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'search': searched_item
      })
    }

    const data = await fetch('http://127.0.0.1:8000/search_transfer_requests', requestOptions);
    const response = await data.json();

    setTransferData(response.transactions);
  }

  function convertToPhTime(date_time) {
    let date = new Date(date_time);
    let convertedDate = date.toLocaleString('en-US', { timeZone: 'Asia/Manila' });

    return convertedDate;
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
            label="Search Transactions..."
            size="small"
            sx={{ marginTop: '7.5%', marginLeft: "84%", paddingBottom: "1rem" }}
            onChange={(search_item) => search(search_item.target.value)}
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
                <TableCell align="center">{formatDateTime(transfer.date_created)}</TableCell>
                <TableCell align="center">{transfer.approval}</TableCell>
                <TableCell align="center">
                  {transfer.approval === 'Pending' && transfer.transacted_amount <= transfer.transacted_item.commissary_stock && (
                    <>
                      <CheckIcon onClick={() => processTransaction(transfer.id, 'Approved')} />
                      <DoDisturbIcon onClick={() => processTransaction(transfer.id, 'Denied')} />
                    </>
                  )}
                  {transfer.approval === 'Pending' && transfer.transacted_amount > transfer.transacted_item.commissary_stock && (
                    <DoDisturbIcon onClick={() => processTransaction(transfer.id, 'Denied')} />
                  )}
                </TableCell>
                {transfer.approval !== 'Pending' && (
                  <TableCell align="center">
                    -
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={confirmationData.isOpen}
        onClose={cancelConfirmation}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title" style={{ backgroundColor: confirmationData.action === 'Approved' ? '#75975e' : '#8F011B', color: 'white' }}>
          Confirmation
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6">Are you sure you want this transaction to be {confirmationData.action.toLowerCase()}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={confirmTransaction}>Confirm</Button>
          <Button variant='outlined' onClick={cancelConfirmation}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
        aria-labelledby="modal-title"
      >
        <DialogContent>
          <Typography variant="h5" id="modal-title">Message</Typography>
          <Typography variant="h6" id='item-title'>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => setIsModalVisible(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CommissaryTransferHistoryPage;
