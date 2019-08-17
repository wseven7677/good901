import loadContext from './load-context';

class W {
    constructor(app) {
        this.app = app;
        this.headerMsg = '[ - W - ]';
    }

    get(api, cb) {
        const ctx = loadContext();

        this.app.get(api, (req, res) => {
            ctx.request = req;
            const { host, hostname, url, headers, query, body, method, ip, ips, httpVersion, domain } = req;
            
            ctx.log.write(
                `${this.headerMsg}--get--request--\n${JSON.stringify({ host, hostname, url, headers, query, body, method, ip, ips, httpVersion, domain })}`
            );
            cb(ctx).then(() => {
                ctx.log.write(
                    `${this.headerMsg}--get--response--\n${JSON.stringify(ctx.response)}`
                );
                res.send(ctx.response);
            });

        });
    }

    post(api, cb) {
        const ctx = loadContext();

        this.app.post(api, (req, res) => {
            ctx.request = req;
            ctx.log.write(`${this.headerMsg}--post--request--\n${JSON.stringify(req)}`);
            cb(ctx).then(() => {
                ctx.log.write(
                    `${this.headerMsg}--post--response--\n${JSON.stringify(ctx.response)}`
                );
                res.send(ctx.response);
            });
        });
    }
}

export default W;
