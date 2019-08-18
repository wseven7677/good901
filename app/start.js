import W from './lib/W.js'

function start(app) {
    const w = new W(app);

    // w.post('/api/send_mail', ctx => {
    //     return ctx.controller.mail.send(ctx);
    // });

    // w.post('/api/get_videl_list', ctx => {
    //     return ctx.controller.biliApi.getTagVideoList(ctx);
    // });

    w.get('/api/send_daily_paper', ctx => {
        return ctx.controller.mechineBlue.sendDailyPaper(ctx);
    });

    w.get('/api/send_night_paper', ctx => {
        return ctx.controller.mechineBlue.sendNightPaper(ctx);
    });

    w.get('/api/send_531_paper', ctx => {
        return ctx.controller.mechineBlue.send531paper(ctx);
    });

}

export default start;