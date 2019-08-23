import moment from 'moment';

class WeiboApi {
    constructor() {
        this.headerMsg = '[controller - weiboApi]';
    }

    get531status(ctx) {
        return new Promise(async resolve => {
            const card = await ctx.service.weiboApi.get531status();
            const now = moment().format('YYYY-MM-DD HH:mm:ss');

            if (card === '微博在线了') {
                ctx.service.mail.send(
                    ctx.config.gm,
                    `吴宣仪上线了-${now}`,
                    `
                        <p>上线了！${now}</p>
                    `
                );
            }

            ctx.response = {
                errno: 0,
                msg: 'success',
                data: {
                    time: now,
                    desc: card
                }
            };
            resolve();
        });
    }
}

export default WeiboApi;
