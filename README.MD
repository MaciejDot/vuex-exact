# vuex-exact

## Aim

The package is aiming for strongly typing vuex store for better development experience

## Install

```powershell
npm i vuex-exact
```

## Usage

```JavaScript
import Vue from 'vue'
import Vuex from 'vuex'
import { UnpackStore, ActionContext } from 'vuex-exact'

const options = {
    state: {
        example: 0
    },
    mutations:{
        mute: (state: any, payload: string) => {}
    }
    /*store options*/
}

export default new Vuex.Store(options)

export type StoreOptions = typeof options
export type StoreState = typeof options.state
export type StoreType = UnpackStore<StoreState, StoreOptions> // Store Type 
export type MainActionsContext = ActionContext<StoreState, StoreOptions> // context of actions outside modules
```

getting module action context

```JavaScript
import Vue from 'vue'
import Vuex from 'vuex'
import { ActionContextModule } from 'vuex-exact'
import { StoreState, StoreOptions } from "" //main Store file location
const moduleOptions = {
    state: {
        example: 0
    },
    mutations:{
        mute: (state: any, payload: string) => {}
    }
}
export moduleOptions
export type ActionContext = ActionContextModule<typeof moduleOptions.state ,StoreState, typeof moduleOptions,StoreOptions>
```