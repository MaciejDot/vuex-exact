import { StoreOptions, Module, CommitOptions, ModuleTree } from 'vuex'

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]
type UnsafePropType<TObj extends Record<string, any>, TProp extends string> = TObj[TProp];


type UnpackMutationGroup<Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>>=
{
    [T in keyof PropType<Impl, "mutations"> as T extends string ?
    "namespaced" extends keyof Impl ?
    PropType<Impl, "namespaced"> extends true ? T : `${Prefix}${T}`
: T: ""]:
    Parameters<
    PropType<PropType<Impl, "mutations">, T> extends (...args: any) => any ?
    PropType<PropType<Impl, "mutations">, T>
    : (state: any, payload: any) => any>[1] 
}    

type UnpackMutationsModule<T extends keyof PropType<Impl, "modules">, Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>>
    =
    PropType<Impl, "modules"> extends undefined ?
    UnpackMutationGroup<Prefix, State, R, Impl>:
    keyof PropType<Impl, "modules"> extends never ?

    UnpackMutationGroup<Prefix, State, R, Impl> :
    UnpackMutationGroup<Prefix, State, R, Impl> & UnpackMutations<
        T extends string ?
        Prefix extends "" ? `${T}/` : `${Prefix}/${T}/` : "",
        UnsafePropType<PropType<PropType<Impl, "modules">, T>, "state">,
        any,
        PropType<PropType<Impl, "modules">, T>>

type UnpackMutations<Prefix extends string, State, R, Impl extends StoreOptions<State> | Module<State, R>> =
    UnpackMutationsModule<keyof PropType<Impl, "modules">, Prefix, State, R, Impl>

type UnpackState<State, Modules extends ModuleTree<State>> = State & {
    [T in keyof Modules]: UnpackState<PropType<PropType<Modules, T>, "state">,
        NonNullable<PropType<PropType<Modules, T>, "modules">>
    >
}

export type UnpackStore<State, StoreOptionsImpl extends StoreOptions<State>> = {

    readonly commit<T extends keyof UnpackMutations<"", State, any, StoreOptionsImpl>>
        (
            type : T , 
            payload : UnpackMutations<"", State, any, StoreOptionsImpl>[T],
            commitOptions?: CommitOptions) : void
    state: UnpackState<State, NonNullable<PropType<StoreOptionsImpl, "modules">>>
}



const store = {
    state: {
        lan: ""
    },
    mutations: {
        mutter: (state: any, pay: string) => { },
        molec: (state: any) => {}
    }
    modules: {
           ber: {
               namespaced: true,
               state: {
                   lan  : ""
               },
               mutations: {
                   mutter : (state : any, pay: number) => {}
               }
           }
    }
}

const val : Record<"a", string> & Record<"b", number>




const pack: UnpackStore<typeof store.state, typeof store>;
pack.commit("molec",)

//{}Store.dispatch(" erfferf",{})










