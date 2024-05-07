import crypto from 'crypto';

const hash = crypto.randomBytes(8).toString("hex");
console.log(hash);
