'use strict';

const AV = require('leanengine');
const Router = require('koa-router');

const router = new Router({prefix: '/site'});

const query = new AV.Query('Location');

// 查询 场地列表
router.get('/', async function(ctx) {
  try {
    const result = await query.find();
    const content = [];
    result.forEach((item) => {
      let obj = {id: item.id};
      item = item.toJSON();
      obj.name = item.name;
      obj.picture = item.pictures[0];
      content.push(obj);
    })
    ctx.state.content = content;
  } catch (err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 company 数据表还未创建，所以返回空的 company 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      ctx.state.content = {};
    } else {
      throw err;
    }
  }
  await ctx.render('siteLists.ejs');
});

// 查询 场地详情
router.get('/detail', async function (ctx) {
  const params = ctx.request.query;
  try {
    const result = await query.get(params.id);
    ctx.state.name = result.get('name');
    ctx.state.detailLoc = result.get('detailLoc');
    ctx.state.pictures = result.get('pictures');
  } catch (err) {
    if (err.code === 101) {
      ctx.state.name = '';
      ctx.state.detailLoc = '';
      ctx.state.pictures = [];
    } else {
      throw err;
    }
  }
  await ctx.render('site.ejs');
});


module.exports = router;
