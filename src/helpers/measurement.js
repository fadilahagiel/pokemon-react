export function cmToFeetAndInch(cm) {
  
    const inches = cm / 2.54;

    const feet = Math.floor(inches / 12);
  
    const remainingInches = inches % 12;
    const heightString = `${feet}'${remainingInches.toFixed(1)}" (${cm/100} m)`;
    return heightString;
  }

  export function kgToLbs(kg) {
    // 1 kilogram ≈ 2.20462 pounds
    const lbs = (kg/10 * 2.20462).toFixed(1);
    return `${lbs} lbs (${kg/10} kg)`;
  }