
import axios from "axios";

export const Actions = {
   FETCH_KEYWORDS_BEGIN: 'FETCH_KEYWORDS_BEGIN',
   FETCH_KEYWORDS_SUCCESS: 'FETCH_KEYWORDS_SUCCESS',
   FETCH_KEYWORDS_FAILURE: 'FETCH_KEYWORDS_FAILURE'
}

export const fetchKeywordsBegin = () => ({
   type: Actions.FETCH_KEYWORDS_BEGIN
});

export const fetchKeywordsSuccess = (keywords) => ({
   type: Actions.FETCH_KEYWORDS_SUCCESS,
   payload: { keywords }
})

export const fetchKeywordsFailure = (error) => ({
   type: Actions.FETCH_KEYWORDS_FAILURE,
   payload: { error }
})

export function fetchKeywords() {
   let keywords = [];
   return dispatch => {
      dispatch(fetchKeywordsBegin());
      return axios.get('/api/v1/keywords/?format=json')
         .then(response => {
            response.data.map(keyword => {
               keywords[keyword.id] = keyword;
               return keyword;
            });
            dispatch(fetchKeywordsSuccess(keywords));
         })
         .catch(error => dispatch(fetchKeywordsFailure(error))
      );
   }
}