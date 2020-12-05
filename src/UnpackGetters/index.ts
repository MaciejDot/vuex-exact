import { PropType } from "../Common"
type UnpackGettersGroup<Prefix extends string, Impl> =
    {
        [T in keyof PropType<Impl, "getters"> as T extends string ?
        "namespaced" extends keyof Impl ?
        PropType<Impl, "namespaced"> extends true ? T : `${Prefix}${T}`
        : T : ""]:
        ReturnType<PropType<PropType<Impl, "getters">, T> extends (...args: any) => any ? PropType<PropType<Impl, "getters">, T> : () => any>
    }

type UnpackGettersModule<T extends keyof PropType<Impl, "modules">, Prefix extends string, Impl>
    =
    PropType<Impl, "modules"> extends undefined ?
    UnpackGettersGroup<Prefix, Impl> :
    keyof PropType<Impl, "modules"> extends never ?

    UnpackGettersGroup<Prefix, Impl> :
    UnpackGettersGroup<Prefix, Impl> & UnpackGetters<
        T extends string ?
        `${Prefix}${T}/` : "",
        PropType<PropType<Impl, "modules">, T>>

export type UnpackGetters<Prefix extends string, Impl> =
    UnpackGettersModule<keyof PropType<Impl, "modules">, Prefix, Impl>
