import { Event } from "./Event";

export class Property<T = any> {
    public OnValueChanged: Event<T> = new Event<T>();
    private value: T;
    private bindObjToProperty: Map<Object, string> = new Map;

    public constructor(value: T) {
        this.value = value;
    }

    public get Value() {
        return this.value;
    }

    public set Value(value: T) {
        this.value = value;

        this.bindObjToProperty.forEach((property, obj) => {
            //@ts-ignore
            obj[property] = value;
        });

        this.OnValueChanged.Invoke(value);
    }

    public Bind(reference: Object, property: string) {
        this.bindObjToProperty.set(reference, property);
    }

    public UnBind(reference: Object) {
        this.bindObjToProperty.delete(reference);
    }
}