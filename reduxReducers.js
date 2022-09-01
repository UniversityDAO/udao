import { combineReducers } from "redux";

const alchemyProvider = (state = null, action) => {
    switch (action.type) {
        case "ALCHEMYPROVIDER":
            return action.provider
        default:
            return state
    }
}

const metamaskProvider = (state = null, action) => {
    switch (action.type) {
        case "METAMASKPROVIDER":
            return action.provider
        default:
            return state
    }
}

const network = (state = null, action) => {
    switch (action.type) {
        case "NETWORK":
            return action.provider
        default:
            return state
    }
}

const account = (state = [], action) => {
    switch (action.type) {
        case "ACCOUNT":
            return action.payload
        default:
            return state
    }
}

const activeGrants = (state = [], action) => {
  switch (action.type) {
    case "LOAD_ACTIVE_GRANTS":
        return action.payload
    default:
      return state
  }
}

const activeProposals = (state = [], action) => {
    switch (action.type) {
        case "LOAD_ACTIVE_PROPOSALS":
            return action.payload
        default:
          return state
      }
}

const inactiveGrants = (state = [], action) => {
    switch (action.type) {
        case "LOAD_INACTIVE_GRANTS":
            return action.payload
        default:
          return state
      }
}

const inactiveProposals = (state = [], action) => {
    switch (action.type) {
        case "LOAD_INACTIVE_PROPOSALS":
            return action.payload
        default:
          return state
      }
}

const isLoading = (state = true, action) => {
    switch (action.type) {
        case "SET_LOAD":
            return action.loading
        default:
            return state
    }
}

const selectedProposal = (state = "None", action) => {
    switch (action.type) {
        case "SET_PROPOSAL":
            return action.data
        default:
            return state
    }
}

const currentProposalMetadata = (state = null, action) => {
    switch (action.type) {
        case "SET_CURRENT_METADATA":
            return action.data
        default:
            return state
    }
}

const currentProposalTitle = (state = "", action) => {
    switch (action.type) {
        case "SET_CURRENT_TITLE":
            return action.data
        default:
            return state
    }
}

const allReducers = combineReducers({
    activeGrants, activeProposals, inactiveGrants, 
    inactiveProposals, alchemyProvider, metamaskProvider, 
    isLoading, selectedProposal, network, account,
    currentProposalMetadata, currentProposalTitle
})


export default allReducers;