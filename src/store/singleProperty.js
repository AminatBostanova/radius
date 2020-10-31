import axios from 'axios'

//----------- action types ------------//
export const GET_PROPERTY = 'GET_PROPERTY'

//----------- action creators -----------//
export const gotProperty = property => {
  return {
    type: GET_PROPERTY,
    property: property
  }
}

//---------- thunk creators ----------//
export const fetchProperty = (propertyId) => {
  return async dispatch => {
    try {
      // eslint-disable-next-line
      const singlePropertyRes = await axios({
        method: "GET",
        url: `https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${propertyId}`,
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "realtor.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_REALTOR_API_KEY,
          useQueryString: true,
        }})
        .then((singlePropertyRes) => {
          // console.log(singlePropertyRes.data.properties[0]);
          dispatch(gotProperty(singlePropertyRes.data.properties[0]))
        })
    } catch (err) {
      console.log(err)
    }
  }
}

//----------- initial state ----------//
const property = {}

//---------- reducer ----------//

export default function singlePropertyReducer(state = property, action) {
  switch (action.type) {
    case GET_PROPERTY:
      return action.property
    default:
      return state
  }
}
