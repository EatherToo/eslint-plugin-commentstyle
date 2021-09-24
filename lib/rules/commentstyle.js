/**
 * @fileoverview comment style
 * @author Eather
 */
"use strict";

const {functionComentDetector } = require('../../utils');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'layout', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "comment style",
      category: "Fill me in",
      recommended: true,
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
      // 函数定义
      FunctionDeclaration: (node) => functionComentDetector(node, context),

      // 定义变量
      VariableDeclaration: (node) => {
        console.log(node.parent.tokens)
      },
    };
  },
};
