'use strict';

const AV = require('leanengine');
const Router = require('koa-router');

const router = new Router({prefix: '/type'});

const query = new AV.Query('Type');

// 查询班别类型
router.get('/', async function(ctx) {
  try {
    const result = await query.find();
    ctx.state.content = result.map((item) => {
      return item.toJSON();
    })
  } catch (err) {
    if (err.code === 101) {
      ctx.state.content = [];
    } else {
      throw err;
    }
  }
  await ctx.render('type.ejs');
});

module.exports = router;
