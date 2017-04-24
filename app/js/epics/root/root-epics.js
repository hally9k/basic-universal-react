import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';
import { ENDPOINTS } from '../../../../config/api';
import { Observable } from 'rxjs/Observable';
import ping from './ping/ping-epics';
import {
    GET_GITHUB_USER,
    GET_GITHUB_USER_FAILURE,
    GET_GITHUB_USER_SUCCESS,
    GET_PAGE_DATA,
    GET_PAGE_DATA_FAILURE,
    GET_PAGE_DATA_SUCCESS
} from '../../actions/root/root-actions';


const root = (action$) =>
      action$.ofType(GET_GITHUB_USER)
      .mergeMap((action) =>
         ajax
            .getJSON(`https://api.github.com/users/${action.payload}`)
            .map((response) => {
                return {
                    type: GET_GITHUB_USER_SUCCESS,
                    payload: response
                };
            })
            .catch((error) => Observable.of({
                type: GET_GITHUB_USER_FAILURE,
                payload: error
            }))
       );

const page = (action$) =>
     action$.ofType(GET_PAGE_DATA)
        // TODO: use the action payload slug to request the correct page.
     .mergeMap((action) => // eslint-disable-line
        ajax
           .getJSON(ENDPOINTS.PAGES)
           .map((response) => {
               return {
                   type: GET_PAGE_DATA_SUCCESS,
                   payload: response
               };
           })
           .catch((error) => Observable.of({
               type: GET_PAGE_DATA_FAILURE,
               payload: error
           }))
      );

export default combineEpics(ping, combineEpics(page, root));
