import { PropType } from "../Common";
declare type UnpackMutationGroup<Prefix extends string, Impl> = {
    [T in keyof PropType<Impl, "mutations"> as T extends string ? "namespaced" extends keyof Impl ? PropType<Impl, "namespaced"> extends true ? T : `${Prefix}${T}` : T : ""]: Parameters<PropType<PropType<Impl, "mutations">, T> extends (...args: any) => any ? PropType<PropType<Impl, "mutations">, T> : (state: any, payload: any) => any>[1];
};
declare type UnpackMutationsModule<T extends keyof PropType<Impl, "modules">, Prefix extends string, Impl> = PropType<Impl, "modules"> extends undefined ? UnpackMutationGroup<Prefix, Impl> : keyof PropType<Impl, "modules"> extends never ? UnpackMutationGroup<Prefix, Impl> : UnpackMutationGroup<Prefix, Impl> & UnpackMutations<T extends string ? `${Prefix}${T}/` : "", PropType<PropType<Impl, "modules">, T>>;
export declare type UnpackMutations<Prefix extends string, Impl> = UnpackMutationsModule<keyof PropType<Impl, "modules">, Prefix, Impl>;
export {};
