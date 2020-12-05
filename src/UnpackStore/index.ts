import { UnpackActions } from "../UnpackActions";
import { UnpackMutations } from "../UnpackMutations";
import { PropType } from "../Common";
import { UnpackGetters } from "../UnpackGetters";
import { UnpackState } from "../UnpackState";
import {Store, CommitOptions, DispatchOptions} from "vuex"
export type UnpackStore<StoreOptionsImpl> =
    Omit<Store<any>, "commit" | "dispatch" | "state" | "getters"> &
    {
        commit<T extends keyof UnpackMutations<"", StoreOptionsImpl>>
            (
                type: T,
                payload?: UnpackMutations<"", StoreOptionsImpl>[T],
                commitOptions?: CommitOptions): void
        dispatch<T extends keyof UnpackActions<"",StoreOptionsImpl>>
            (
                type: T,
                payload?: PropType<UnpackActions<"", StoreOptionsImpl>[T], "payload">,
                dispatchOptions?: DispatchOptions
            ): PropType<UnpackActions<"", StoreOptionsImpl>[T], "returnType">
        readonly getters: UnpackGetters<"",  StoreOptionsImpl>
        state: UnpackState<StoreOptionsImpl>
    }