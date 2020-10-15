import countries from './countries';
import states from './states';


export const getCountryByName = (searchName) => countries.find(({ name }) => name === searchName);

export const getStatesByCountryId = (id) => states.filter(({ country_id }) => id === country_id);