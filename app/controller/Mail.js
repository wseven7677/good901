import assert from 'assert';

class Mail {
    constructor() {
        this.headerMsg = '[controller mail]';
    }
    send(ctx) {
        const fields = ctx.request.body;

        // 参数存在性验证
        assert(
            Array.isArray(fields.receivers),
            `${this.headerMsg} no receivers or not array.`
        );
        assert(fields.title, `${this.headerMsg} no title.`);
        assert(fields.content, `${this.headerMsg} no content.`);

        // 参数内容验证
        const rg = new RegExp('^\\w+@\\w+\\.com$');
        const isVaildEmails = fields.receivers.every(one => {
            return rg.test(one);
        });
        assert(isVaildEmails, `${this.headerMsg} invaild email names.`);

        return new Promise(resolve => {
            ctx.service.mail
                .send(fields.receivers, fields.title, fields.content)
                .then(response => {
                    ctx.response = response;
                    resolve();
                });
        });
    }
}

export default Mail;
