// Language detection patterns (order matters - more specific first)
  export const regexPatterns = [
    // Dart - very specific patterns first
    {
      lang: 'dart',
      patterns: [
        /import\s+['"]package:/,                    // package imports
        /void\s+main\s*\(\s*\)\s*\{/,              // main function
        /class\s+\w+\s+extends\s+StatelessWidget/, // Flutter widgets
        /class\s+\w+\s+extends\s+StatefulWidget/,
        /@override\s+Widget\s+build/,              // Flutter build method
        /MaterialApp\s*\(/,                        // Flutter MaterialApp
        /setState\s*\(/,                           // Flutter setState
        /late\s+\w+/,                              // late keyword
        /required\s+this\./,                       // required constructor params
      ]
    },

    // C++ - check before C since C++ includes C syntax
    {
      lang: 'cpp',
      patterns: [
        /#include\s*<iostream>/,                   // iostream header
        /#include\s*<vector>/,                     // vector header
        /#include\s*<string>/,                     // string header
        /std::/,                                   // std namespace
        /using\s+namespace\s+std/,                 // using namespace
        /cout\s*<<|cin\s*>>/,                      // iostream operators
        /class\s+\w+\s*\{[\s\S]*private:|public:|protected:/, // class with access specifiers
        /template\s*<.*>/,                         // templates
        /\w+::\w+/,                                // scope resolution
        /new\s+\w+\s*\(/,                          // new operator
        /delete\s+\w+/,                            // delete operator
      ]
    },

    // C - check after C++
    {
      lang: 'c',
      patterns: [
        /#include\s*<stdio\.h>/,                   // stdio header
        /#include\s*<stdlib\.h>/,                  // stdlib header
        /#include\s*<string\.h>/,                  // string header
        /int\s+main\s*\(\s*(void\s*)?\)/,          // main function
        /printf\s*\(/,                             // printf function
        /scanf\s*\(/,                              // scanf function
        /malloc\s*\(/,                             // memory allocation
        /free\s*\(/,                               // memory deallocation
        /typedef\s+struct/,                        // typedef struct
        /struct\s+\w+\s*\{[\s\S]*\}\s*;/,          // struct definition
      ]
    },

    // Java - distinctive patterns
    {
      lang: 'java',
      patterns: [
        /public\s+class\s+\w+/,                    // public class
        /public\s+static\s+void\s+main/,           // main method
        /import\s+java\./,                         // java imports
        /package\s+[\w.]+\s*;/,                    // package declaration
        /System\.out\.print/,                      // System.out
        /public\s+\w+\s*\([^)]*\)\s*\{/,           // public methods
        /private\s+\w+\s+\w+/,                     // private fields
        /extends\s+\w+|implements\s+\w+/,          // inheritance
        /@Override|@Deprecated|@SuppressWarnings/, // annotations
        /ArrayList|HashMap|LinkedList/,            // common collections
        /try\s*\{[\s\S]*\}\s*catch/,              // try-catch
      ]
    },

    // TypeScript - check before JavaScript
    {
      lang: 'typescript',
      patterns: [
        /interface\s+\w+/,                         // interface declaration
        /type\s+\w+\s*=/,                          // type alias
        /:\s*(string|number|boolean|any|void|unknown|never)\b/, // type annotations
        /function\s+\w+\s*\([^)]*\):\s*\w+/,       // typed function
        /class\s+\w+\s+implements\s+\w+/,          // implements keyword
        /public\s+|private\s+|protected\s+/,       // access modifiers
        /readonly\s+\w+/,                          // readonly keyword
        /export\s+interface|export\s+type/,        // export types
        /import\s+type\s+/,                        // import type
        /as\s+\w+\s*;/,                           // type assertion
        /<T>|<\w+\s+extends\s+\w+>/,              // generics
        /enum\s+\w+/,                             // enum declaration
      ]
    },

    // JavaScript - check after TypeScript
    {
      lang: 'javascript',
      patterns: [
        /console\.(log|error|warn|info)/,          // console methods
        /function\s+\w+\s*\(/,                     // function declaration
        /const\s+\w+\s*=|let\s+\w+\s*=|var\s+\w+\s*=/, // variable declarations
        /=>\s*\{|=>\s*\w/,                         // arrow functions
        /require\s*\(/,                            // CommonJS require
        /module\.exports|exports\./,               // CommonJS exports
        /import\s+.*from\s+['"`]/,                 // ES6 imports
        /export\s+(default\s+)?/,                  // ES6 exports
        /document\.|window\.|localStorage/,        // DOM/Browser APIs
        /async\s+function|await\s+/,               // async/await
        /Promise\s*\(/,                            // Promises
        /\.then\s*\(|\.catch\s*\(/,               // Promise chains
        /JSON\.(parse|stringify)/,                 // JSON methods
        /setTimeout|setInterval/,                  // timers
      ]
    },

    // Python - distinctive indentation and syntax
    {
      lang: 'python',
      patterns: [
        /def\s+\w+\s*\(/,                          // function definition
        /class\s+\w+(\s*\([^)]*\))?\s*:/,          // class definition
        /if\s+__name__\s*==\s*['""]__main__['""]/, // main guard
        /import\s+\w+|from\s+\w+\s+import/,        // import statements
        /print\s*\(/,                              // print function
        /len\s*\(|range\s*\(|enumerate\s*\(/,      // built-in functions
        /self\.\w+|self,/,                         // self reference
        /:\s*\n\s+/,                              // colon followed by indented block
        /elif\s+|else\s*:/,                        // elif/else
        /for\s+\w+\s+in\s+|while\s+.*:/,          // loops
        /try\s*:\s*\n|except\s+\w*.*:/,           // exception handling
        /lambda\s+.*:/,                            // lambda functions
        /\[.*for\s+.*in\s+.*\]/,                  // list comprehension
      ]
    },

    // HTML - markup patterns
    {
      lang: 'html',
      patterns: [
        /<!DOCTYPE\s+html>/i,                      // doctype
        /<html[\s>]|<\/html>/i,                    // html tags
        /<head[\s>]|<\/head>/i,                    // head tags
        /<body[\s>]|<\/body>/i,                    // body tags
        /<div[\s>]|<\/div>/,                       // div tags
        /<p[\s>]|<\/p>/,                           // paragraph tags
        /<h[1-6][\s>]|<\/h[1-6]>/,                 // header tags
        /<a\s+href|<\/a>/,                         // link tags
        /<img\s+src/,                              // image tags
        /<script[\s>]|<\/script>/,                 // script tags
        /<style[\s>]|<\/style>/,                   // style tags
      ]
    },

    // CSS - styling patterns
    {
      lang: 'css',
      patterns: [
        /\.[a-zA-Z][\w-]*\s*\{/,                   // class selectors
        /#[a-zA-Z][\w-]*\s*\{/,                    // id selectors
        /[a-zA-Z]+\s*\{[\s\S]*\}/,                 // element selectors
        /@media\s+/,                               // media queries
        /@import\s+/,                              // import statements
        /:\s*hover|:\s*focus|:\s*active/,          // pseudo-classes
        /background(-color|-image)?\s*:/,          // background properties
        /font(-family|-size|-weight)?\s*:/,        // font properties
        /margin|padding|border|width|height\s*:/,  // layout properties
        /color\s*:\s*(#[0-9a-fA-F]{3,6}|rgb|rgba)/, // colors
      ]
    },

    // JSON - data format
    {
      lang: 'json',
      patterns: [
        /^\s*\{[\s\S]*\}\s*$/,                     // object structure
        /^\s*\[[\s\S]*\]\s*$/,                     // array structure
        /"[^"]*"\s*:\s*("[^"]*"|\d+|true|false|null|\{|\[)/, // key-value pairs
      ]
    },
    // Scala - functional and object-oriented patterns
    {
      lang: 'scala',
      patterns: [
        /object\s+\w+/,                            // object declaration
        /class\s+\w+(\s*\[.*\])?(\s+extends\s+\w+)?/, // class declaration
        /trait\s+\w+/,                             // trait declaration
        /def\s+\w+\s*\([^)]*\)\s*:\s*\w+/,         // method with return type
        /val\s+\w+\s*:/,                           // immutable variable
        /var\s+\w+\s*:/,                           // mutable variable
        /import\s+\w+(\.\w+)+/,                    // import statements
        /case\s+class\s+\w+/,                      // case class
        /=>/,                                      // arrow for functions
        /for\s*\([^)]+\)\s*yield/,                // for-comprehension
        /@[\w]+/,                                  // annotations
        /List\[|\w+\[.*\]/,                        // parameterized types
      ]
    },
    // Markdown - documentation format
    {
      lang: 'markdown',
      patterns: [
        /^#{1,6}\s+.*$/,                           // headers
        /\[.*\]\(.*\)/,                            // links
        /!\[.*\]\(.*\)/,                           // images
        /`{3,}\w*/,                                // code blocks
        /\*\*.*\*\*|\*.*\*/,                       // bold and italic
        /> .+/,                                    // blockquotes
        /-\s+.*|\*\s+.*|\+\s+.*|^[0-9]+\.\s+/,    // lists
        /---|\*\*\*|_ _ _/,                        // horizontal rules
        /\|.*\|/,                                  // tables
      ]
    },
    // Ruby - dynamic language patterns
    {
      lang: 'ruby',
      patterns: [
        /def\s+\w+/,                               // method definition
        /class\s+\w+(\s*<\s*\w+)?/,                // class definition
        /module\s+\w+/,                            // module definition
        /require\s+['"].*['"]/,                    // require statements
        /puts\s+/,                                 // output
        /@+\w+/,                                   // instance/class variables
        /do\s*\|.*\|\s*$/,                         // blocks
        /end\s*$/,                                 // block terminator
        /:[a-zA-Z_]\w*/,                           // symbols
        /\w+\?.*\n/,                               // predicate methods
        /if\s+.*\s+then|unless\s+/,                // conditionals
      ]
    },
    // Go - simple and concurrent language patterns
    {
      lang: 'go',
      patterns: [
        /package\s+\w+/,                           // package declaration
        /import\s+\(/,                             // grouped imports
        /func\s+\w+\s*\(/,                         // function declaration
        /func\s+main\s*\(/,                        // main function
        /go\s+\w+/,                                // goroutines
        /chan\s+\w+/,                              // channels
        /defer\s+\w+/,                             // defer statements
        /type\s+\w+\s+struct/,                     // struct definition
        /interface\s*\{/,                          // interface definition
        /map\[.*\].*/,                             // map type
        /:=/,                                      // short variable declaration
      ]
    },
    // PHP - server-side scripting patterns
    {
      lang: 'php',
      patterns: [
        /<\?php/,                                  // PHP opening tag
        /\$\w+/,                                   // variables
        /function\s+\w+\s*\(/,                     // function declaration
        /class\s+\w+/,                             // class definition
        /namespace\s+[\w\\]+/,                     // namespace
        /use\s+[\w\\]+/,                           // use statements
        /echo\s+/,                                 // output
        /->\w+/,                                   // object operator
        /::\w+/,                                   // static method call
        /array\s*\(/,                              // array declaration
        /try\s*\{.*\}\s*catch/,                    // try-catch
      ]
    },
    // Kotlin - modern JVM language patterns
    {
      lang: 'kotlin',
      patterns: [
        /fun\s+\w+\s*\(/,                          // function declaration
        /class\s+\w+(\s*:\s*\w+)?/,                // class declaration
        /interface\s+\w+/,                         // interface declaration
        /val\s+\w+\s*:/,                           // immutable variable
        /var\s+\w+\s*:/,                           // mutable variable
        /import\s+\w+(\.\w+)+/,                    // import statements
        /when\s*\{/,                               // when expression
        /companion\s+object/,                      // companion object
        /@[\w]+/,                                  // annotations
        /data\s+class/,                            // data class
      ]
    },
    // Swift - Apple ecosystem patterns
    {
      lang: 'swift',
      patterns: [
        /func\s+\w+\s*\(/,                         // function declaration
        /class\s+\w+(\s*:\s*\w+)?/,                // class declaration
        /struct\s+\w+/,                            // struct definition
        /protocol\s+\w+/,                          // protocol definition
        /let\s+\w+\s*:/,                           // constant declaration
        /var\s+\w+\s*:/,                           // variable declaration
        /import\s+\w+/,                            // import statements
        /guard\s+\w+/,                             // guard statements
        /if\s+let\s+\w+/,                         // optional binding
        /@IBOutlet|@IBAction/,                     // UIKit attributes
        /\.?self\./,                               // self reference
      ]
    },
    // Rust - systems programming patterns
    {
      lang: 'rust',
      patterns: [
        /fn\s+\w+\s*\(/,                           // function declaration
        /struct\s+\w+/,                            // struct definition
        /enum\s+\w+/,                              // enum definition
        /impl\s+\w+/,                              // implementation block
        /let\s+\w+\s*:/,                           // variable declaration
        /use\s+\w+/,                               // use statements
        /pub\s+(fn|struct|enum)/,                  // public declarations
        /mut\s+\w+/,                               // mutable variables
        /->\s*\w+/,                                // return type
        /::\w+/,                                   // path separator
        /Option<|Result</,                         // standard types
      ]
    },
    // SQL - database query patterns
    {
      lang: 'sql',
      patterns: [
        /SELECT\s+.*\s+FROM/i,                     // select queries
        /INSERT\s+INTO/i,                          // insert statements
        /UPDATE\s+.*\s+SET/i,                      // update statements
        /DELETE\s+FROM/i,                          // delete statements
        /CREATE\s+(TABLE|DATABASE|INDEX)/i,        // create statements
        /ALTER\s+TABLE/i,                          // alter table
        /WHERE\s+.*=/i,                            // where clause
        /JOIN\s+.*\s+ON/i,                         // join clause
        /GROUP\s+BY|ORDER\s+BY/i,                  // grouping and ordering
        /PRIMARY\s+KEY|FOREIGN\s+KEY/i,            // key constraints
      ]
    },
    // Shell (Bash) - scripting patterns
    {
      lang: 'bash',
      patterns: [
        /^#!\/bin\/(bash|sh)/,                    // shebang
        /if\s+\[.*\];/,                            // if condition
        /for\s+\w+\s+in/,                          // for loop
        /while\s+\[.*\];/,                         // while loop
        /echo\s+/,                                 // output
        /\$\w+|\${/,                               // variables
        /function\s+\w+\s*\(\)/,                   // function definition
        /export\s+\w+/,                            // export variables
        /&&|\|\|/,                                 // logical operators
        />\s*[^>]|<\s*[^<]/,                      // redirection
        /.*\|.*[^|]/,                              // pipes
      ]
    }
  ];