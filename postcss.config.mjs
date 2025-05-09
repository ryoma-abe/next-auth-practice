// postcss.config.mjs

import tailwindcssAnimate from "tailwindcss-animate";
import tailwindTypography from "@tailwindcss/typography";
import tailwindcss from "@tailwindcss/postcss";

const config = {
  plugins: [tailwindcssAnimate, tailwindTypography, tailwindcss],
};

export default config;
