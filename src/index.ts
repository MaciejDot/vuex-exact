import { StoreOptions, Module, CommitOptions, ModuleTree } from 'vuex'
type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]
type UnsafePropType<TObj extends Record<string, any>, TProp extends string> = TObj[TProp];

type UnpackMutation<Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>>
    = <T extends keyof PropType<Impl, "mutations">>(type:
        T extends string ?
        "namespaced" extends keyof Impl ?
        PropType<Impl, "namespaced"> extends true ? T : `${Prefix}${T}`
     : T: "",
    payload: Parameters <
        PropType < PropType < Impl, "mutations" >, T > extends (...args: any) => any ?
            PropType<PropType<Impl, "mutations">, T>
    : (state: any, payload: any) => any > [1],
                options ?: CommitOptions) => void;







type UnpackMutationsModule<T extends keyof PropType<Impl, "modules">, Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>>
    = UnpackMutation<Prefix, State, R, Impl> | UnpackMutations<
        T extends string ?
        Prefix extends ""? `${T}/` : `${Prefix}/${T}/` : "",
            UnsafePropType < PropType < PropType < Impl, "modules" >, T >, "state" >,
            any,
            PropType < PropType < Impl, "modules" >, T >>

type UnpackMutations < Prefix extends string, State, R, Impl extends StoreOptions<State> | Module < State, R >> =
                ReturnType << T extends keyof PropType < Impl, "modules" >> () => UnpackMutationsModule < T, Prefix, State, R, Impl >>


type UnpackState < State, Modules extends ModuleTree < State >> = State & {
                [T in keyof Modules] : UnpackState<PropType< PropType < Modules, T >, "state" >,
                NonNullable < PropType < PropType < Modules, T >, "modules" >>
    >
}

export type UnpackStore<State, StoreOptionsImpl extends StoreOptions<State>> = {

                    readonly commit:
                    UnpackMutations<"", State, any, StoreOptionsImpl>,
                    state: UnpackState<State, NonNullable<PropType<StoreOptionsImpl, "modules">>>
                } 