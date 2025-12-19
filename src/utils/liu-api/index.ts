import canIUse from "./can-i-use"
import { getCharacteristic } from "./characteristic"
import storage from "./storage"

export default {
  canIUse,
  getCharacteristic,
  
  getStorageSync: storage.getStorageSync,
  setStorageSync: storage.setStorageSync,
  removeStorageSync: storage.removeStorageSync,
  clearStorageSync: storage.clearStorageSync,
}