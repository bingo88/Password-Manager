import {pbkdf2Cry} from './crypto'
export function calcEntropy(profile, masterPassword) {
    const { site, login, options, crypto } = profile;
    const defaultOptions = { counter: 1 };
    const { counter } = options || defaultOptions;
    const salt = site + login + counter.toString(16);
    const defaultCrypto = { iterations: 100000, keylen: 32, digest: "sha256" };
    const { iterations, keylen, digest } = crypto || defaultCrypto;
    return pbkdf2Cry(masterPassword, salt, iterations, keylen, digest);
  }