export declare type PropType<A, B> = B extends keyof A ? A[B] : undefined;
