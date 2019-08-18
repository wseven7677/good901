import schedule from 'node-schedule'
import axios from 'axios'

import config from './config.js'

function main() {
    console.log('start...');
    schedule.scheduleJob('0 12 * * *', d => {
        axios.get(`http://${config.host}:${config.port}/api/send_daily_paper`)
        .then(res => {
            console.log(res.data);
        });
    });
    console.log('scheduling daily paper...');

    schedule.scheduleJob('50 18 * * *', d => {
        axios.get(`http://${config.host}:${config.port}/api/send_night_paper`)
        .then(res => {
            console.log(res.data);
        });
    });
    console.log('scheduling night paper...');

    schedule.scheduleJob('10 19 * * *', d => {
        axios.get(`http://${config.host}:${config.port}/api/send_531_paper`)
        .then(res => {
            console.log(res.data);
        });
    });
    console.log('scheduling 531 paper...');

}

main();
