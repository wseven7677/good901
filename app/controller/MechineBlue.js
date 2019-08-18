class MechineBlue {
    constructor() {
        this.headerMsg = '[controller - mechineBlue]';
    }

    sendDailyPaper(ctx) {
        return new Promise(async resolve => {
            const rst = await ctx.service.mechineBlue.sendDailyPaper();
            ctx.response = rst;
            resolve();
        });
    }

    sendNightPaper(ctx) {
        return new Promise(async resolve => {
            const rst = await ctx.service.mechineBlue.sendNightPaper();
            ctx.response = rst;
            resolve();
        });
    }

    send531paper(ctx) {
        return new Promise(async resolve => {
            const rst = await ctx.service.mechineBlue.send531paper();
            ctx.response = rst;
            resolve();
        });
    }
}

export default MechineBlue;