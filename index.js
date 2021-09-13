const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const banksManagement = require('./routes/banksManagement');

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.use('/banks-management', banksManagement);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
