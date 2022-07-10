import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import { levels,calculateImc,Level } from './helpers/imc';
import { GridItem } from './components/GridItem/index';
import leftArrow from './assets/leftarrow.png'

const App =() => {
  const[heightField, setHeightField] = useState(0);
  const[weightField, setWeightField] = useState(0);
  const [toShow, setToShow] = useState<Level | null>();

  const handleCalculate = () =>{
    if(heightField && weightField){
      setToShow(calculateImc(heightField,weightField));
    } else {
      alert("Digite todos o campos.")
    }
  }

  const handleBack = () =>{
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
            <img src={poweredImage} width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p> IMC é a sigla para Indice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>
        
          <input 
          type="number" 
          value={heightField>0 ? heightField: ''} 
          placeholder="Digite sua altura em Metros" 
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={toShow? true : false}
          />
          <input type="number" 
          value={weightField>0 ? weightField: ''} 
          placeholder="Digite seu Peso em Kilogramas" 
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow? true : false}
          />

          <button onClick={handleCalculate} disabled={toShow? true : false}>Calcular</button>
        
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item,key)=>(
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBack}>
                <img src={leftArrow} alt="" width={25}/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
export default App;
