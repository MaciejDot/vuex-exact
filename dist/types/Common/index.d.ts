export declare type PropType<A, B> = A[B extends keyof A ? B : any];
