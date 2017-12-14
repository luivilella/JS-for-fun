const getTopNWords = (text, numberOfTopWords=null) => {
  let wordRegExp = /\w+(?:'\w{1,2})?/g;
  let words = {};
  let matches;
  let totalWords = 0;
  while ((matches = wordRegExp.exec(text)) !== null)
  {
      let word = matches[0].toLowerCase();
      if (typeof words[word] == "undefined")
      {
          words[word] = 1;
      }
      else
      {
          words[word]++;
      }
      totalWords += 1;
  }

  let wordList = [];
  for (let word in words)
  {
      if (words.hasOwnProperty(word))
      {
          wordList.push([word, words[word]]);
      }
  }
  wordList.sort(function(a, b) { return b[1] - a[1]; });

  let dataToReturn = {
    totalWords: totalWords,
    words: words,
  };
  if(!numberOfTopWords){
    return dataToReturn;
  }

  let topWords = [];
  for (let i = 0; i < numberOfTopWords; i++)
  {
      topWords.push(wordList[i]);
  }
  dataToReturn.topWords = topWords;

  return dataToReturn;
}

export { getTopNWords }
