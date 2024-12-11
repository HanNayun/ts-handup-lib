export type Task<
    TReturn = void,
    TArg1 = void,
    TArg2 = void,
    TArg3 = void,
    TArg4 = void,
    TArg5 = void,
    TArg6 = void
> = TArg1 extends void
    ? () => Promise<TReturn>
    : TArg2 extends void
      ? (arg1: TArg1) => Promise<TReturn>
      : TArg3 extends void
        ? (arg1: TArg1, arg2: TArg2) => Promise<TReturn>
        : TArg4 extends void
          ? (arg1: TArg1, arg2: TArg2, arg3: TArg3) => Promise<TReturn>
          : TArg5 extends void
            ? (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4) => Promise<TReturn>
            : TArg6 extends void
              ? (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5) => Promise<TReturn>
              : (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4, arg5: TArg5, arg6: TArg6) => Promise<TReturn>;
