#!/usr/bin/env node

// I aim to keep this script easy to understand and safe to run. If you don't think it's both of those things, please let me know.

// Modules below are built-in to Node.js. Avoiding additional 3rd-party dependencies to reduce risk of supply chain attacks.
const childProcessModule = require("child_process");
const fileSystemModule = require("fs/promises");
const readLineModule = require("readline");
const pathModule = require('path');

const MIN_NODE_VERSION = 14; // Minimum Node.js version required to run this script.

// If you don't trust this script or are having troubles with it, alternatively, you can `git clone` from the template repo below 
// and just edit the files manually. This script will do a few nice things beyond that, but it's quite easy to start from 
// the template repo clone.
const templateRepo = "https://github.com/erikh2000/decentapp-template";

// ANSI text-formatting codes for console output.
const ANSI_START_GREEN = "\x1b[32m";
const ANSI_START_RED = "\x1b[31m";
const ANSI_START_BOLD = "\x1b[1m";
const ANSI_RESET = "\x1b[0m";

// For exceptions thrown by this code that correspond to expected errors like failed input validation.
class ExpectedError extends Error { 
  constructor(message) {
    super(message);
    this.name = "ExpectedError";
  }
}

//
// Helper functions
//

function getNodeMajorVersion() {
  try {
    return parseInt(process.versions.node.split('.')[0]);
  } catch (error) {
    throw new Error(`Error parsing Node.js major version from ${process.versions.node}: ${error.message}.`);
  }
}

async function promptUserForInput(question, defaultValue = null) {
    const readline = readLineModule.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        const prompt = defaultValue ? `${question} [${defaultValue}]: ` : `${question}: `;
        readline.question(prompt, (answer) => {
            readline.close();
            answer =  answer.trim("" + answer);
            if (answer === "") answer = defaultValue.trim();
            resolve(answer);
        });
    });
}

function filenameContainsExtensions(filename, extensions) {
  const extension = filename.split('.').pop();
  return extensions.includes(extension);
}

async function replacePlaceholdersInFile(fullPath, replaceText, withText) {
  let content = await fileSystemModule.readFile(fullPath, 'utf-8');
  if (content.includes(replaceText)) {
    const replaceTextRegex = new RegExp(replaceText, 'g');
    content = content.replace(replaceTextRegex, withText);
    await fileSystemModule.writeFile(fullPath, content, 'utf-8');
    console.log(`  Updated: ${fullPath}`);
  }
}

async function replacePlaceholdersInDir(dir, extensions, replaceText, withText) {
  const files = await fileSystemModule.readdir(dir);
  for(let file of files) {
    const fullPath = pathModule.join(dir, file);
    let stats;
    try {
      stats = await fileSystemModule.stat(fullPath);
    } catch (error) {
      console.warn(`  Non-fatal ${ANSI_START_RED}error${ANSI_RESET} reading ${fullPath}: ${error.message}`);
      continue;
    }
    if (stats.isDirectory()) {
      await replacePlaceholdersInDir(fullPath, extensions, replaceText, withText);
    } else {
      if (!filenameContainsExtensions(file, extensions)) continue;
      await replacePlaceholdersInFile(fullPath, replaceText, withText);
    }
  }
}

function containsInvalidHtmlCharacters(text) { return text.includes("<") || text.includes(">"); }

function containsPathCharacters(text) { return text.includes("/") || text.includes("\\"); }

function separatorLine() { 
  const terminalWidth = process.stdout.columns || 80; 
  return "-".repeat(terminalWidth);
}

async function fileExists(path) {
  try {
    await fileSystemModule.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

function isYes(text) { return text.toLowerCase().startsWith("y"); }

async function readPackageJsonVersion() {
  try {
    const packageJsonPath = pathModule.join(__dirname, 'package.json');
    const packageJsonData = await fileSystemModule.readFile(packageJsonPath, 'utf8');
    const { version } = JSON.parse(packageJsonData);
    return version;
  } catch (error) {
    console.error('Error reading package.json: ', error.message);
    return null;
  }
}

//
// Main function executed by NPX after installing this package. 
// The template itself is not in this package, but rather it's cloned from a separate Git repo.
//

async function main() {
  if (getNodeMajorVersion() < MIN_NODE_VERSION) throw new ExpectedError(`This script requires Node.js version ${MIN_NODE_VERSION} or greater. ` + 
    `You are using version ${process.versions.node}.`);
  const packageVersion = await readPackageJsonVersion();
  if (!packageVersion) throw new ExpectedError(`I couldn't read the version of this package. It looks like maybe the package.json file is missing or corrupt.`);
  console.log(`Decent App Creator v${packageVersion}`);

  // The security below isn't airtight, because we can assume the user running the script doesn't want to exploit themselves. 
  // It's more about guarding against accidental mistakes or an attacker convincing the user to run a harmful command.
  console.log(separatorLine());
  console.log(`You and me are gonna make a new decent app! A few questions...`);
  const projectName = await promptUserForInput('Create project in a new subfolder named', process.argv[2] || "my-new-project");
  if (!projectName) throw new ExpectedError(`Project name is required.`);
  if (containsPathCharacters(projectName)) throw new ExpectedError(`Project name cannot contain path characters. ` + 
    `If you're trying to install to a specific location, change your working directory to the location where the ` + 
    `project will be installed before running.`); // Prevent user from accidentally installing to an unexpected place.
  if (await fileExists(projectName)) throw new ExpectedError(`Folder named ${projectName} already exists. ` + 
    `Please choose a different folder name or delete existing folder.`); // Prevent user from accidentally overwriting existing folder.
  const appDisplayName = await promptUserForInput('App display name shown on web pages', projectName);
  if (!appDisplayName) throw new ExpectedError(`App display name is required.`);
  if (containsInvalidHtmlCharacters(appDisplayName)) throw new ExpectedError(`App display name seems like it might contain an injection attack.` + 
    ` Consider using a different name, even if you replace it in the created project later.`);
  console.log(separatorLine());

  console.log(`Source from ${templateRepo} repository used for clone below.`);
  const cloneResult = childProcessModule.spawnSync("git", ["clone", templateRepo, projectName], { stdio: "inherit" });
  if (cloneResult.status !== 0) throw new ExpectedError("Failed to clone repository.");

  console.log(`Removing .git folders...`); // Because it's a brand new project with no ties to the past.
  await fileSystemModule.rm(`${projectName}/.git`, { recursive: true, force: true });

  console.log(`Replacing placeholder text in project files with your provided text...`);
  await replacePlaceholdersInFile(`${projectName}/package.json`, "decentapp-template", projectName);
  await replacePlaceholdersInFile(`${projectName}/README.md`, "Decent App", appDisplayName);
  await replacePlaceholdersInFile(`${projectName}/public/manifest.json`, "Decent App", appDisplayName);
  await replacePlaceholdersInDir(projectName, ["ts", "tsx", "html"], "Decent App", appDisplayName);

  console.log(`${ANSI_START_GREEN}${ANSI_START_BOLD}Success!${ANSI_RESET} Project created in ${projectName}.`);
  console.log(`\nTo build and run your new decent app:`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  npm run dev`);
}

main().catch((error) => {
  error.message = `${ANSI_START_RED}${ANSI_START_BOLD}Error:${ANSI_RESET} ${error.message}`;
  if (error instanceof ExpectedError) { // Message thrown by app code explicitly.
    console.error(error.message);
  } else { // Unexpected error.
    console.error(error); // With the ugly but helpful call stack.
  }
  process.exit(1);
});