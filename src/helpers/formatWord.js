export function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

export function formattedId(num) {
    if (typeof num !== 'number' || isNaN(num)) {
      return null;
    }
    
    num = Math.max(1, Math.min(999, num));
    
    return `#${num.toString().padStart(3, '0')}`;
  }

  export function formattedNameStat(name) {
    if(name == 'hp') return 'HP'
    else if(name == 'special-attack') return 'Sp. Atk'
    else if(name == 'special-defense') return 'Sp. Def'
    else return capitalizeWords(name)

  }