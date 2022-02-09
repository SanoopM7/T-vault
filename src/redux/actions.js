import * as actions from "./actionTypes";
export function safeCreated(inputs) {
  return {
    type: actions.SAFE_CREATED,
    payload: inputs,
  };
}

export function safeDeleted(index) {
  return {
    type: actions.SAFE_DELETED,
    payload: index,
  };
}

export function safeEdit(index) {
  return {
    type: actions.SAFE_EDIT,
    payload: index,
  };
}
export function secretsCreated(data) {
  return {
    type: actions.SECRETS_CREATED,
    payload: data,
  };
}
export function secretsDeleted(data) {
  console.log(data, "secretsataction");
  return {
    type: actions.SECRETS_DELETED,
    payload: data,
  };
}
