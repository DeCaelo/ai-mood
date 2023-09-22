function getColorForSentiment(score: number): string {
  const colorMap: { [key: string]: string } = {
    '-10': 'hsl(343deg 100% 20%) 0%',
    '-9': 'hsl(7deg 67% 35%) 10%',
    '-8': 'hsl(7deg 67% 35%) 15%',
    '-7': 'hsl(25deg 84% 40%) 20%',
    '-6': 'hsl(25deg 84% 40%) 25%',
    '-5': 'hsl(39deg 100% 42%) 30%',
    '-4': 'hsl(39deg 100% 42%) 35%',
    '-3': 'hsl(52deg 100% 44%) 40%',
    '-2': 'hsl(52deg 100% 44%) 45%',
    '-1': 'hsl(69deg 100% 50%) 50%',
    '0': 'hsl(69deg 100% 50%) 55%',
    '1': 'hsl(74deg 100% 50%) 60%',
    '2': 'hsl(74deg 100% 50%) 65%',
    '3': 'hsl(80deg 100% 50%) 70%',
    '4': 'hsl(80deg 100% 50%) 75%',
    '5': 'hsl(80deg 100% 50%) 70%',
    '6': 'hsl(80deg 100% 50%) 75%',
    '7': 'hsl(97deg 100% 50%) 90%',
    '8': 'hsl(97deg 100% 50%) 95%',
    '9': 'hsl(115deg 100% 50%) 100%',
    '10': '',
  };

  return colorMap[score.toString()] || '#FFF';
}

export default getColorForSentiment;
