import schedule from 'node-schedule'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import moment from 'moment'

import config from './config.js'

function getArchiveName(stat, name) {
    let arr = name.split('.');
    arr.splice(
        1,
        0,
        `${moment(stat.birthtime).format('YYYYMMDDHHmmss')}`
    );
    return arr.join('.');
}

function main() {
    const logPath = path.resolve(__dirname, './531-status.log');

    console.log('start...');
    schedule.scheduleJob('*/5 * * * *', d => {
        axios.get(`http://${config.host}:${config.port}/api/get_531_status`)
        .then(res => {
            const data = res.data.data;
            console.log(data);
            fs.writeFileSync(logPath, JSON.stringify(data)+ '\n', { flag: 'a' });
        });
    });
    console.log('scheduling 531 status...');

    schedule.scheduleJob('3 12 * * *', d => {
        const now = moment();
        let logs = fs.readFileSync(logPath, { encoding: 'utf-8' });
        
        let fileContent = logs.split('\n').reverse().map(one => {
            return `
            <li>${one}</li>
            `;
        });
        fileContent.unshift('<ul>');
        fileContent.push('</ul>');

        axios.post(`http://${config.host}:${config.port}/api/send_mail`, {
            receivers: ['295123479@qq.com'],
            title: `吴宣仪微博登录动态${now.format('YYYY-MM-DD')}`,
            content: `
            <p style="font-size:18px;">
                ${fileContent.join('')}
            </p>
            `,
        })
        .then(res => {
            console.log(res.data);
            const stat = fs.statSync(logPath);
            fs.renameSync(logPath, getArchiveName(stat, logPath));
        });
    });
    console.log('scheduling send mail...');
}

main();