
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
npm install -g parcel-create-app
```

---

## Usage

Run the CLI tool to create a new React project:

```bash
parcel-create-app [project-name]
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

### Create a project

```bash
parcel-create-app my-js-app
```

- Follow the prompts to configure the project.

---

## Development

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/juancdejesus/parcel-create-app.git
   cd parcel-create-app
   ```

2. Link the package locally:
   ```bash
   npm link
   ```

3. Run the CLI tool:
   ```bash
   parcel-create-app <project-name>
   ```

---


## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
