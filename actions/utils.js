export const getNextId = (field, state) => {
  let fieldState = state.get(field)

  return fieldState
    ? parseInt(Object.keys(fieldState.toJS()).sort((a, b) => b > a)[0], 10) + 1
    : 1
}

export const getRecordListValues = (field, id, record, nextValue, state) => {
  let hasRecord = state.getIn([field, id.toString()]).has(record)

  if (hasRecord) {
    let values = state.getIn([field, id.toString(), record]).push(nextValue)
    return values.toJS()
  } else {
    return [nextValue]
  }
}
