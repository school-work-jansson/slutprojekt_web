import path from 'path';
import { fileURLToPath } from 'url';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

// Kommer endast vara dir name som utils.js finns i
export { __dirname }