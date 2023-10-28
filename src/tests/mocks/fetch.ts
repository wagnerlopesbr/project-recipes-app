import oneDrink from './oneDrinks';
import oneMeal from './oneMeal';

export const oneDrinkMock = {
  json: async () => oneDrink,
} as Response;

export const oneMealMock = {
  json: async () => oneMeal,
} as Response;
