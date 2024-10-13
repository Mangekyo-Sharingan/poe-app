const express = require('express');
const cors = require('cors');
const wol = require('wake_on_lan');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

function isValidMac(mac) {
  return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);
}

app.post('/wake', (req, res) => {
  const { mac } = req.body;
  console.log('Received wake request for MAC:', mac);
  
  if (!mac) {
    console.error('No MAC address provided');
    return res.status(400).json({ error: 'No MAC address provided' });
  }

  if (!isValidMac(mac)) {
    console.error('Invalid MAC address format:', mac);
    return res.status(400).json({ error: 'Invalid MAC address format' });
  }

  wol.wake(mac, (error) => {
    if (error) {
      console.error('Error sending WoL packet:', error);
      res.status(500).json({ error: 'Failed to send WoL packet' });
    } else {
      console.log('WoL packet sent successfully to MAC:', mac);
      res.json({ message: 'WoL packet sent successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`WoL backend listening at http://localhost:${port}`);
});