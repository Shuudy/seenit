export default {
  "frontend/**/*.{ts,tsx}": [
    "npm --prefix frontend run lint",
    "npm --prefix frontend run prettier:check",
  ],
  "backend/**/*.php": ["php backend/vendor/bin/pint --test"],
};
