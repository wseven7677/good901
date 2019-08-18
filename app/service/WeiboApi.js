import fetch from 'node-fetch'

class WeiboApi {
    constructor() {
        this.headerMsg = '[service - weiboApi]';
        // 531动态 页面
        this.api = 'http://m.weibo.cn/api/container/getIndex?containerid=231140747609674bf89fb2f6ba87827f50c11b__5796662600_-_live';
    }

    async get531status() {
        let res;
        try {
            res = await fetch(this.api, {
                headers: {
                    'Cookie': this.ctx.config.weibo.mcookie,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
                }
            })
            .then(res => res.json());
            return res.data.cards[0].card_group[0].desc1;
        } catch (error) {
            return error;
        }
        
    }
}

export default WeiboApi;