import axios from "axios";
//require("dotenv").config();
//const { API_KEY } = process.env;
export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_DETAIL = "GET_DOGS_DETAIL";
export const ADD_DOGS = "ADD_DOGS";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_WEIGHT = "ORDER_WEIGHT";

//Necesita hacer la petición al servidor
export const getDogs = () => {
  const endpoint = "http://localhost:3001/dogs";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_DOGS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDogsDetail = (id) => {
  const endpoint = `http://localhost:3001/dogs/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_DOGS_DETAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
  };
};

export const filterTemperament = (temperament) => {
  return {
    type: FILTER_TEMPERAMENT,
    payload: temperament,
  };
};

export const orderName = (name) => {
  return {
    type: ORDER_NAME,
    payload: name,
  };
};

export const orderWeight = (weight) => {
    return {
      type: ORDER_WEIGHT,
      payload: weight,
    };
  };
