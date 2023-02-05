import { TextField, Box, Button } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import { calculateDeliveryFee } from './calculateDeliveryFee';

const DeliveryForm: React.FC = () => {
  const [cartValue, setCartValue] = useState(1);
  const [deliveryDistance, setDeliveryDistance] = useState(1000);
  const [itemCount, setItemCount] = useState(1);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderDate, setOrderDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );

  const handleChange = (newValue: Dayjs | null) => {
    setOrderDate(newValue);
  };

  const handleSubmit = () => {
    setDeliveryFee(
      calculateDeliveryFee(cartValue, deliveryDistance, itemCount, orderDate?.toDate())
    );
  };

  return (
    <form>
      <TextField
        label="Cart Value (€)"
        type="number"
        value={cartValue}
        onChange={(event) => setCartValue(Number(event.target.value))}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Delivery Distance (meters)"
        type="number"
        value={deliveryDistance}
        onChange={(event) => setDeliveryDistance(Number(event.target.value))}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Number of Items"
        type="number"
        value={itemCount}
        onChange={(event) => setItemCount(Number(event.target.value))}
        margin="normal"
        fullWidth
      />
      <Box mt={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={orderDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Calculate Delivery Fee
        </Button>
      </Box>
      <Box mt={2}>
        <p>Delivery Fee: {deliveryFee} €</p>
      </Box>
    </form>
  );
};

export default DeliveryForm;
