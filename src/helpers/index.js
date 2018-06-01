import { KEY_CODES, KEYS } from '../constants'

export function log (msg) {
  console.log(msg)
}

export function getKeyFromKeyCode (keyCode) {
  return KEY_CODES[keyCode] || KEYS.UNKNOWN
}

export default {
  getKeyFromKeyCode,
  log,
}
