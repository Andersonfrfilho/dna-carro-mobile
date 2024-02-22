import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import {
  SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY,
  SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY,
} from "../keys/sign-in.keys";

export async function setSecurityStorageItemAsync(key: string, value: string) {
  try {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error("Local storage set unavailable:", error);
  }
}

export async function getSecurityStorageState<T>(key: string): Promise<T> {
  if (Platform.OS === "web") {
    try {
      const dataItem = localStorage.getItem(key);
      /**how to return localstorage is string return but object convert in stringify convert with JSON.parse */
      return Promise.resolve(JSON.parse(dataItem)) as T;
    } catch (e) {
      console.error("Local storage get unavailable:", e);
    }
  } else {
    const dataItem = await SecureStore.getItemAsync(key);
    return JSON.parse(dataItem) as T;
  }
}

export async function removeSecurityByKeysItemsAsync(keys: string[]) {
  try {
    for (const key of keys) {
      await removeSecurityStorageItemAsync(key);
    }
  } catch (error) {
    console.error("Local storage remove unavailable:", error);
  }
}

async function removeSecurityStorageItemAsync(key: string) {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error("Local storage remove unavailable:", error);
  }
}

export async function removeSecurityStorageAll() {
  try {
    const keys = [
      SIGN_IN_AUTH_TOKEN_STORAGE_SECURITY_KEY,
      SIGN_IN_AUTH_REFRESH_TOKEN_STORAGE_SECURITY_KEY,
    ];

    for (const key of keys) {
      await removeSecurityStorageItemAsync(key);
    }
  } catch (error) {
    console.error("Local storage remove unavailable:", error);
  }
}
