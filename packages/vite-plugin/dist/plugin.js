// lib/plugin.ts
import fs from "fs-extra";
import { join } from "path";
import { packageDirectory } from "pkg-dir";
var pluginName = "vite-plugin-forvmsc";
async function copyDir(sourceDir, targetDir, options = {}) {
  const { ensureDir, readdir, stat, pathExists, copyFile } = fs;
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
      const pkgDir = await packageDirectory() || __dirname;
      const sourceDir = join(pkgDir, "node_modules/vue-markdown-shiki/public");
      const targetDir = join(pkgDir, options.distDir || "public");
      await copyDir(sourceDir, targetDir, options);
      console.log(`[${pluginName}] Copied files from ${sourceDir} to ${targetDir}`);
    }
  };
}
export {
  copyPublicPlugin
};
