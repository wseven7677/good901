import fs from 'fs';
import path from 'path';
import moment from 'moment';

class Log {
    constructor() {
        this.logPath = path.resolve(__dirname, '../log/app-log.log');
    }

    _tidyFile() {
        try {
            const stat = fs.statSync(this.logPath);

            function getArchiveName(name) {
                let arr = name.split('.');
                arr.splice(
                    1,
                    0,
                    `-${moment(stat.birthtime).format('YYYYMMDD')}`
                );
                return arr.join('.');
            }

            if (!moment(stat.birthtime).isSame(moment(), 'day')) {
                fs.renameSync(this.logPath, getArchiveName(this.logPath));
            }
        } catch (error) {
            return;
        }
    }

    write(msg) {
        this._tidyFile();
        
        const now = moment().format('YYYYMMDD-HH:mm:ss');
        const str = `###${now}###${msg}`;
        console.log(str);
        fs.writeFileSync(this.logPath, `${str}\n`, { flag: 'a' });
    }
}

export default Log;
