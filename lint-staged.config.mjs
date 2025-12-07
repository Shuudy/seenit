export default {
  "frontend/**/*.{ts,tsx}": ["npm --prefix frontend run lint"],
  "backend/**/*.php": ["php backend/vendor/bin/pint --test"],
};
