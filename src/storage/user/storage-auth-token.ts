import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "@storage/storage-config";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
}

async function storageAuthTokenSave({ token, refresh_token }: StorageAuthTokenProps) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refresh_token }));
}

async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  const { token, refresh_token }: StorageAuthTokenProps = response
    ? JSON.parse(response) 
    : {};
  
  return { token, refresh_token };
}

async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}

export { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave };

