import crypto  from 'crypto'
export function pbkdf2Cry(password, salt, iterations, keylen, digest) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keylen, digest, (error, key) => {
            if (error) {
                reject(error);
            } else {
                resolve(key.toString("hex"));
            }
        });
    })
}