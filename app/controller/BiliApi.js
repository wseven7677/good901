import assert from 'assert'

class BiliApi {
    constructor() {
        this.headerMsg = '[controller biliApi]';
    }
    getTagVideoList(ctx) {
        const { tag_id, count } = ctx.request.body;
        const tagId = tag_id;

        assert(tagId, `${this.headerMsg}no tagId`);
        assert(typeof count === 'number', `${this.headerMsg}count should be a number`);

        assert(typeof tagId === 'string', `${this.headerMsg}tagId should be string`);
        assert(/^\d+$/.test(tagId), `${this.headerMsg}tagId is invaild`);

        assert(count > 0 && count < 1000, `${this.headerMsg}count should more than 0 and less than 1000`);

        return new Promise(resolve => {
            ctx.service.biliApi.getTagVideoList(tagId, count)
            .then(list => {
                ctx.response = {
                    errno: 0,
                    msg: 'success',
                    data: list,
                };
                resolve();
            });
        });
        
    }
}

export default BiliApi;