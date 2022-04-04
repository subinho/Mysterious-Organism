// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)]; 
  };
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  
  const compareBatchDNA = batch => {
    let mostRelate = 0;
    let mostRelatedPair = [ {}, {} ];
  
    for(let i = batch.length-1; i >= 1; i--){
      for(let j = i - 1; j >= 0; j--){
        let tempRelate = batch[i].compareDNA(batch[j]);
  
        if(tempRelate === -1){
          console.log('Error when comparing DNA!'); 
          return tempRelate;
        }
  
        if(tempRelate > mostRelate){
          mostRelate = tempRelate;
  
          mostRelatedPair.pop();
          mostRelatedPair.pop();
  
          mostRelatedPair.push(batch[i]);
          mostRelatedPair.push(batch[j]);
        } 
      } 
    }
    return mostRelatedPair;
  };
  
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum,
      dna,
  
      mutate() {
        let idx = Math.floor(Math.random() * this.dna.length);
        let oldDNA = this.dna[idx];
  
        do{
          this.dna[idx] = returnRandBase();
        } while(oldDNA === this.dna[idx]);
        return this.dna;
      },
  
      compareDNA(otherDNA) {
        let length = this.dna.length;
  
        if(length != otherDNA.dna.length){
          console.log('Error: The two DNA sequences have different lengths.');
          return -1;
        }
        let pairs = 0;
  
        for(let i = 0; i < length; i++){
          if(this.dna[i] === otherDNA.dna[i])
            pairs++;
        }
  
        let average = Math.round(pairs/length * 100);
        console.log('specimen #'+this.specimenNum+' and specimen #'+otherDNA.specimenNum+' have '+average+'% DNA in common');
        return average;
      },
  
      willLikelySurvive() {
  
        const pairsArray = this.dna.filter(base => base === 'C' || base === 'G');
        return pairsArray.length/this.dna.length >= .6;
      },
  
      complementStrand() {
        let compStrand = [];
  
        for(let base of this.dna){
          switch(base){
            case 'A':
              compStrand.push('T');
              break;
            case 'T':
              compStrand.push('A');
              break;
            case 'C':
              compStrand.push('G');
              break;
            case 'G':
              compStrand.push('C');
              break;
          }
        }
        return compStrand;
      }
    };
  };
  
  
  let batch = [];
  let idCounter = 1;
  while(batch.length < 30){
    let tempPAequor = pAequorFactory(idCounter, mockUpStrand());
    if(tempPAequor.willLikelySurvive())
      batch.push(tempPAequor);
    idCounter++;
  }