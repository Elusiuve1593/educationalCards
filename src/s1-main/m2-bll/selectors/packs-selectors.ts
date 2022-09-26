import {AppRootStateType} from 's1-main/m2-bll/store';

export const getPacks = (state: AppRootStateType) => state.packs.packs.cardPacks

export const getMinCardsCount = (state: AppRootStateType) => state.packs.packs.minCardsCount
export const getMaxCardsCount = (state: AppRootStateType) => state.packs.packs.maxCardsCount

export const getCurrentMinCount = (state: AppRootStateType) => state.packs.searchParams.min
export const getCurrentMaxCount = (state: AppRootStateType) => state.packs.searchParams.max

export const getPacksForUserId = (state: AppRootStateType) => state.packs.searchParams.user_id
export const getPackName = (state: AppRootStateType) => state.packs.searchParams.packName
