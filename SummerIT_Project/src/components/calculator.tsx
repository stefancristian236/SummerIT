import { useState } from 'react';
import { Keyboard } from '../UI/Keyboard.tsx';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operation, setOperation] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const [overwrite, setOverwrite] = useState(true);

  const calculate = () => {
    if (!operation || !prevValue) return displayValue;
    const current = parseFloat(displayValue);
    const previous = parseFloat(prevValue);

    let result = 0;
    switch (operation) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        if (current === 0) {
          alert('Cannot divide by zero');
          return displayValue;
        }
        result = previous / current;
        break;
    }
    return result.toString();
  };

  const equals = () => {
    const value = calculate();
    setDisplayValue(value);
    setPrevValue('');
    setOperation('');
    setOverwrite(true);
  };

  const selectOperation = (nextOperation: string) => {
    if (prevValue && operation && !overwrite) {
      const value = calculate();
      setPrevValue(value);
      setDisplayValue(value);
    } else {
      setPrevValue(displayValue);
    }
    setOperation(nextOperation);
    setOverwrite(true);
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setOperation('');
    setPrevValue('');
    setOverwrite(true);
  };

  const deleteLast = () => {
    setDisplayValue('0');
    setOverwrite(true);
  };

  const setDigit = (digit: string) => {
    if (displayValue[0] === '0' && digit === '0') return;
    if (displayValue.includes('.') && digit === '.') return;
    if (overwrite && digit) {
      setDisplayValue(digit);
    } else {
      setDisplayValue(`${displayValue}${digit}`);
    }
    setOverwrite(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000]">
      <div className='bg-[#1a1a1a] rounded-lg shadow-lg h-[500px] w-[400px] p-6'>
        <div>
          <div className='bg-[#2a2a2a] text-white rounded-lg p-4 mb-4 h-[100px] flex items-center justify-end text-right text-3xl'>
            <input
              className='w-full h-full bg-transparent outline-none text-right'
              type="text"
              value={displayValue}
              readOnly
            />
          </div>
          <div className='bg-[#2a2a2a] text-white rounded-lg p-4 h-[340px] flex items-center justify-center text-center text-xl'>
            <div className='grid grid-cols-4 gap-2 h-full w-full'>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-[26px]'></Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-[26px]'></Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={deleteLast}>C</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={clearDisplay}>CE</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('1')}>1</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('2')}>2</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('3')}>3</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('+')}>+</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('4')}>4</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('5')}>5</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('6')}>6</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('-')}>-</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('7')}>7</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('8')}>8</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('9')}>9</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('*')}>*</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('0')}>0</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('.')}>.</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={equals}>=</Keyboard>
              <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('/')}>/</Keyboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
