export function feedback(time: number) : string {
    if (time < 10) {
        return "基本正常，活动能力良好";
    } else if (time <= 14) {
        return "存在一定的移动功能限制，跌倒风险较低，但可能预示未来功能下降";
    } else if (time <= 20) {
        return "移动功能明显受限，跌倒风险为中等";
    } else {
        return "移动功能严重受损，跌倒风险高，需要进一步评估和干预";
    }
}