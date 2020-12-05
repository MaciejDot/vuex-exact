import { PropType } from "../Common";
export declare type UnpackState<Impl> = PropType<Impl, "state"> extends (...args: any) => any ? ReturnType<PropType<Impl, "state">> & {
    [T in keyof PropType<Impl, "modules">]: UnpackState<NonNullable<PropType<PropType<Impl, "modules">, T>>>;
} : PropType<Impl, "state"> & {
    [T in keyof PropType<Impl, "modules">]: UnpackState<NonNullable<PropType<PropType<Impl, "modules">, T>>>;
};
