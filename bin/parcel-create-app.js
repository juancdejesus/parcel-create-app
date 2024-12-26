#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 [project-name] [options]")
    .positional("project-name", {
        describe: "Name of the project",
        type: "string",
    })
    .help()
    .alias("help", "h").argv;

// Handle Ctrl+C
process.on("SIGINT", () => {
    console.log(chalk.red("\nProcess interrupted by user. Exiting..."));
    process.exit(0);
});

// Utility to copy directories recursively
function copyDirectorySync(source, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    fs.readdirSync(source).forEach((file) => {
        const srcPath = path.join(source, file);
        const destPath = path.join(destination, file);
        if (fs.statSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDirectorySync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

async function init() {
    console.log(chalk.green("Welcome to React Parcel Starter!"));

    // Get the project name from the positional argument or fallback to the default
    const defaultProjectName = argv._[0] || path.basename(process.cwd());
    

    let answers;
    try {
        answers = await inquirer.prompt([
            {
                type: "input",
                name: "projectName",
                message: "What is your project name?",
                default: defaultProjectName,
                
                when: !argv._[0], // Skip this question if the project name is provided as an argument
            },
            {
                type: "confirm",
                name: "typescript",
                message: "Do you want to use TypeScript?",
                default: true
            },
            {
                type: "confirm",
                name: "tailwind",
                message: "Do you want to include Tailwind CSS?",
            },
            {
                type: "confirm",
                name: "reactRouter",
                message: "Do you want to include React Router?",
            },
            {
                type: "confirm",
                name: "antDesign",
                message: "Do you want to include Ant Design?",
            },
            {
                type: "confirm",
                name: "eslint",
                message: "Do you want to include ESLint?",
                default: true
            },
        ]);
    } catch (error) {
        console.log(chalk.red("\nPrompt cancelled by user. Exiting..."));
        process.exit(0);
    }

    const projectName = argv._[0] || answers.projectName;

    console.log(chalk.blue(`Creating project '${projectName}'...`));

    //const projectPath = path.resolve(projectName);
    const projectPath = argv._[0] || projectName != defaultProjectName ? path.resolve(projectName) : process.cwd();

    // Create project directory
    fs.mkdirSync(projectPath, { recursive: true });

    // Determine which template to use
    const templateType = answers.typescript ? "typescript" : "javascript";
    const templatePath = path.join(__dirname, "../templates", templateType, "src");
    const destinationPath = path.join(projectPath, "src");

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
    }

    console.log(chalk.blue(`Copying ${templateType} template...`));
    copyDirectorySync(templatePath, destinationPath);

    process.chdir(projectPath);

    const packageJson = {
        name: projectName,
        version: "1.0.0",
        private: true,
        scripts: {
            start: "parcel src/index.html",
            build: "parcel build src/index.html",
        },
    };

    fs.writeFileSync(
        "package.json",
        JSON.stringify(packageJson, null, 2),
        "utf-8"
    );

    console.log(chalk.green("package.json created."));
    console.log(chalk.blue("Installing React and Parcel..."));
    execSync("npm install react react-dom parcel@latest", { stdio: "inherit" });

    const additionalDependencies = [];
    const devDependencies = ["process@latest"];

    if (answers.typescript) {
        console.log(chalk.blue("Adding TypeScript..."));
        additionalDependencies.push("typescript@latest", "@types/react@latest", "@types/react-dom@latest");
    }

    if (answers.tailwind) {
        console.log(chalk.blue("Adding Tailwind CSS..."));
        additionalDependencies.push("tailwindcss@latest", "postcss@latest", "autoprefixer@latest");
        execSync("npx tailwindcss init", { stdio: "inherit" });
        fs.writeFileSync(
            "postcss.config.js",
            `
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
            `.trim()
        );
    }

    if (answers.reactRouter) {
        console.log(chalk.blue("Adding React Router..."));
        additionalDependencies.push("react-router-dom@latest");
        if (answers.typescript) {
            devDependencies.push("@types/react-router-dom@latest");
        }
    }

    if (answers.antDesign) {
        console.log(chalk.blue("Adding Ant Design..."));
        additionalDependencies.push("antd@latest");
    }

    if (answers.eslint) {
        console.log(chalk.blue("Adding ESLint..."));
        
        // Add core ESLint dependencies
        devDependencies.push("eslint@latest", "eslint-plugin-react@latest");
    
        const eslintConfig = {
            env: {
                browser: true,
                es2021: true,
            },
            extends: [
                "eslint:recommended",
                "plugin:react/recommended",
            ],
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            plugins: ["react"],
            rules: {
                "react/react-in-jsx-scope": "off", // Example rule adjustment
            },
        };
    
        if (answers.typescript) {
            console.log(chalk.blue("Configuring ESLint for TypeScript..."));
    
            // Add TypeScript-specific ESLint dependencies
            devDependencies.push(
                "@typescript-eslint/eslint-plugin@latest",
                "@typescript-eslint/parser@latest"
            );
    
            // Modify ESLint configuration for TypeScript
            eslintConfig.parser = "@typescript-eslint/parser";
            eslintConfig.extends.push(
                "plugin:@typescript-eslint/recommended"
            );
            eslintConfig.plugins.push("@typescript-eslint");
        }
    
        // Write the .eslintrc.json file
        fs.writeFileSync(
            path.join(projectPath, ".eslintrc.json"),
            JSON.stringify(eslintConfig, null, 2),
            "utf-8"
        );
        console.log(chalk.green(".eslintrc.json created with appropriate configurations."));
    }
    

    if (additionalDependencies.length > 0) {
        console.log(chalk.blue(`Installing additional dependencies: ${additionalDependencies.join(", ")}`));
        execSync(`npm install ${additionalDependencies.join(" ")}`, { stdio: "inherit" });
    }

    if (devDependencies.length > 0) {
        console.log(chalk.blue(`Installing development dependencies: ${devDependencies.join(", ")}`));
        execSync(`npm install -D ${devDependencies.join(" ")}`, { stdio: "inherit" });
    }

    console.log(chalk.green(`Project '${projectName}' created successfully!`));
    console.log(chalk.blue("To get started:"));
    console.log(chalk.cyan(argv._[0] || projectName != defaultProjectName ? `cd ${projectName}`:""));
    console.log(chalk.cyan("npm start"));
}

init().catch((error) => {
    console.error(chalk.red("An error occurred:"), error);
});
