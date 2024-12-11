import { IDictionary } from "../interfaces/IDictionary";
import { Ref } from "./Ref";

/**
 * Object based store IDictionary
 * @template TKey - The type of keys in the dictionary (number or string).
 * @template TValue - The type of values in the dictionary.
 */
export class Dictionary<TKey extends number | string, TValue> implements IDictionary<TKey, TValue> {
    private keyToValue: Partial<Record<TKey, TValue>> = {};

    public constructor(keyToValue: Partial<Record<TKey, TValue>> = {}) {
        for (let key in keyToValue) {
            this.keyToValue[key] = keyToValue[key];
        }
    }

    add(key: TKey, value: TValue): void {
        if (this.contains(key)) {
            throw new Error(`${key} is exist`);
        }

        this.keyToValue[key] = value;
    }

    public get(key: TKey): TValue {
        if (this.contains(key) === false) {
            throw new Error(`${key} is not exist`);
        }

        return this.keyToValue[key]!;
    }

    public set(key: TKey, value: TValue) {
        this.keyToValue[key] = value;
    }

    public* [Symbol.iterator](): IterableIterator<[TKey, TValue]> {
        for (let key in this.keyToValue) {
            yield [key, this.keyToValue[key]!];
        }
    }

    public contains(key: TKey): boolean {
        return key in this.keyToValue;
    }

    public tryGetValue(key: TKey, out: Ref<TValue>): boolean {
        if (this.contains(key) === false) return false;

        out.value = this.keyToValue[key]!;
        return true;
    }

    public getValueOrDefault(key: TKey, defaultValue: TValue): TValue {
        if (this.contains(key)) {
            return this.keyToValue[key]!;
        }

        return defaultValue;
    }

    public tryAdd(key: TKey, value: TValue): boolean {
        if (this.contains(key)) return false;

        this.keyToValue[key] = value;
        return true;
    }
}


