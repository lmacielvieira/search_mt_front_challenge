var fs = require("fs");
var basePath = "src";
var componentPath = "components";
var pagePath = "pages";
var settingsPath = "settings";
var defaultLang = "en-us";
var argv = require("minimist")(process.argv.slice(2));
var settingsImport = "export * from './${componentName}'\n";
var settingsFile =
  "export const ${componentName} = {\n" +
  '    title: "${componentName}"\n' +
  "}\n";
var scriptFile =
  "import React           from 'react'\n" +
  "import t               from 'typy';\n" +
  "import { connect }     from 'react-redux';\n" +
  "import PropTypes       from 'prop-types';\n" +
  "import './style.less'\n\n\n" +
  "class ${componentName} extends React.Component {\n\n" +
  '_componentName = "${cssName}-component";\n' +
  "   // -------------------------------------------------------------------------//\n" +
  "   // Component Lifecycle\n" +
  "   // -------------------------------------------------------------------------//\n" +
  "\n" +
  "    constructor(props) {\n" +
  "        super(props)\n" +
  "\n" +
  "        this.state = {\n" +
  "        }\n" +
  "\n" +
  "    }\n" +
  "\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "    // Requests\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "    // Event Handlers\n" +
  "    // -------------------------------------------------------------------------//" +
  "\n\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "    // Other Functions\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "    // Render\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "\n" +
  "    render(){\n" +
  "        return(\n" +
  "            <div className={this._componentName}>\n" +
  "               <span>\n" +
  "                   ${componentName} \n" +
  "               </span>\n" +
  "            </div>\n" +
  ")\n" +
  "   }\n" +
  "}\n\n" +
  "\n" +
  "${componentName}.propTypes = {\n" +
  "}\n" +
  "\n" +
  "${componentName}.defaultProps = {\n" +
  "}\n" +
  "\n";

var pageFile =
  "import React           from 'react'\n" +
  "import t               from 'typy';\n" +
  "import { connect }     from 'react-redux';\n" +
  "import PropTypes       from 'prop-types';\n" +
  "import './style.less'\n\n\n" +
  "class ${componentName} extends React.Component {\n\n" +
  '_pageName = "${cssName}-page";\n' +
  "   // -------------------------------------------------------------------------//\n" +
  "   // Component Lifecycle\n" +
  "   // -------------------------------------------------------------------------//\n" +
  "\n" +
  "    constructor(props) {\n" +
  "        super(props)\n" +
  "\n" +
  "        this.state = {\n" +
  "        }\n" +
  "\n" +
  "    }\n" +
  "\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "    // Requests\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "    // Event Handlers\n" +
  "    // -------------------------------------------------------------------------//" +
  "\n\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "    // Other Functions\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "    // Render\n" +
  "    // -------------------------------------------------------------------------//\n" +
  "\n" +
  "    render(){\n" +
  "        return(\n" +
  "            <div className={this._pageName}>\n" +
  "               <span>\n" +
  "                   ${componentName} \n" +
  "               </span>\n" +
  "            </div>\n" +
  ")\n" +
  "   }\n" +
  "}\n\n" +
  "\n" +
  "${componentName}.propTypes = {\n" +
  "}\n" +
  "\n" +
  "${componentName}.defaultProps = {\n" +
  "}\n" +
  "\n" +
  "const mapStateToProps = state => ({\n" +
  "    state: state\n" +
  "})\n" +
  "\n" +
  "function mapDispatchToProps(dispatch) {\n" +
  "    return {  dispatch };\n" +
  "}\n" +
  "\n" +
  "export default connect(\n" +
  "    mapStateToProps,\n" +
  "    mapDispatchToProps\n" +
  ")(${componentName})\n";

var styleFile =
  '@import (reference) "../../styles/globalStyle";\n' +
  '@componentName: ~"${cssName}-component";\n' +
  "\n" +
  ".@{componentName} {\n" +
  "   user-select     : none;\n" +
  "   min-height      : 100px;\n" +
  "   min-width       : 100px;\n" +
  "   background-color: white;\n" +
  "}\n";

var pageStyleFile =
  '@import (reference) "../../styles/globalStyle";\n' +
  '@pageName: ~"${cssName}-page";\n' +
  "\n" +
  ".@{pageName} {\n" +
  "   user-select     : none;\n" +
  "   min-height      : 100vh;\n" +
  "   width           : 100%;\n" +
  "   background-color: white;\n" +
  "}\n";

function createFolder(path) {
  let paths = path.split("/");

  for (let i = 0; i < paths.length; i++) {
    let buildPath = "";

    for (let j = 0; j < i + 1; j++) {
      buildPath += paths[j] + (j === i ? "" : "/");
    }

    if (!fs.existsSync(buildPath)) {
      console.log(`Creating folder ${buildPath}...`);
      fs.mkdirSync(buildPath);
      console.log(`Folder ${buildPath} created!`);
    }
  }
}

function appendToFile(path, data, name) {
  if (fs.existsSync(path)) {
    console.log(`Appending to ${path}...`);
    if (typeof data === "string") {
      data = data.replace(/\${componentName}/g, name);
    }
    fs.appendFileSync(path, data);
    console.log(`Appended`);
  } else {
    console.log(`${path} not found...`);
  }
}

function createScriptFile(path, name, originalName) {
  console.log(`Creating script file ${path}...`);

  if (typeof scriptFile === "string") {
    scriptFile = scriptFile.replace(/\${componentName}/g, name);
  }

  if (typeof scriptFile === "string") {
    scriptFile = scriptFile.replace(/\${originalName}/g, originalName);
  }

  if (typeof scriptFile === "string") {
    scriptFile = scriptFile.replace(
      /\${cssName}/g,
      originalName
        .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
          return "-" + y.toLowerCase();
        })
        .replace(/^-/, "")
    );
  }

  fs.writeFile(path, scriptFile, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

function createPageFile(path, name, originalName) {
  console.log(`Creating script file ${path}...`);

  if (typeof pageFile === "string") {
    pageFile = pageFile.replace(/\${componentName}/g, name);
  }

  if (typeof pageFile === "string") {
    pageFile = pageFile.replace(/\${originalName}/g, originalName);
  }

  if (typeof pageFile === "string") {
    pageFile = pageFile.replace(
      /\${cssName}/g,
      originalName
        .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
          return "-" + y.toLowerCase();
        })
        .replace(/^-/, "")
    );
  }

  fs.writeFile(path, pageFile, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}
function createSettingFile(path, name) {
  console.log(`Creating setting file ${path}...`);

  if (typeof settingsFile === "string") {
    settingsFile = settingsFile.replace(/\${componentName}/g, name);
  }

  fs.writeFile(path, settingsFile, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

function createStyleFile(path, name, originalName) {
  console.log(`Creating style file ${path}...`);

  if (typeof styleFile === "string") {
    styleFile = styleFile.replace(/\${componentName}/g, name);
  }
  if (typeof styleFile === "string") {
    styleFile = styleFile.replace(/\${originalName}/g, originalName);
  }

  if (typeof styleFile === "string") {
    styleFile = styleFile.replace(
      /\${cssName}/g,
      originalName
        .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
          return "-" + y.toLowerCase();
        })
        .replace(/^-/, "")
    );
  }

  fs.writeFile(path, styleFile, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

function createPageStyleFile(path, name, originalName) {
  console.log(`Creating style file ${path}...`);

  if (typeof pageStyleFile === "string") {
    pageStyleFile = pageStyleFile.replace(/\${componentName}/g, name);
  }

  if (typeof pageStyleFile === "string") {
    pageStyleFile = pageStyleFile.replace(/\${originalName}/g, originalName);
  }

  if (typeof pageStyleFile === "string") {
    pageStyleFile = pageStyleFile.replace(
      /\${cssName}/g,
      originalName
        .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
          return "-" + y.toLowerCase();
        })
        .replace(/^-/, "")
    );
  }

  fs.writeFile(path, pageStyleFile, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

let name = argv.name;

// set filename
// if(typeof argv.name === 'string'){
//     name        = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
// }
let originalName = argv.name;

if (argv.createComponent === true && typeof argv.name === "string") {
  name += "Component";

  // create file and dependencies
  createFolder(`${basePath}/${componentPath}/${name}`);
  createFolder(
    `${basePath}/${settingsPath}/${defaultLang}/${componentPath}/${name}`
  );

  //  create files
  createSettingFile(
    `${basePath}/${settingsPath}/${defaultLang}/${componentPath}/${name}/index.js`,
    name
  );
  appendToFile(
    `${basePath}/${settingsPath}/${defaultLang}/${componentPath}/index.js`,
    settingsImport,
    name
  );
  createScriptFile(
    `${basePath}/${componentPath}/${name}/index.js`,
    name,
    originalName
  );
  createStyleFile(
    `${basePath}/${componentPath}/${name}/style.less`,
    name,
    originalName
  );
} else if (argv.createPage === true && typeof argv.name === "string") {
  name += "Page";

  // create file and dependencies
  createFolder(`${basePath}/${pagePath}/${name}`);
  createFolder(
    `${basePath}/${settingsPath}/${defaultLang}/${pagePath}/${name}`
  );

  //  create files
  createSettingFile(
    `${basePath}/${settingsPath}/${defaultLang}/${pagePath}/${name}/index.js`,
    name
  );
  appendToFile(
    `${basePath}/${settingsPath}/${defaultLang}/${pagePath}/index.js`,
    settingsImport,
    name
  );
  createPageFile(
    `${basePath}/${pagePath}/${name}/index.js`,
    name,
    originalName
  );
  createPageStyleFile(
    `${basePath}/${pagePath}/${name}/style.less`,
    name,
    originalName
  );
}

console.dir(argv);
