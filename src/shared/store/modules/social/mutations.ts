import {MutationTree} from 'vuex'
import {SocialState} from './types'

export const mutations: MutationTree<SocialState> = {
    RESET(state) {
        state.instagramPictures = []
    },
    SET_INSTAGRAM_PICTURES(state, data) {
        state.instagramPictures = data
    },
}
