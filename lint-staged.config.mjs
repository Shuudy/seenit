export default {
  "apps/frontend/**/*.{ts,tsx}": [
    "pnpm --filter frontend run lint",
    "pnpm --filter frontend run prettier:check",
  ],
  "apps/backend/**/*.php": ["php apps/backend/vendor/bin/pint --test"],
};
