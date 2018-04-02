'use strict';

const AV = require('leanengine');
const Router = require('koa-router');

const router = new Router({prefix: '/type'});

const query = new AV.Query('Type');

// 查询 Todo 列表
router.get('/', async function(ctx) {
  try {
    const result = await query.find();
    ctx.state.content = result.map((item) => {
      return item.toJSON();
    })
  } catch (err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 company 数据表还未创建，所以返回空的 company 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      ctx.state.content = [];
    } else {
      throw err;
    }
  }
  await ctx.render('type.ejs');
});

module.exports = router;
