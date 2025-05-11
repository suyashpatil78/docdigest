const fs = require('fs');
const path = require('path');
const environment = require('./environment').environment.toString();

const envPath = path.resolve(process.cwd(), 'src/app/environments/environment.ts');
fs.writeFileSync(envPath, environment);
