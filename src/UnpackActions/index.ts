import { PropType } from "../Common"
type UnpackActionGroup<Prefix extends string, Impl> =
    {
        [T in keyof PropType<Impl, "actions"> as T extends string ?
        "namespaced" extends keyof Impl ?
        PropType<Impl, "namespaced"> extends true ? T : `${Prefix}${T}`
        : T : ""]:
        {
            payload: Parameters<
                PropType<PropType<Impl, "actions">, T> extends (...args: any) => any ?
                PropType<PropType<Impl, "actions">, T>
                : (state: any, payload: any) => any>[1],
            returnType: ReturnType<
                PropType<PropType<Impl, "actions">, T> extends (...args: any) => any ?
                PropType<PropType<Impl, "actions">, T>
                : (state: any, payload: any) => any>
        }
    }

type UnpackActionModule<T extends keyof PropType<Impl, "modules">, Prefix extends string, Impl>
    =
    PropType<Impl, "modules"> extends undefined ?
    UnpackActionGroup<Prefix, Impl> :
    keyof PropType<Impl, "modules"> extends never ?

    UnpackActionGroup<Prefix, Impl> :
    UnpackActionGroup<Prefix, Impl> & UnpackActions<
        T extends string ?
        `${Prefix}${T}/` : "",
        PropType<PropType<Impl, "modules">, T>>

export type UnpackActions<Prefix extends string, Impl extends any> =
    UnpackActionModule<keyof PropType<Impl, "modules">, Prefix, Impl>