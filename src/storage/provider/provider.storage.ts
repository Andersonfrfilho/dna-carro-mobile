import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export async function setStorageItemAsync(key: string, value: string) {
  try {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (error) {
    console.error("Local storage set unavailable:", error);
  }
}

export async function getStorageState<T>(key: string): Promise<T> {
  if (Platform.OS === "web") {
    try {
      const dataItem = localStorage.getItem(key);
      /**how to return localstorage is string return but object convert in stringify convert with JSON.parse */
      return Promise.resolve(JSON.parse(dataItem)) as T;
    } catch (e) {
      console.error("Local storage get unavailable:", e);
    }
  } else {
    const dataItem = await AsyncStorage.getItem(key);
    return JSON.parse(dataItem) as T;
  }
}
