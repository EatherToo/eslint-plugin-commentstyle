const paramRep = /\s@param\s(\{\w+\})\s(\w+)\s(\w+)/
const returnRep = /\s@returns\s(\w+)/
function getCommentsBefore(node, context) {
  return context.getSourceCode().getJSDocComment(node)
}
function parseComment(comments) {
  // 补全注释
  const commentsValue = `/*${comments.value}*/`
  // 将注释按行分割为数组
  const commentList = commentsValue.split('\n')
  // 去除左边空格
  const commentsWithoutSpace = commentList.map(c => c.replace(/^\s+\*/, ''))

  // 计算第二行注释的左边空格长度
  let spaceLength = commentList[1].length - commentsWithoutSpace[1].length;

  // 保存参数描述信息
  const params = {};
  // 保存返回值描述信息
  let returnDesc = '';
  // 循环所有注释
  for (let i = 1; i < commentList.length; i++) {
    
    // 注释前面的空格长度不一致，判定为格式非法
    if (commentList[i].length - commentsWithoutSpace[i].length !== spaceLength) {
      return false;
    }

    
    // 提取参数和返回值
    // 注释为参数注释
    if (commentsWithoutSpace[i].startsWith(' @param')) {
      if (paramRep.test(commentsWithoutSpace[i])) {
        const paramType = commentsWithoutSpace[i].replace(paramRep, '$1')
        const paramName = commentsWithoutSpace[i].replace(paramRep, '$2')
        const paramDesc = commentsWithoutSpace[i].replace(paramRep, '$3')
        // 保存参数类型
        params[paramName] = {
          paramType,
          paramName,
          paramDesc
        }
      } else {
        return false;
      }
      // 注释为返回值注释
    } else if (commentsWithoutSpace[i].startsWith(' @returns')){
      // 返回值格式正确且未被赋值过
      if (returnRep.test(commentsWithoutSpace[i]) && returnDesc === '') {
        returnDesc = commentsWithoutSpace[i].replace(returnRep, '$1')
      } else {
        return false;
      }
    }

  }
  return {
    params,
    returnDesc
  };
}
function functionComentDetector (node, context) {
  const comments = getCommentsBefore(node, context)
  if (!comments) {
    context.report({
      node,
      messageId: 'FunctionDeclaration'
    })
  }
  const commentsTypes = parseComment(comments);
  if (!commentsTypes) {
    context.report({
      node,
      messageId: 'function commentstyle'
    })
  } else {
    // 注释参数长度
    const paramsNumComment = Object.keys(commentsTypes.params).length;
    // 函数实际的参数长度
    const paramsNumFunc = node.params.length;
    // 注释的参数长度与函数实际参数长度不符合
    if (paramsNumComment !== paramsNumFunc) {
      context.report({
        node,
        messageId: 'params legth'
      })
    }
    node.params.forEach(p => {
      if (!commentsTypes.params[p.name]) {
        context.report({
          node,
          messageId: 'param not exist'
        })
      }
    })
  }     
}


module.exports = {
  getCommentsBefore,
  parseComment,
  functionComentDetector
  
} 

