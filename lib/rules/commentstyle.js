/**
 * @fileoverview comment style
 * @author Eather
 */
"use strict";

const { getCommentsBefore, parseComment } = require('../../utils');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "comment style",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    // 报错信息描述
    messages: {
      'function commentstyle': "function commentstyle error, right style: \n @param {paramType} paramName paramDescription\n @returns returnDescription ",
      'params legth': 'comments params length not equal to function params length',
      'param not exist': 'comments lock of param'
  },
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      'FunctionDeclaration': (node) => {
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
    };
  },
};
