const fs = require('fs')
const path = require('path')

const cssVariableRegex = /--\S+(?=\b)/g // 匹配CSS变量名的正则表达式
const outputFile = 'output.txt' // 输出文件名
const varsFile = 'vars.css' // vars文件名

// 遍历目录并返回所有CSS文件的路径
const walkSync = (dir, whiteList = [], filelist = []) => {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const fileStat = fs.statSync(filePath)

    if (fileStat.isDirectory()) {
      filelist = walkSync(filePath, whiteList, filelist)
    } else if (fileStat.isFile() && /\.css$/i.test(file) && !whiteList.includes(file)) {
      filelist.push(filePath)
    }
  })

  return filelist
}

// 读取CSS文件并匹配CSS变量名
const readCssFiles = () => {
  const whiteList = ['vars.css'] // 白名单列表
  const cssFiles = walkSync(__dirname, whiteList)
  let cssVariables = []

  cssFiles.forEach((cssFile) => {
    const cssContent = fs.readFileSync(cssFile, 'utf8')

    // 使用正则表达式匹配CSS变量名，并将其存储到数组中
    cssContent.match(cssVariableRegex)?.forEach((cssVariable) => {
      cssVariables.push(cssVariable)
    })
  })

  return cssVariables
}

// 将CSS变量名写入输出文件中
const writeCssVariablesToFile = (cssVariables) => {
  const outputFilePath = path.join(__dirname, outputFile)

  // 使用Set对象去重
  const uniqueCssVariables = [...new Set(cssVariables)]

  const outputContent = uniqueCssVariables.join('\n')

  fs.writeFileSync(outputFilePath, outputContent, 'utf8')
}

// 读取vars文件并过滤CSS变量
// 读取vars文件并过滤CSS变量
const filterVarsFile = (cssVariables) => {
  const varsFilePath = path.join(__dirname, varsFile)
  const varsContent = fs.readFileSync(varsFilePath, 'utf8')
  const varsLines = varsContent.split('\n')

  const filteredVarsLines = varsLines.filter((line) => {
    const matched = line.match(/^\s*--\S+(?=:)/)
    if (matched) {
      const cssVariable = matched[0].trim()
      return cssVariables.includes(cssVariable)
    } else {
      return true
    }
  })

  const filteredVarsContent = filteredVarsLines.join('\n')

  fs.writeFileSync(varsFilePath, filteredVarsContent, 'utf8')
}

// 主函数
const main = () => {
  const cssVariables = readCssFiles()
  writeCssVariablesToFile(cssVariables)
  console.log(`CSS变量名已经写入到${outputFile}文件中。`)

  filterVarsFile(cssVariables)
  console.log(`vars文件已经过滤完成。`)
}

// 执行主函数
main()
