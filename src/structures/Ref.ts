export class Ref<T> {
    public get value(): T | undefined {
        return this._value;
    }

    public set value(value: T) {
        this._value = value;
    }

    private _value?: T;

    public constructor(value?: T) {
        this._value = value;
    }
}