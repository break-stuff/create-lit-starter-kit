const { red, green, yellow, underline, bold } = require('colorette');
const fs = require('fs');
const download = require("download-git-repo");

async function run() {
    const args = process.argv.slice(2);
    const projectName = args[0];

    try {
        validateProjectName(projectName, args);
        await createApp(projectName);
    } catch (error: any) {
        console.error(red(`\n${error.message}\n`));
        process.exit(1);
    }
}

async function createApp(projectName: string) {
    await download('break-stuff/lit-starter-kit', `${projectName}`, function (err: any) {
        if(err) {
            console.error(red(`There was an error downloading the repository: \n\n${err.message}`));
        }
    });

    logInstructions(projectName);
}

function validateProjectName(projectName: string, args: string[]) {
    if(args.length === 0) {
        throw new Error(`Please include a project name.`);
    }

    if(args.length > 1) {
        throw new Error(`Project name "${args.join(' ')}" is not valid and must be a kebab-case name without spaces.`);
    }

    if (!isValidateProjectName(projectName)) {
        throw new Error(`Project name "${projectName}" is not valid and must be a kebab-case name without spaces.`);
    }

    if (fs.existsSync(projectName)) {
        throw new Error(`Folder "./${projectName}" already exists, please choose a different project name.`);
    }
}

function isValidateProjectName(projectName: string) {
    return !/[^a-z0-9-]/.test(projectName);
}

function logInstructions(projectName: string) {
    console.log(`
${green('Lit Starter Kit successfully downloaded!')}

${underline(bold('Next steps:'))}
cd ${projectName}
npm install
npm run dev
    `);
}

run();