'use strict';

const AV = require('leanengine');
const Router = require('koa-router');

const router = new Router({prefix: '/process'});

const query = new AV.Query('Glob');

// 考试流程
router.get('/', async function(ctx) {
  try {
    const result = await query.find();
    ctx.state = result[0].get('process');
  } catch (err) {
    if (err.code === 101) {
      ctx.state = {};
    } else {
      throw err;
    }
  }
  await ctx.render('process.ejs');
});

module.exports = router;
