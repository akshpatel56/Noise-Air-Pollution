const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static site files from project root
app.use(express.static(path.join(__dirname)));

// List available API files
app.get('/api', (req, res) => {
  const apiDir = path.join(__dirname, 'api');
  fs.readdir(apiDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'API directory not available' });
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    res.json({ files: jsonFiles });
  });
});

// Serve specific API JSON files (e.g. /api/cities.json or /api/cities)
app.get('/api/:name', (req, res) => {
  let name = req.params.name;
  if (!name.endsWith('.json')) name += '.json';
  const filePath = path.join(__dirname, 'api', name);
  res.sendFile(filePath, err => {
    if (err) res.status(404).json({ error: 'Not found' });
  });
});

// Fallback to index.html for SPA-style navigation
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
