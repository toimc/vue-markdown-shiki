// 修复markdown中可能会多传```\n的问题
export function validateAndModifyMarkdown(markdownString: string) {
  let result = markdownString
  // 匹配"```\n"
  // const regex = /```\n/g
  // 删除匹配到的"```\n"
  // result = markdownString.replace(regex, '```')

  const regex1 = /以下是(.+)续写的代码：\n\n/
  const match = result.match(regex1)

  if (match) {
    const extracted = match[1] // 提取 "xxx" 内容
    result = result.replace(regex1, `以下是${extracted}续写的代码：\n\n\`\`\`${extracted.toLocaleLowerCase()}\n\n`)
  }

  const regex2 = /\n```\n/g
  result = result.replace(regex2, `\n\`\`\` \n`)

  return result
}

export function escapeHTML(str: string) {
  return str.replace(/[<>"&]/g, function (match) {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case '&':
        return '&amp;'
      default:
        return match
    }
  })
}
