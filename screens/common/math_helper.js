export const RoundUp = (x) => {
    if(x > 0 && x <= 10)
      return Math.ceil(x); 
    else if(x > 10 && x <= 100)
      return Math.ceil(x / 5) * 5; 
    else if(x > 100 && x <= 1000)
      return Math.ceil(x / 50) * 50; 
    else if(x > 1000 && x <= 10000)
      return Math.ceil(x / 500) * 500;  
    else if(x > 10000 && x <= 100000)
      return Math.ceil(x / 5000) * 5000; 
    
    return x;
  }

export const CalculateYaxisValue = (yValues) => {
    
    var sortYvalues = yValues.sort((a, b) => {
        return a - b;
    })

    let getUniqueFromRaw = [...new Set(sortYvalues)]

    const maxValue = Math.max(getUniqueFromRaw[3])
    const thirdValue = RoundUp(getUniqueFromRaw[2])
    const secondValue = RoundUp(getUniqueFromRaw[1])
    const minValue = Math.min(getUniqueFromRaw[0])
    let roundedValues = [minValue, secondValue, thirdValue, maxValue];
    let uniqueItems = [...new Set(roundedValues.filter(x => !isNaN(x)))]


    return uniqueItems
  }
