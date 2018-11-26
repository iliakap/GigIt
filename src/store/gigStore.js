// import gigService from '../service/gigService.js'
import gigService from '../service/gigDemoService.js'
export default {
    state: {
        gigs: []
    },
    getters: {
        gigs(state) {
            return state.gigs
        }
    },
    mutations: {
        setGigs(state, {gigs}) {
            state.gigs = gigs
        }
    },
    actions: {
        getGigs(context) {
            gigService.query()
                .then(gigs => context.commit({type: 'setGigs', gigs}))
        }
    },
}