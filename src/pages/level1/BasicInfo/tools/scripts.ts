/**
 * 
 * @param weight (kg)
 * @param height (cm)
 * @returns BMI value
 */
export function BMI(weight: string, height: string): string {
    const w = Number(weight);
    const h = Number(height);
    
    if (10 <= w && w <= 150 && 90 <= h && h <= 220) {
        const bmi = w / ((h / 100) ** 2);
        return bmi.toFixed(2);
    } else {
        return "";
    }
}