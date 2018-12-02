import gigService from '../service/gigService.js'
// import gigService from '../service/gigDemoService.js'
export default {
    state: {
        gigs: null,
        currGig: null,
        isLoading: false,
    },
    getters: {
        gigs(state) {
            if (!state.gigs) return []
            return state.gigs
        },
        isLoading(state) {
            return state.isLoading
        },
        loggedUser(state, getters) {
            return getters.user
        }
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs
        },
        updateGig(state, { gig }) {
            var gigIdx = state.gigs.findIndex(currGig => currGig.id === gig.id)
            state.gigs.splice(gigIdx,1, gig)
        },
        toggleLoading(state, payload) {
            state.isLoading = !state.isLoading
        }
    },
    actions: {
        getGigs(context, { category }) {
            // context.commit({ type: 'toggleLoading' })
            gigService.query(category)
                .then(gigs => {
                    context.commit({ type: 'setGigs', gigs })
                    // context.commit({ type: 'toggleLoading' })
                })
        },
        getGigById(context, { gigId }) {
            // context.commit({ type: 'toggleLoading' })
            return gigService.getById(gigId)
                .then(gig => {
                    // context.commit({ type: 'toggleLoading' })
                    return gig
                })
        },
        removeGig(context, {gigId}) {
            return gigService.remove(gigId)
        },
        updateGig(context, {gig, userGigsListToUpdate}) {
            // context.commit({ type: 'toggleLoading' })
            return gigService.update(gig)
            // .then(gig => context.commit({type: 'updateGig'}, gig))
                .then(gig => {
                    // context.commit({ type: 'toggleLoading' })
                    console.log('returned data from server:', gig, 'update:', userGigsListToUpdate)
                    userGigsListToUpdate.push(gig._id)
                    console.log('this user is logged',context.getters.loggedUser)
                    context.dispatch({type: 'updateUser', user: context.getters.loggedUser},)
                    return context.dispatch({type: 'getGigs'}, gig)
                })
        }
    },
}