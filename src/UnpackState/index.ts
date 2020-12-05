import { PropType } from "../Common"

type UnpackStateRecursive<State, Modules> = 
State extends () => any ?
ReturnType<State> & {
    [T in keyof Modules]: UnpackStateRecursive<PropType<PropType<Modules, T>, "state">,
        NonNullable<PropType<PropType<Modules, T>, "modules">>
    >
}
:
State & {
    [T in keyof Modules]: UnpackStateRecursive<PropType<PropType<Modules, T>, "state">,
        NonNullable<PropType<PropType<Modules, T>, "modules">>
    >
}

export type UnpackState<Impl> = UnpackStateRecursive<
PropType<Impl, "state">
, PropType<Impl, "modules">>