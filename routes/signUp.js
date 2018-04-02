'use strict';

const AV = require('leanengine');
const Router = require('koa-router');

const router = new Router({prefix: '/signup'});

const queryGlog = new AV.Query('Glob');
const queryType = new AV.Query('Type');
const queryLoc = new AV.Query('Location');

const SignUp = AV.Object.extend('SignUp');

// 报名
router.get('/', async function(ctx) {
  try {
    const result = await Promise.all([queryType.find(), queryLoc.find(), queryGlog.find()]);
    ctx.state.type = result[0].map((item) => {
      return item.get("name");
    });
    ctx.state.loc = result[1].map((item) => {
      return item.get("name");
    });
    ctx.state.banner = result[2][0].get('signupBanner').get('url');
  } catch (err) {
    if (err.code === 101) {
      ctx.state.type = [];
      ctx.state.loc = [];
      ctx.state.banner = '';
    } else {
      throw err;
    }
  }
  await ctx.render('signUp.ejs');
});

router.post('/', async function(ctx) {
  const body = ctx.request.body;
  const signUp = new SignUp();
  Object.keys(body).forEach((key) => {
    signUp.set(key, body[key])
  })
  try {
    await signUp.save();
    ctx.body = 'OK';
  } catch (err) {
    throw err;
  }
  
  
});

module.exports = router;
