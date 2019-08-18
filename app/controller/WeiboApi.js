import moment from 'moment'

class WeiboApi {
    constructor() {
        this.headerMsg = '[controller - weiboApi]';
    }

    get531status(ctx) {
        return new Promise(async resolve => {

            const card = await ctx.service.weiboApi.get531status();

            ctx.response = {
                errno: 0,
                msg: 'success',
                data: {
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    desc: card,
                },
            };
            resolve();
        });
    }
}

export default WeiboApi;