import next from "eslint-config-next";

/** Flat config - eslint-config-next ships a native flat array in Next 15.3+. */
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    // Advisory React-19 / compiler rules. Our effect-driven theme + scroll-reveal
    // patterns intentionally sync from the DOM after mount (avoids hydration
    // mismatches), so keep these as warnings rather than hard errors.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
    },
  },
];

export default eslintConfig;
