import { StoreOptions, Module, CommitOptions, ModuleTree, Store, DispatchOptions } from 'vuex';
declare type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
declare type UnsafePropType<TObj extends Record<string, any>, TProp extends string> = TObj[TProp];
declare type UnpackActionGroup<Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> = {
    [T in keyof PropType<Impl, "actions"> as T extends string ? "namespaced" extends keyof Impl ? PropType<Impl, "namespaced"> extends true ? T : `${Prefix}${T}` : T : ""]: {
        payload: Parameters<PropType<PropType<Impl, "actions">, T> extends (...args: any) => any ? PropType<PropType<Impl, "actions">, T> : (state: any, payload: any) => any>[1];
        returnType: ReturnType<PropType<PropType<Impl, "actions">, T> extends (...args: any) => any ? PropType<PropType<Impl, "actions">, T> : (state: any, payload: any) => any>;
    };
};
declare type UnpackActionModule<T extends keyof PropType<Impl, "modules">, Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> = PropType<Impl, "modules"> extends undefined ? UnpackActionGroup<Prefix, State, R, Impl> : keyof PropType<Impl, "modules"> extends never ? UnpackActionGroup<Prefix, State, R, Impl> : UnpackActionGroup<Prefix, State, R, Impl> & UnpackActions<T extends string ? `${Prefix}${T}/` : "", UnsafePropType<PropType<PropType<Impl, "modules">, T>, "state">, any, PropType<PropType<Impl, "modules">, T>>;
declare type UnpackActions<Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> = UnpackActionModule<keyof PropType<Impl, "modules">, Prefix, State, R, Impl>;
declare type UnpackMutationGroup<Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> = {
    [T in keyof PropType<Impl, "mutations"> as T extends string ? "namespaced" extends keyof Impl ? PropType<Impl, "namespaced"> extends true ? T : `${Prefix}${T}` : T : ""]: Parameters<PropType<PropType<Impl, "mutations">, T> extends (...args: any) => any ? PropType<PropType<Impl, "mutations">, T> : (state: any, payload: any) => any>[1];
};
declare type UnpackMutationsModule<T extends keyof PropType<Impl, "modules">, Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> = PropType<Impl, "modules"> extends undefined ? UnpackMutationGroup<Prefix, State, R, Impl> : keyof PropType<Impl, "modules"> extends never ? UnpackMutationGroup<Prefix, State, R, Impl> : UnpackMutationGroup<Prefix, State, R, Impl> & UnpackMutations<T extends string ? `${Prefix}${T}/` : "", UnsafePropType<PropType<PropType<Impl, "modules">, T>, "state">, any, PropType<PropType<Impl, "modules">, T>>;
declare type UnpackMutations<Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> = UnpackMutationsModule<keyof PropType<Impl, "modules">, Prefix, State, R, Impl>;
declare type UnpackGettersGroup<Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> = {
    [T in keyof PropType<Impl, "getters"> as T extends string ? "namespaced" extends keyof Impl ? PropType<Impl, "namespaced"> extends true ? T : `${Prefix}${T}` : T : ""]: ReturnType<PropType<PropType<Impl, "getters">, T> extends (...args: any) => any ? PropType<PropType<Impl, "getters">, T> : () => any>;
};
declare type UnpackGettersModule<T extends keyof PropType<Impl, "modules">, Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> = PropType<Impl, "modules"> extends undefined ? UnpackGettersGroup<Prefix, State, R, Impl> : keyof PropType<Impl, "modules"> extends never ? UnpackGettersGroup<Prefix, State, R, Impl> : UnpackGettersGroup<Prefix, State, R, Impl> & UnpackGetters<T extends string ? `${Prefix}${T}/` : "", UnsafePropType<PropType<PropType<Impl, "modules">, T>, "state">, any, PropType<PropType<Impl, "modules">, T>>;
declare type UnpackGetters<Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> = UnpackGettersModule<keyof PropType<Impl, "modules">, Prefix, State, R, Impl>;
declare type UnpackState<State, Modules extends ModuleTree<State>> = State & {
    [T in keyof Modules]: UnpackState<PropType<PropType<Modules, T>, "state">, NonNullable<PropType<PropType<Modules, T>, "modules">>>;
};
export declare type UnpackStore<State, StoreOptionsImpl extends StoreOptions<State>> = Omit<Store<State>, "commit" | "dispatch" | "getters" | "state"> & {
    commit<T extends keyof UnpackMutations<"", State, any, StoreOptionsImpl>>(type: T, payload?: UnpackMutations<"", State, any, StoreOptionsImpl>[T], commitOptions?: CommitOptions): void;
    dispatch<T extends keyof UnpackActions<"", State, any, StoreOptionsImpl>>(type: T, payload?: PropType<UnpackActions<"", State, any, StoreOptionsImpl>[T], "payload">, dispatchOptions?: DispatchOptions): PropType<UnpackActions<"", State, any, StoreOptionsImpl>[T], "returnType">;
    readonly getters: UnpackGetters<"", State, any, StoreOptionsImpl>;
    state: UnpackState<State, NonNullable<PropType<StoreOptionsImpl, "modules">>>;
};
export declare type ActionContext<State, StoreOptionsImpl extends StoreOptions<State>> = {
    commit<T extends keyof UnpackMutations<"", State, any, StoreOptionsImpl>>(type: T, payload?: UnpackMutations<"", State, any, StoreOptionsImpl>[T], commitOptions?: CommitOptions): void;
    dispatch<T extends keyof UnpackActions<"", State, any, StoreOptionsImpl>>(type: T, payload?: PropType<UnpackActions<"", State, any, StoreOptionsImpl>[T], "payload">, dispatchOptions?: DispatchOptions): PropType<UnpackActions<"", State, any, StoreOptionsImpl>[T], "returnType">;
    readonly getters: UnpackGetters<"", State, any, StoreOptionsImpl>;
    state: UnpackState<State, NonNullable<PropType<StoreOptionsImpl, "modules">>>;
    readonly rootGetters: UnpackGetters<"", State, any, StoreOptionsImpl>;
    rootState: UnpackState<State, NonNullable<PropType<StoreOptionsImpl, "modules">>>;
};
export declare type ActionContextModule<ModuleState, MainState, ModuleOptionsImpl extends Module<ModuleState, MainState>, StoreOptionsImpl extends StoreOptions<MainState>> = {
    commit<T extends keyof UnpackMutations<"", ModuleState, MainState, ModuleOptionsImpl>>(type: T, payload?: UnpackMutations<"", ModuleState, MainState, ModuleOptionsImpl>[T], commitOptions?: CommitOptions): void;
    dispatch<T extends keyof UnpackActions<"", ModuleState, MainState, ModuleOptionsImpl>>(type: T, payload?: PropType<UnpackActions<"", ModuleState, MainState, ModuleOptionsImpl>[T], "payload">, dispatchOptions?: DispatchOptions): PropType<UnpackActions<"", ModuleState, MainState, ModuleOptionsImpl>[T], "returnType">;
    readonly getters: UnpackGetters<"", ModuleState, MainState, ModuleOptionsImpl>;
    state: UnpackState<MainState, NonNullable<PropType<ModuleOptionsImpl, "modules">>>;
    readonly rootGetters: UnpackGetters<"", MainState, any, StoreOptionsImpl>;
    rootState: UnpackState<MainState, NonNullable<PropType<StoreOptionsImpl, "modules">>>;
};
export {};
