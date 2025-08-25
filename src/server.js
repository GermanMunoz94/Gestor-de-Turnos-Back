import config from './config/env.js';
import app from './app.js';

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`);
});