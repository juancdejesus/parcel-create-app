
# Create React Parcel

A CLI tool to quickly create a React application using Parcel with options for TypeScript, Tailwind CSS, React Router, and Ant Design.

---

## Features

- Supports both JavaScript and TypeScript templates.
- Quickly integrates popular libraries like Tailwind CSS, React Router, and Ant Design.
- Built-in Parcel bundler configuration.
- Fully customizable templates.

---

## Installation

Install globally using NPM:

```bash
npm install -g create-parcel-app
```

---

## Usage

Run the CLI tool to create a new React project:

```bash
create-parcel-app [project-name]
```

If no project name is provided, the CLI will prompt you to enter one.

---

## Options

The CLI offers the following interactive prompts:

1. **Project Name**:
   - Provide the name of the project directory.
   - Defaults to the current directory name if not specified.

2. **Use TypeScript**:
   - Choose between JavaScript or TypeScript for your project.

3. **Include Tailwind CSS**:
   - Optionally add Tailwind CSS for styling.

4. **Include React Router**:
   - Optionally add React Router for routing.

5. **Include Ant Design**:
   - Optionally add Ant Design for UI components.

---

## Examples

### Create a JavaScript Project

```bash
create-parcel-app my-js-app
```

- Follow the prompts to configure the project.

### Create a TypeScript Project

```bash
create-parcel-app my-ts-app
```

- Select **Yes** when prompted to use TypeScript.

### Include Tailwind CSS and React Router

```bash
create-parcel-app my-styled-app
```

- Select **Yes** for Tailwind CSS and React Router during the prompts.

### Quick Start Without Prompts

To skip prompts, pass the project name directly:
```bash
create-parcel-app my-quick-app
```

---

## Development

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/juancdejesus/create-parcel-app.git
   cd create-parcel-app
   ```

2. Link the package locally:
   ```bash
   npm link
   ```

3. Run the CLI tool:
   ```bash
   create-parcel-app <project-name>
   ```

---

### Publishing to NPM

1. Update the version in `package.json`:
   ```bash
   npm version <major|minor|patch>
   ```

2. Publish the package:
   ```bash
   npm publish
   ```

3. Verify on NPM:
   - Visit [https://www.npmjs.com/](https://www.npmjs.com/) and search for your package.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
