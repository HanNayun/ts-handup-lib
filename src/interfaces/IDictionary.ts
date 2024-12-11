import { Ref } from "../structures/Ref";

/**
 * Interface representing a generic dictionary with specified key and value types.
 * The iterate order and store method are not fixed.
 */
export interface IDictionary<TKey extends number | string | symbol, TValue> {
    /**
     * Checks if the collection contains the specified key.
     *
     * @param {TKey} key - The key to check for in the collection.
     * @returns {boolean} - Returns true if the key is present in the collection, false otherwise.
     */
    contains(key: TKey): boolean;

    /**
     * Retrieves the value associated with the specified key.
     *
     * @param {TKey} key - The key for which to retrieve the associated value.
     * @returns {TValue} - The value associated with the specified key.
     * @throws {Error} Will throw an error if the key not exists in the collection.
     */
    get(key: TKey): TValue;

    /**
     * Tries to get the value associated with the specified key.
     *
     * @param {TKey} key - The key of the value to retrieve.
     * @param {Ref<TValue>} out - A reference to store the retrieved value.
     * @return {boolean} - Returns true if the key was found and the value was successfully retrieved, false otherwise.
     */
    tryGetValue(key: TKey, out: Ref<TValue>): boolean;

    /**
     * Retrieves the value associated with the specified key or returns a default value if the key is not found.
     *
     * @param {TKey} key - The key to look up in the collection.
     * @param {TValue} defaultValue - The default value to return if the key is not found.
     * @returns {TValue} - The value associated with the key if found, otherwise the specified defaultValue.
     */
    getValueOrDefault(key: TKey, defaultValue: TValue): TValue;

    /**
     * Adds a new key-value pair to the collection. If the key already exists in the collection, this method will throw an error.
     *
     * @param {TKey} key - The key to add to the collection.
     * @param {TValue} value - The corresponding value to add to the collection.
     * @throws {Error} Will throw an error if the key already exists in the collection.
     * @constructor
     * @return {void}
     */
    add(key: TKey, value: TValue): void;

    /**
     * Tries to add a key-value pair to the collection. If already exists, do nothing.
     *
     * @param {TKey} key - The key to be added.
     * @param {TValue} value - The value to be associated with the key.
     * @returns {boolean} - Returns true if the key-value pair was successfully added, false otherwise.
     */
    tryAdd(key: TKey, value: TValue): boolean;

    /**
     * Sets the value in the Set for a given key.
     *
     * @param {TKey} key - The key to associate with the value in the Set.
     * @param {TValue} value - The value to be stored in the Set.
     * @return {void}
     */
    set(key: TKey, value: TValue): void;

    /**
     * Returns an iterable iterator that yields key-value pairs of type [TKey, TValue].
     *
     * @returns {IterableIterator<[TKey, TValue]>} An iterable iterator of key-value pairs.
     */
    [Symbol.iterator](): IterableIterator<[TKey, TValue]>;
}