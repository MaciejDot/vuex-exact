import { convertTypeAcquisitionFromJson, isSwitchStatement } from 'typescript';
import Vuex, { Store, StoreOptions, MutationTree, CommitOptions, ModuleTree, ActionTree, DispatchOptions, mapActions, GetterTree, Module } from 'vuex'
type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]
type UnsafePropType<TObj extends Record<string, any>, TProp extends string> = TObj[TProp ]

var storeOptions = {
    mutations: {
        name: (state: any, payload: string) => { },
        name2: (state: any, p: number) => { }
    },
    actions: {
        ac: (n: { state: any, commit: any }, payload: string) => Promise.resolve(payload)
    }
    , getters: {
        get: (state) => 2
    },
    modules: {
        mod: {
            getters: {
                nom: () => 32
            }
        }
    }
}// as StoreOptions<any>;
 
type Op = typeof storeOptions;
type UnpackMutations<State, Mutations extends MutationTree<State>> =
    <T extends keyof Mutations>
        (type: T,
        payload: Parameters<
            PropType<Mutations, T> extends (...args: any) => any ?
            PropType<Mutations, T>
            : (state: any, payload: any) => any>[1],
        options?: CommitOptions) => void;

type UnpackActions<State, Actions extends ActionTree<State, any>> =
    <T extends keyof Actions>
        (type: T,
        payload: Parameters<
            PropType<Actions, T> extends (...args: any) => any ?
            PropType<Actions, T>
            : (state: any, payload: any) => any>[1],
        options?: DispatchOptions) => ReturnType<PropType<Actions, T> extends (...args: any) => any ?
            PropType<Actions, T> : () => Promise<any>>;

type UnpackGetters<State, Getters extends GetterTree<State, any>> =
{
        readonly [T in keyof Getters]: ReturnType<PropType<Getters, T>>
}

type UnpackState<State, Modules extends ModuleTree<State>> = State & {
    [T in keyof Modules] : UnpackState<PropType<PropType<Modules, T>, "state">,
        NonNullable<PropType<PropType<Modules, T>, "modules">>
    >
}

export type UnpackStore<State, StoreOptionsImpl extends StoreOptions<State>> =  {
    
    readonly commit:
    UnpackMutations<State, NonNullable<PropType<StoreOptionsImpl, "mutations">>>,
    readonly dispatch:
    UnpackActions<State, NonNullable<PropType<StoreOptionsImpl, "actions">>>,
    readonly getters:
    UnpackGetters<State, NonNullable<PropType<StoreOptionsImpl, "getters">>>
    state: UnpackState<State, NonNullable<PropType<StoreOptionsImpl, "modules">>>
} 

export type Un<StoreOption>{
    state: PropType<StoreOption, "state">
}





//
var deapth: UnpackStore<string, Op>;
deapth.commit("")