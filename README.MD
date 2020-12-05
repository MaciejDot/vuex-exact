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
import { UnpackStore } from 'vuex-exact'

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

export type StoreType = UnpackStore<StoreOptions>
```