import axios from 'axios';

class BiliApi {
    constructor() {
        this.api =
            'http://api.bilibili.com/x/tag/detail?jsonp=jsonp&ps=40&tag_id='; // 每页40个视频
        this.headerMsg = '[service biliApi]';
    }

    _getTagVideoOnePage(tagId, page) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.ctx.log.write(
                    `${
                        this.headerMsg
                    }--_getTagVideoOnePage--tag: ${tagId}, page: ${page}`
                );
                axios
                    .get(`${this.api}${tagId}&pn=${page}`, {
                        headers: {
                            Accept:
                                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                            'Accept-Encoding': 'gzip, deflate',
                            'Accept-Language': 'zh-CN,zh;q=0.9',
                            Host: 'api.bilibili.com',
                            'User-Agent':
                                'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
                        }
                    })
                    .then(res => {
                        if (res.data.code === 0) {
                            resolve(res.data.data.news.archives);
                        } else {
                            this.ctx.log.write(
                                `${this.headerMsg}--api response msg--${
                                    res.data.message
                                }`
                            );
                        }
                    })
                    .catch(err => {
                        this.ctx.log.write(
                            `${
                                this.headerMsg
                            }_getTagVideoOnePage ERROR:\n${err}`
                        );
                    });
            }, Math.round(Math.random() * 600));
        });
    }

    /**
     * 获取某个tag下的最新视频信息
     * @param {String} tagId 标签的id
     * @param {Number} count 爬取最近的多少个视频
     */
    getTagVideoList(tagId, count) {
        if (typeof count !== 'number') {
            this.ctx.log.write(
                `${this.headerMsg}--getTagVideoList--count should be number.`
            );
            return;
        }

        let maxPage = Math.floor(count / 40) + 1;
        return new Promise(resolve => {
            let rst = [];
            let wholeList = [];
            for (let i = 1; i <= maxPage; ++i) {
                wholeList.push(this._getTagVideoOnePage(tagId, i));
            }
            Promise.all(wholeList).then(list => {
                list.forEach(one => {
                    rst = rst.concat(one);
                });
                resolve(rst.slice(0, count));
            });
        });
    }
}

export default BiliApi;
