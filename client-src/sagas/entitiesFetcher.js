/**
 * saga は、ユーザインターフェース API への非同期要求を管理する
 */
import { call, put } from 'redux-saga/effects'

import { receiveEntities } from '../actions'

export default function* entitiesFetcher(action) {

  let mruUrl = action.creds.instanceUrl + '/services/data/v54.0/ui-api/object-info'

  let req = {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + action.creds.accessToken,
      'X-Chatter-Entity-Encoding': false}
    }

  try {
    const response = yield call(fetch, mruUrl, req)
    const responseJson = yield response.json()
    yield put(receiveEntities(responseJson))
  } catch(err) {
    console.error('Describe sobjects error: ' + JSON.stringify(err))
  }
}
