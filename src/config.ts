import { ImmutableObject } from 'seamless-immutable'

export interface Config {
    myLayers: string[],
    buttonFilters: string[],
    vertical: boolean,
    dataSourceIds: string[]
}

export type IMConfig = ImmutableObject<Config>
