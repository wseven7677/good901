import nodemailer from 'nodemailer';

class Mail {
    constructor() {
        this.headerMsg = '[service - mail]';
    }

    async send(receivers, title, content) {
        const ctx = this.ctx;
        const mailAccount = ctx.config.mailAccount;

        return new Promise(async resolve => {
            let transporter = nodemailer.createTransport({
                service: 'qq',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: mailAccount.user,
                    pass: mailAccount.pass
                }
            });

            let info = {};
            try {
                info = await transporter.sendMail({
                    from: `"${mailAccount.name}" <${mailAccount.user}>`,
                    to: receivers.join(','), // list of receivers
                    subject: title,
                    // text: "", // plain text body
                    html: content // html body
                });
            } catch (error) {
                return resolve({
                    data: error,
                    msg: '服务器出错',
                    errno: 1001
                });
            }

            resolve({
                data: {
                    accepted: info.accepted
                },
                msg: 'success',
                errno: 0
            });
        });
    }
}

export default Mail;
