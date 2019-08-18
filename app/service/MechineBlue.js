import moment from 'moment';

import { who, things } from '../statics/mechine-blue/data.js';
import random from '../utils/random.js';

class MechineBlue {
    constructor() {
        this.headerMsg = '[service - mechineBlue]';
    }

    async sendDailyPaper() {
        const now = moment();
        const wholist = random(who, 6);
        const contentItem = wholist.map(one => {
            return `
            <span>${one}在${random(things)}</span>
        `;
        });

        const receivers = this.ctx.config.subs;
        const title = `【机蓝日报】season 1 第${now.format('YYYYMMDD')}期`;
        const content = `<h2>机蓝日报</h2>
        <p style="font-size: 18px;">
            到发报此时为止，${contentItem.join('，')}。其他人行踪不明。
        </p>
        <br />
        <p>机蓝本文指导老师：${random(who)}</p>
        <p>出刊时间：${now.format('YYYY-MM-DD HH:mm')}</p>
        <hr />
        <p style="font-size: 14px;color: #888;">
            机蓝功能复健进行中。每天会有指导老师指导机蓝完成一篇观察日报，并发送给订阅用户。如果您对收到该邮件有疑问，请联系九口药。想要订阅该日报，请联系十六口药。
        </p>`;

        const res = await this.ctx.service.mail.send(receivers, title, content);
        return res;
    }

    async sendNightPaper() {
        const now = moment();
        const list = await this.ctx.service.biliApi.getTagVideoList(
            '1644027',
            10
        );
        const contentItems = list
            .map(one => {
                return {
                    title: one.title,
                    av: one.aid,
                    pic: one.pic,
                    ctime: one.ctime
                };
            })
            .map(one => {
                return `
                <li style="margin-bottom: 50px;">
                    <img style="width: 200px;" src="${one.pic}"/>
                    <h3>${one.title}</h3>
                    <a href="https://www.bilibili.com/video/av${
                        one.av
                    }" style="color: red;">av${one.av}</a>
                    <span>时间：${moment(one.ctime * 1000).format(
                        'YYYYMMDD HH:mm:ss'
                    )}</span>
                </li>
                `;
            });

        const receivers = this.ctx.config.subs;
        const title = `~~机蓝晚报~~ 最新绿蓝视频 第${now.format('YYYYMMDD')}期`;
        const content = `<h2>机蓝晚报</h2>
        <p style="font-size: 18px;margin-bottom: 50px;">
            你好，你好吗？我是九口药实验室的机器人小蓝，下面是我在网络上收集的信息：
        </p>
        <p style="font-size: 18px;">
            <ul>
                ${contentItems.join('')}
            </ul>
        </p>
        <p style="font-size: 18px;">
            以上是全部内容。我是机蓝，我们明天再见（什
        </p>
        <p>出刊时间：${now.format('YYYY-MM-DD HH:mm')}</p>
        <hr />
        <p style="font-size: 14px;color: #888;">
            机蓝功能复健进行中。机蓝会蹲守B站绿蓝话题，把最新的十个视频发送给订阅用户。如果您对收到该邮件有疑问，请联系九口药。想要订阅该日报，请联系十六口药。
        </p>`;

        const res = await this.ctx.service.mail.send(receivers, title, content);
        return res;
    }

    async send531paper() {
        const now = moment();
        const list = await this.ctx.service.biliApi.getTagVideoList(
            '2494311',
            20
        );
        const contentItems = list
            .map(one => {
                return {
                    title: one.title,
                    av: one.aid,
                    pic: one.pic,
                    ctime: one.ctime
                };
            })
            .map(one => {
                return `
                <li style="margin-bottom: 50px;">
                    <img style="width: 200px;" src="${one.pic}"/>
                    <h3>${one.title}</h3>
                    <a href="https://www.bilibili.com/video/av${
                        one.av
                    }" style="color: red;">av${one.av}</a>
                    <span>时间：${moment(one.ctime * 1000).format(
                        'YYYYMMDD HH:mm:ss'
                    )}</span>
                </li>
                `;
            });

        const content = `
        <p style="font-size: 18px;">
            <ul>
                ${contentItems.join('')}
            </ul>
        </p>
        `;
        const res = await this.ctx.service.mail.send(['295123479@qq.com'], `【吴宣仪日报】${moment().format('YYYY-MM-DD')}`, content);
        return res;
    }
}

export default MechineBlue;
