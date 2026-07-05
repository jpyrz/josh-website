import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".jsx"],
          alias: {
            "@": path.resolve(__dirname, "src"),
            "next/image": path.resolve(__dirname, "cypress/support/next-image.tsx"),
            "next/link": path.resolve(__dirname, "cypress/support/next-link.tsx"),
            "next/navigation": path.resolve(__dirname, "cypress/support/next-navigation.ts"),
          },
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,
                  compilerOptions: {
                    noEmit: false,
                  },
                },
              },
            },
            {
              test: /\.module\.scss$/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    esModule: false,
                    modules: {
                      localIdentName: "[name]__[local]",
                    },
                  },
                },
                "sass-loader",
              ],
            },
          ],
        },
      },
    },
    specPattern: "src/components/**/*.cy.tsx",
    supportFile: "cypress/support/component.ts",
  },
});
