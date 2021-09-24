/**
 * @fileoverview comment style
 * @author Eather
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/commentstyle"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });
ruleTester.run("commentstyle", rule, {
  valid: [
    // give me some code that won't trigger a warning
    // `
    // /**
    //   * 
    //   * @returns hhhhhh
    //   */
    // function printTips() {}
    // `,
    // `
    // /**
    //   * @param {k} b kkghg
    //   */
    // function printTips(b) {
    //   return 1
    // }
    // `,
    `const a = 0`,
  ],

  invalid: [
    // {
    //   code:     `
    //   /**
    //      * @param {k} b kkghg
    //     */
    //   function printTips(b) {
    //     return 1
    //   }
    //   `,
    //   errors: [{ message: "function commentstyle error, right style: \n @param {paramType} paramName paramDescription\n @returns returnDescription ", type: "FunctionDeclaration" }],
    // },
  ],
});
