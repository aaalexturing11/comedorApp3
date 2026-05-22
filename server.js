const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the 'public' directory
// extensions: ['html', 'htm'] allows serving /contactanos.html when /contactanos is requested
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html', 'htm']
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
