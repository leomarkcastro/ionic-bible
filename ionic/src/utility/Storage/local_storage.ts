import { Storage } from '@capacitor/storage';

export async function db_set(key: string, value: any): Promise<void> {
  await Storage.set({
    key: key,
    value: JSON.stringify(value)
  });
}

export async function db_get(key: string): Promise<any> {
  const item = await Storage.get({ key: key });
  return JSON.parse(item.value);
}

export async function db_remove(key: string): Promise<void> {
  await Storage.remove({
    key: key
  });
}

export async function db_check(key:string): Promise<boolean> {
  let allKey = await Storage.keys()
  let allKey_p = allKey.keys
  return allKey_p.includes(key)
}