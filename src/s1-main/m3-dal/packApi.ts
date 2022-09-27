import {instance} from './instance/instance';


export const packApi = {
    getPacks(params: PackSearchParamsType) {
        return instance.get<ResponseCardPacksType>(`/cards/pack`, {params})
    },
    createPack(name: string, isPrivate = false) {
        return instance.post(`cards/pack`, {
            cardsPack: {
                name,
                private: isPrivate
            }
        })
    },
    deletePack(packId: string) {
        return instance.delete(`/cards/pack/?id=${packId}`)
    },
    updatePack(_id: string, newName: string) {
        return instance.put(`/cards/pack`, {
            cardsPack: {
                _id,
                name: newName,
            }
        })
    },
}
//types
export type PackType = {
    cardsCount: number
    created: Date
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: Date
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type ResponseCardPacksType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type PackSearchParamsType = {
    page: number
    pageCount: number
    sortPacks: string
    packName: string
    user_id: string
    min: number
    max: number
}