'use strict';

const AV = require('leanengine');
const Router = require('koa-router');

const router = new Router({prefix: '/company'});

const query = new AV.Query('company');

// 查询 Todo 列表
router.get('/', async function(ctx) {
  try {
    const result = await query.find();
    ctx.state.info = result[0].get('info');
    ctx.state.pictures = result[0].get('pictures');
  } catch (err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 company 数据表还未创建，所以返回空的 company 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      ctx.state = {};
    } else {
      throw err;
    }
  }
  await ctx.render('company.ejs');
});

module.exports = router;
