import { defineConfig } from 'dumi';
import path from 'path';
export default defineConfig({
  title: 'rc-components',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  chainWebpack: (memo) => {
    memo.resolve.alias.set('@core', path.resolve(__dirname, '../'));

    memo.module.rule('js').include.add(path.join(__dirname, '../')).end();
  },
  headScripts: [
    {
      src: 'https://test-scm.kxgcc.com:30195/public/js/auth-umd/index.umd.js',
    },
    {
      content: `
    const thing =  new CoreAuthSdk.Thing({
      path:'https://test-scm.kxgcc.com:30195/auth',
      pt:2
      
      
     })
     thing.init()

    `,
      charset: 'utf-8',
    },
  ],
  proxy: {
    '/api/': {
      target: 'https://test-scm.kxgcc.com:30195',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/public/': {
      target: 'https://test-scm.kxgcc.com:30195',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/cms-static/': {
      target: 'https://test-scm.kxgcc.com:30195',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
});
