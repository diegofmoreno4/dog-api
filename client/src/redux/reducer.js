import {
  CLEAN_DETAIL,
  GET_DOGS,
  GET_DOGS_DETAIL,
  FILTER_TEMPERAMENT,
  ORDER_NAME,
  ORDER_WEIGHT,
} from "./actions";

const initialState = {
  myFavorites: [],
  allDogs: [],
  originalDogs: [],
  dogDetail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        originalDogs: action.payload,
      };
    case GET_DOGS_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        dogDetail: {},
      };
    case FILTER_TEMPERAMENT:
      const selectedTemperament = action.payload;
      return {
        ...state,
        allDogs: state.originalDogs.filter((dog) => {
          if (selectedTemperament === "All") {
            return true;
          } else {
            return (
              dog.temperament && dog.temperament.includes(selectedTemperament)
            );
          }
        }),
      };
    case ORDER_NAME:
      const sortedDogs = [...state.allDogs].sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === "A" ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === "A" ? 1 : -1;
        }
        return 0;
      });

      return {
        ...state,
        allDogs: sortedDogs,
      };
    case ORDER_WEIGHT:
      const sortedDogsPeso = [...state.allDogs].sort((a, b) => {
        const weightA = parseInt(a.weight.imperial.split(" - ")[0]);
        const weightB = parseInt(b.weight.imperial.split(" - ")[0]);

        if (weightA < weightB) {
          return action.payload === "A" ? -1 : 1;
        }
        if (weightA > weightB) {
          return action.payload === "A" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        allDogs: sortedDogsPeso,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
