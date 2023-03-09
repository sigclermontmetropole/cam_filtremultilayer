import { ImmutableObject } from 'seamless-immutable'

export interface Config {
    buttonFilters: string[],
    vertical: boolean
}

export type IMConfig = ImmutableObject<Config>
