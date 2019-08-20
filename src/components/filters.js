import {
  getFilters
} from "./../data.js";


const getChecked = (title) => {
  return title === `All` ? `checked` : ``;
};
const getDisabled = (count) => {
  return count === 0 ? `disabled` : ``;
};

const getFilterTemplate = ({title, count}) =>
  `<input
  type="radio"
  id="filter__${title.toLowerCase()}"
  class="filter__input visually-hidden"
  name="filter"
  ${getChecked(title)}
  ${getDisabled(count)}
/>
<label for="filter__${title.toLowerCase()}" class="filter__label">
  ${title} <span class="filter__${title.toLowerCase()}-count">${count}</span></label
>
`;

export const getFiltersContainer = (cards) => `<section class="main__filter filter container">
${getFiltersTemplate(cards)}
</section>`;


export const getFiltersTemplate = (cards) => {
  return getFilters(cards).map(getFilterTemplate).join(``);
};
