export const setAlchemyProvider = (data) => {
    return {
        type: "ALCHEMYPROVIDER",
        provider: data
    }
}

export const setMetamaskProvider = (data) => {
    return {
        type: "METAMASKPROVIDER",
        provider: data
    }
}

export const setActiveProposals = (data) => {
    return {
        type: "LOAD_ACTIVE_PROPOSALS",
        payload: data
    }
}

export const setInactiveProposals = (data) => {
    return {
        type: "LOAD_INACTIVE_PROPOSALS",
        payload: data
    }
}

export const setActiveGrants = (data) => {
    return {
        type: "LOAD_ACTIVE_GRANTS",
        payload: data
    }
}

export const setInactiveGrants = (data) => {
    return {
        type: "LOAD_INACTIVE_GRANTS",
        payload: data
    }
}

export const setLoading = (data) => {
    return {
        type: "SET_LOAD",
        loading: data
    }
}
