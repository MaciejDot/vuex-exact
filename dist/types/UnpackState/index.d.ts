import { PropType } from "../Common";
declare type UnpackStateRecursive<State, Modules> = State extends () => any ? ReturnType<State> & {
    [T in keyof Modules]: UnpackStateRecursive<PropType<PropType<Modules, T>, "state">, NonNullable<PropType<PropType<Modules, T>, "modules">>>;
} : State & {
    [T in keyof Modules]: UnpackStateRecursive<PropType<PropType<Modules, T>, "state">, NonNullable<PropType<PropType<Modules, T>, "modules">>>;
};
export declare type UnpackState<Impl> = UnpackStateRecursive<PropType<Impl, "state">, PropType<Impl, "modules">>;
export {};
