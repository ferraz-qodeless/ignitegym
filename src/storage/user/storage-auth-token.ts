import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "@storage/storage-config";

async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

async function storageAuthTokenGet() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  return token;
}

export { storageAuthTokenGet, storageAuthTokenSave };

