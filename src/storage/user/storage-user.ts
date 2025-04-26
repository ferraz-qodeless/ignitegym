import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@storage/storage-config";

import { UserDTO } from "@dtos/UserDTO";

async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);
  const user: UserDTO = storage ? JSON.parse(storage) : {};
  return user;
}

export { storageUserGet, storageUserSave };
