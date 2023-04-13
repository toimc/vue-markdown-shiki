import type { Plugin } from 'vite'

import { ensureDir, readdir, stat, pathExists, copyFile } from 'fs-extra'
import { join } from 'path'

const pluginName = 'copy-public-plugin'

interface Options {
  distDir?: string
  overwrite?: boolean
}

// 递归复制源目录下所有文件到目标目录下
async function copyDir(sourceDir: string, targetDir: string, options: Options = {}) {
  await ensureDir(targetDir)

  const files = await readdir(sourceDir)

  for (const file of files) {
    const sourcePath = `${sourceDir}/${file}`
    const targetPath = `${targetDir}/${file}`

    const statFile = await stat(sourcePath)

    if (statFile.isDirectory()) {
      await copyDir(sourcePath, targetPath)
    } else {
      const targetFileExists = await pathExists(targetPath)
      if (!targetFileExists || options.overwrite) {
        await copyFile(sourcePath, targetPath)
      }
    }
  }
}

export function copyPublicPlugin(options: Options = {}): Plugin {
  return {
    name: pluginName,
    async buildStart() {
      const sourceDir = join(__dirname, 'node_modules/vue-md-shiki-component/public')
      const targetDir = join(__dirname, options.distDir || 'public')

      await copyDir(sourceDir, targetDir, options)

      console.log(`[${pluginName}] Copied files from ${sourceDir} to ${targetDir}`)
    }
  }
}
