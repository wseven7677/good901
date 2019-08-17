/**
 * @file 启动文件
 * 生成文件，需要在服务启动前执行
 */

import path from 'path';
import fs from 'fs';

function smallIt(name) {
    const arr = name.split('');
    arr[0] = arr[0].toLowerCase();
    return arr.join('');
}

function generateFile(arr, folderName) {
    // 只扫描js文件
    let list = arr.filter(one => {
        return one.split('.')[1] === 'js';
    });

    let importContent = list.map(one => {
        return `import ${one.split('.')[0]} from '../${folderName}/${one}';`;
    });

    let exportContent = list.map(one => {
        const name = one.split('.')[0];
        const smallName = smallIt(name);
        return `${smallName}: new ${name}(),`;
    });
    exportContent.unshift(`export default (() => { return {`);
    exportContent.push(`};})();`);

    let content = [...importContent, ...exportContent];
    return content.join('\n');
}

function main() {
    console.log(`boot start...`);

    const controllerPath = path.resolve(__dirname, '../controller');
    const servicePath = path.resolve(__dirname, '../service');
    const pluginPath = path.resolve(__dirname, '../plugin');

    const controllerList = fs.readdirSync(controllerPath);
    const serviceList = fs.readdirSync(servicePath);
    const pluginList = fs.readdirSync(pluginPath);

    //
    const fController = generateFile(controllerList, 'controller');
    fs.writeFileSync(__dirname + '/controller.js', fController);
    console.log('controller generated.');

    const fService = generateFile(serviceList, 'service');
    fs.writeFileSync(__dirname + '/service.js', fService);
    console.log('service generated.');

    const fPlugin = generateFile(pluginList, 'plugin');
    fs.writeFileSync(__dirname + '/plugin.js', fPlugin);
    console.log('plugin generated.');

    console.log(`boot done.`);
}

main();
