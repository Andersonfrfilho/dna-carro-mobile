import AsyncStorage from "@react-native-async-storage/async-storage";

interface SetInfoCacheParamDto<T> {
  data: T | string;
  key: string;
}

export async function setInfoCache<T>({
  data,
  key,
}: SetInfoCacheParamDto<T>): Promise<void> {
  if (typeof data !== "string") {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } else {
    await AsyncStorage.setItem(key, data);
  }
}
