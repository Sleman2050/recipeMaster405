const express = require('express');
const cors = require('cors');
const { getDataFromOpenAi } = require('./path/to/your/openaiFunction');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-dish', getDataFromOpenAi);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});