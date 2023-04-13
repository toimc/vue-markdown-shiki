"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  copyPublicPlugin: () => copyPublicPlugin
});
module.exports = __toCommonJS(plugin_exports);
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_path = require("path");
var import_pkg_dir = require("pkg-dir");
var pluginName = "vite-plugin-vmsc";
async function copyDir(sourceDir, targetDir, options = {}) {
  const { ensureDir, readdir, stat, pathExists, copyFile } = import_fs_extra.default;
  await ensureDir(targetDir);
  const files = await readdir(sourceDir);
  for (const file of files) {
    const sourcePath = `${sourceDir}/${file}`;
    const targetPath = `${targetDir}/${file}`;
    const statFile = await stat(sourcePath);
    if (statFile.isDirectory()) {
      await copyDir(sourcePath, targetPath);
    } else {
      const targetFileExists = await pathExists(targetPath);
      if (!targetFileExists || options.overwrite) {
        await copyFile(sourcePath, targetPath);
      }
    }
  }
}
function copyPublicPlugin(options = {}) {
  return {
    name: pluginName,
    async buildStart() {
      const pkgDir = await (0, import_pkg_dir.packageDirectory)() || __dirname;
      const sourceDir = (0, import_path.join)(pkgDir, "node_modules/vue-md-shiki-components/public");
      const targetDir = (0, import_path.join)(pkgDir, options.distDir || "public");
      await copyDir(sourceDir, targetDir, options);
      console.log(`[${pluginName}] Copied files from ${sourceDir} to ${targetDir}`);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copyPublicPlugin
});
