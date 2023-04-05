const {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  GOTO_PAGE,
  ON_SEARCH,
  ORDER,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  FILTER_SELECTED_COUNTRIES,
  CREATE_ERROR
} = require("./actions.js");
const initialState = {
  countries: [],
  allCountries: [],
  visibleCountries: [],
  pages: 0,
  activePage: 1,
  activities:[],
  error:0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_ACTIVITY:
      if (action.payload !== "Rs") {
        return {
          ...state,
          countries:[...state.allCountries].filter(
            (p) => p.activities.filter(activity =>activity.name===action.payload).length>0
          ),
          visibleCountries:  [...state.allCountries].filter(
            (p) => p.activities.filter(activity =>activity.name===action.payload).length>0
          ).slice(0, 10),
          pages: Math.ceil(
            [...state.allCountries].filter(
              (p) => p.activities.filter(activity =>activity.name===action.payload).length>0
            ).length / 10
          ),
          activePage: 1,
          error:0
        };
      } else {
        return {
          ...state,
          countries: [...state.allCountries],
          visibleCountries: [...state.allCountries].slice(0, 10),
          pages: Math.ceil([...state.allCountries].length / 10),
          activePage: 1,
          error:0
        };
      }
    case FILTER_BY_CONTINENT:
      if (action.payload !== "Rs") {
        return {
          ...state,
          countries: [...state.allCountries].filter(
            (p) => p.continent === action.payload
          ),
          visibleCountries: [...state.allCountries]
            .filter((p) => p.continent === action.payload)
            .slice(0, 10),
          pages: Math.ceil(
            [...state.allCountries].filter(
              (p) => p.continent === action.payload
            ).length / 10
          ),
          activePage: 1,
          error:0
        };
      } else {
        return {
          ...state,
          countries: [...state.allCountries],
          visibleCountries: [...state.allCountries].slice(0, 10),
          pages: Math.ceil([...state.allCountries].length / 10),
          activePage: 1,
          error:0
        };
      }
    case ORDER:
      if (action.payload === "AA") {
        return {
          ...state,
          countries: [...state.countries].sort((p1, p2) =>
            p1.name > p2.name ? 1 : p1.name < p2.name ? -1 : 0
          ),
          allCountries: [...state.allCountries].sort((p1, p2) =>
            p1.name > p2.name ? 1 : p1.name < p2.name ? -1 : 0
          ),
          visibleCountries: [...state.countries]
            .sort((p1, p2) =>
              p1.name > p2.name ? 1 : p1.name < p2.name ? -1 : 0
            )
            .slice(0, 10),
          activePage: 1,
        };
      } else if (action.payload === "AD") {
        return {
          ...state,
          countries: [...state.countries].sort((p1, p2) =>
            p1.name < p2.name ? 1 : p1.name > p2.name ? -1 : 0
          ),
          allCountries: [...state.allCountries].sort((p1, p2) =>
            p1.name < p2.name ? 1 : p1.name > p2.name ? -1 : 0
          ),
          visibleCountries: [...state.countries]
            .sort((p1, p2) =>
              p1.name < p2.name ? 1 : p1.name > p2.name ? -1 : 0
            )
            .slice(0, 10),
          activePage: 1,
        };
      } else if (action.payload === "PA") {
        return {
          ...state,
          countries: [...state.countries].sort((p1, p2) =>
            p1.population > p2.population
              ? 1
              : p1.population < p2.population
              ? -1
              : 0
          ),
          allCountries: [...state.allCountries].sort((p1, p2) =>
            p1.population > p2.population
              ? 1
              : p1.population < p2.population
              ? -1
              : 0
          ),
          visibleCountries: [...state.countries]
            .sort((p1, p2) =>
              p1.population > p2.population
                ? 1
                : p1.population < p2.population
                ? -1
                : 0
            )
            .slice(0, 10),
          activePage: 1,
        };
      } else {
        return {
          ...state,
          countries: [...state.countries].sort((p1, p2) =>
            p1.population < p2.population
              ? 1
              : p1.population > p2.population
              ? -1
              : 0
          ),
          allCountries: [...state.allCountries].sort((p1, p2) =>
            p1.population < p2.population
              ? 1
              : p1.population > p2.population
              ? -1
              : 0
          ),
          visibleCountries: [...state.countries]
            .sort((p1, p2) =>
              p1.population < p2.population
                ? 1
                : p1.population > p2.population
                ? -1
                : 0
            )
            .slice(0, 10),
          ActivePage: 1,
        };
      }

    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
        visibleCountries: action.payload.slice(0, 10),
        pages: Math.ceil(action.payload.length / 10),
        activePage: 1,
        error:0
      };

      case GET_ACTIVITIES:
        return {
          ...state,
          activities:action.payload
        };

    case FILTER_SELECTED_COUNTRIES:
      console.log(
        state.countries.filter(
          (country) => !action.payload.includes(country.name)
        )
      );
      return {
        ...state,
        countries: state.countries.filter(
          (country) => !action.payload.includes(country.name)
        ),
      };
    case ON_SEARCH:
      return {
        ...state,
        countries: action.payload,
        visibleCountries: action.payload.slice(0, 10),
        pages: Math.ceil(action.payload.length / 10),
        activePage: 1,
        error:0
      };


        case CREATE_ERROR:
          return {
            ...state,
            error:1
          };

    case GOTO_PAGE:
      console.log(action.payload);
      return {
        ...state,
        visibleCountries: state.countries.slice(
          (action.payload - 1) * 10,
          action.payload * 10
        ),
        activePage: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
