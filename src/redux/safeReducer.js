import * as actions from "./actionTypes.js";
let lastSafeId = 0;

let initialState = {
  safes: [],
};
export default function SafeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SAFE_CREATED:
      if (action.payload.safeId) {
        const afterUpdate = state.safes.map((safe) => {
          if (safe.id === action.payload.safeId) {
            return {
              ...safe,
              ...action.payload,
            };
          } else {
            return safe;
          }
        });
        return {
          ...state,
          safes: afterUpdate,
        };
      } else
        return {
          ...state,
          safes: [
            ...state.safes,
            {
              id: ++lastSafeId,
              safeName: action.payload.safeName,
              safeOwner: action.payload.safeOwner,
              safeType: action.payload.safeType,
              safeDescription: action.payload.safeDescription,
              secrets: [],
            },
          ],
        };
    case actions.SAFE_DELETED:
      return {
        safes: state.safes.filter((safe, index) => index !== action.payload),
      };

    case actions.SECRETS_DELETED:
      const afterUpdateSecret = state.safes.map((safe) => {
        if (safe.id === action.payload.safeId) {
          return {
            ...safe,
            secrets: safe.secrets.filter(
              (item) => item !== action.payload.secret
            ),
          };
        } else {
          return safe;
        }
      });
      console.log(afterUpdateSecret, "step3");
      return {
        ...state,
        safes: afterUpdateSecret,
      };

    case actions.SECRETS_CREATED:
      const afterUpdate = state.safes.map((safe) => {
        if (safe.id === action.payload.safeId) {
          return {
            ...safe,
            secrets: [...safe.secrets, action.payload.secret],
          };
        } else {
          return safe;
        }
      });
      console.log(afterUpdate, "step3");
      return {
        ...state,
        safes: afterUpdate,
      };
    case actions.SAFE_EDIT:
      if (action.payload)
        return {
          ...state,
          editSafes: true,
          editSafeData: state.safes.filter(
            (safe, index) => safe.id === action.payload
          ),
        };
      else return { ...state, editSafes: false, editSafeData: [] };
    default:
      return state;
  }
}
