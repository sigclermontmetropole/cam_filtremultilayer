import { ImmutableObject } from 'seamless-immutable'

export interface Config {
    buttonFilters: string[],
    vertical: boolean,
    dsJsons: string[]
}

export type IMConfig = ImmutableObject<Config>
