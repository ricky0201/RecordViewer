import { call, put } from 'redux-saga/effects'

import { receivePicklists } from '../actions'

export default function* picklistsFetcher (action) {

  let url = action.creds.instanceUrl + '/services/data/v54.0/ui-api/object-info/' + action.apiName + '/picklist-values/' + action.recordType + '/';
  let req = {
    method: 'GET',

    headers: {
      'Authorization' : 'Bearer ' + action.creds.accessToken,
      // 返される JSON 内の特殊文字が HTML エスケープ処理されない
      'X-Chatter-Entity-Encoding': false}
  };

  try {
    const response = yield call(fetch, url, req)
    const responseJson = yield response.json()
    yield put(receivePicklists(url, responseJson))
  } catch(err) {
    console.error('Error in fetching picklist values collection: ' + JSON.stringify(err))
  }
}