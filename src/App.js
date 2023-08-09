import { useState } from "react";

import MainHeader from "./components/MainHeader";
import InvestForm from "./components/InvestForm";
import InvestTable from "./components/InvestTable";

function App() {
  const [results, setResults] = useState(null);
 

  const calculateHandler = (userInput) => {
    
    const yearlyData = []; 

    let currentSavings = userInput['current-savings']; 
    const yearlyContribution = userInput['yearly-contribution']; 
    const expectedReturn = userInput['expected-return'] / 100;
    const duration = userInput['duration'];
   

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
        currentSavings: userInput['current-savings']
      });
    }

    // do something with yearlyData ...
    setResults(yearlyData);
  };

  return (
    <div>
      <MainHeader />
      <InvestForm onSubmitHandler={calculateHandler}/>
      {!results && <p style={{textAlign: 'center'}}>No investment calculated yet.</p>}
      {results && <InvestTable showData={results}/> }
    </div>
  );
}

export default App;
