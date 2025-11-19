import * as SecureStore from "expo-secure-store";

export async function saveItem(key: string, value: any): Promise<void> {
  try {
    const jsonValue = typeof value === "string" ? value : JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (error) {
    console.error(`Error saving ${key}`, error);
  }
}

export async function getItem<T = any>(key: string): Promise<T | null> {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T; // value was plain string
    }
  } catch (error) {
    console.error(`Error reading ${key}`, error);
    return null;
  }
}

export async function deleteItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error deleting ${key}`, error);
  }
}
