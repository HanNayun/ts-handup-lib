import { Action } from "./Action";

export class Event<TArg1 = void, TArg2 = void, TArg3 = void, TArg4 = void, TArg5 = void, TArg6 = void> {
    private listeners: Set<Action<void, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>> = new Set;
    private listenToCaller: Map<Action<void, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>, any> = new Map;

    public Add(listener: Action<void, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>, caller: any) {
        this.listeners.add(listener);
        this.listenToCaller.set(listener, caller);
    }

    public Remove(listener: Action<void, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>) {
        this.listeners.delete(listener);
        this.listenToCaller.delete(listener);
    }

    public RemoveCaller(caller: any) {
        const deletedListener: Action<void, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>[] = [];
        for (let [listener, value] of this.listenToCaller) {
            if (caller == value) {
                deletedListener.push(listener);
            }
        }

        deletedListener.forEach(listener => {
            this.listeners.delete(listener);
            this.listenToCaller.delete(listener);
        });
    }

    public Invoke(arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6): void {
        this.listeners.forEach(cb => {
            const caller = this.listenToCaller.get(cb);
            (cb as Function).bind(caller)(arg1, arg2, arg3, arg4, arg5, arg6);
        });
    }

    public Clear() {
        this.listeners.clear();
        this.listenToCaller.clear();
    }
}