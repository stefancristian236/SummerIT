import { useState } from 'react';
import { Keyboard } from '../UI/Keyboard';

const SCIENTIFIC_KEYS = [
  { label: 'DEL', value: 'del', style: 'bg-red-700 hover:bg-red-600', span: 1 },
  { label: 'AC', value: 'clear', style: 'bg-red-700 hover:bg-red-600', span: 1 },
  { label: 'x^y', value: '^', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: '√x', value: 'sqrt', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: 'n√x', value: 'sqrtn', style: 'bg-gray-600 hover:bg-gray-500' },
  
  { label: 'sin', value: 'sin_x', style: 'bg-gray-700 hover:bg-gray-600' },
  { label: 'cos', value: 'cos_x', style: 'bg-gray-700 hover:bg-gray-600' },
  { label: 'tan', value: 'tan_x', style: 'bg-gray-700 hover:bg-gray-600' },
  { label: 'x²', value: 'x^2', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: 'x³', value: 'x^3', style: 'bg-gray-600 hover:bg-gray-500' },

  { label: 'asin', value: 'asin_x', style: 'bg-gray-700 hover:bg-gray-600' },
  { label: 'acos', value: 'acos_x', style: 'bg-gray-700 hover:bg-gray-600' },
  { label: 'atan', value: 'atan_x', style: 'bg-gray-700 hover:bg-gray-600' },
  { label: 'ln', value: 'ln', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: 'log₁₀', value: 'log10', style: 'bg-gray-600 hover:bg-gray-500' },
  
  { label: 'sinh', value: 'sinh_x', style: 'bg-gray-700 hover:bg-gray-600' },
  { label: 'cosh', value: 'cosh_x', style: 'bg-gray-700 hover:bg-gray-600' },
  { label: 'tanh', value: 'tanh_x', style: 'bg-gray-700 hover:bg-gray-600' },
  { label: '10ˣ', value: '10x', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: 'n!', value: 'n!', style: 'bg-gray-600 hover:bg-gray-500' },
];

const STANDARD_KEYS = [
  { label: 'abs', value: 'abs', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: '7', value: '7', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '8', value: '8', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '9', value: '9', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '÷', value: '/', style: 'bg-orange-500 hover:bg-orange-400' },

  { label: 'exp', value: 'exp', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: '4', value: '4', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '5', value: '5', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '6', value: '6', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '×', value: '*', style: 'bg-orange-500 hover:bg-orange-400' },

  { label: 'mod', value: 'mod', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: '1', value: '1', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '2', value: '2', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '3', value: '3', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '-', value: '-', style: 'bg-orange-500 hover:bg-orange-400' },

  { label: 'π', value: 'pi', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: 'e', value: 'e', style: 'bg-gray-600 hover:bg-gray-500' },
  { label: '0', value: '0', style: 'bg-gray-800 hover:bg-gray-700', span: 1 },
  { label: '.', value: '.', style: 'bg-gray-800 hover:bg-gray-700' },
  { label: '+', value: '+', style: 'bg-orange-500 hover:bg-orange-400' },

  { label: '=', value: 'equals', style: 'bg-green-600 hover:bg-green-500', span: 5 },
];

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operation, setOperation] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const [overwrite, setOverwrite] = useState(true);
  const [message, setMessage] = useState('');

  const handleError = (errorMsg: string): void => {
    setMessage(errorMsg);
    setTimeout(() => {
      setMessage('');
      clearDisplay();
    }, 1500);
  };

  const calculate = (): string => {
    if (!operation || !prevValue) return displayValue;

    const current = parseFloat(displayValue);
    const previous = parseFloat(prevValue);

    let result: number | null = null;
    let error: string | null = null;

    switch(operation) {
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
          error = 'Error: Div by Zero';
        } else {
          result = previous / current;
        }
        break;
      case '^':
        result = Math.pow(previous, current);
        break;
      case 'sqrtn':
        if (current === 0) {
            error = 'Error: Root by Zero';
        } else if (previous < 0 && current % 2 === 0) {
            error = 'Error: Even root of negative';
        } else {
            result = Math.pow(previous, 1/current);
        }
        break;
      case 'mod':
        result = previous % current;
        break;
      case 'sqrt':
        if (current < 0) {
            error = 'Error: Imaginary result';
        } else {
            result = Math.sqrt(current);
        }
        break;
      case '10x':
        result = Math.pow(10, current);
        break;
      case '2x':
        result = Math.pow(2, current);
        break;
      case '3x':
        result = Math.pow(3, current);
        break;
      case 'x^2':
        result = Math.pow(current, 2);
        break;
      case 'x^3':
        result = Math.pow(current, 3);
        break;
      case 'sin_x':
        result = Math.sin(current);
        break;
      case 'cos_x':
        result = Math.cos(current);
        break;
      case 'tan_x':
        result = Math.tan(current);
        break;
      case 'sinh_x':
        result = Math.sinh(current);
        break;
      case 'cosh_x':
        result = Math.cosh(current);
        break;
      case 'tanh_x':
        result = Math.tanh(current);
        break;
      case 'asin_x':
        if (current < -1 || current > 1) {
            error = 'Error: Domain (-1, 1)';
        } else {
            result = Math.asin(current);
        }
        break;
      case 'acos_x':
        if (current < -1 || current > 1) {
            error = 'Error: Domain (-1, 1)';
        } else {
            result = Math.acos(current);
        }
        break;
      case 'atan_x':
        result = Math.atan(current);
        break;
      case 'n!':
        if (Math.floor(current) !== Math.ceil(current) || current < 0 || current > 170) {
          error = 'Error: Integer 0-170 required';
        } else {
          result = 1;
          for (let i = 1; i <= current; i++) {
            result = result * i;
          }
        }
        break;
      case 'ln':
      case 'log10':
        if (current <= 0) {
          error = 'Error: Undefined for x <= 0';
        } else {
          result = operation === 'ln' ? Math.log(current) : Math.log10(current);
        }
        break;
      case 'abs':
        result = Math.abs(current);
        break;
      case 'exp':
        result = Math.pow(Math.E, current);
        break;
      default:
        return displayValue;
    }
    
    if (error) {
        return error;
    }
    
    if (result !== null) {
      return Number.parseFloat(result.toPrecision(10)).toString();
    }
    
    return displayValue; 
  };

  const equals = (): void => {
    const value = calculate();
    if (value.startsWith('Error')) {
      handleError(value);
      return;
    }
    setDisplayValue(value);
    setPrevValue('');
    setOperation('');
    setOverwrite(true);
  };

  const selectOperation = (nextOperation: string): void => {
    if (nextOperation === 'clear') {
      clearDisplay();
      return;
    }
    if (nextOperation === 'del') {
      deleteLast();
      return;
    }

    const singleOperandOps = ['sqrt', 'x^2', 'x^3', 'sin_x', 'cos_x', 'tan_x', 'sinh_x', 'cosh_x', 'tanh_x', 'asin_x', 'acos_x', 'atan_x', 'n!', 'ln', 'log10', 'abs', 'exp', '10x'];

    if (singleOperandOps.includes(nextOperation)) {
        setPrevValue(displayValue); 
        setOperation(nextOperation);
        const value = calculate();

        if (value.startsWith('Error')) {
            handleError(value);
            return;
        }
        
        setDisplayValue(value);
        setPrevValue('');
        setOperation('');
        setOverwrite(true);
        return;
    }

    if (prevValue && operation && !overwrite) {
      const value = calculate();
      if (value.startsWith('Error')) {
        handleError(value);
        return;
      }
      setPrevValue(value);
      setDisplayValue(value);
    } else {
      setPrevValue(displayValue);
    }
    setOperation(nextOperation);
    setOverwrite(true);
  };

  const clearDisplay = (): void => {
    setDisplayValue('0');
    setOperation('');
    setPrevValue('');
    setOverwrite(true);
    setMessage('');
  };

  const deleteLast = (): void => {
    if (overwrite || displayValue.length <= 1) {
      setDisplayValue('0');
      setOverwrite(true);
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  const setDigit = (digit: string): void => {
    if (message) return;

    if (digit === '.') {
      if (displayValue.includes('.')) return;
    }
    
    if (digit === 'e') {
      setDisplayValue(Math.E.toFixed(10).toString());
      setOverwrite(true);
      return;
    }
    
    if (digit === 'pi') {
      setDisplayValue(Math.PI.toFixed(10).toString());
      setOverwrite(true);
      return;
    }
    
    let newDisplay = '';

    if (overwrite || displayValue === '0' || (displayValue.startsWith('Error'))) {
        newDisplay = digit === '.' ? '0.' : digit;
    } else {
        newDisplay = `${displayValue}${digit}`;
    }

    setDisplayValue(newDisplay);
    setOverwrite(false);
  };

  const allKeys = [...SCIENTIFIC_KEYS, ...STANDARD_KEYS];
  const totalColumns = 5;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 font-['Inter']">
      <div className='bg-[#1a1a1a] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-lg p-6'>
        
        <div className='bg-[#2a2a2a] rounded-lg p-4 mb-4 shadow-inner min-h-[100px] flex flex-col justify-end'>
          <div className='text-xs text-gray-400 h-4 min-h-4 text-right overflow-hidden'>
            {prevValue} {operation && `[${operation}]`}
          </div>
          <div className='text-right text-4xl text-white font-light mt-1 break-words max-h-24 overflow-hidden'>
            <input 
              className='text-right w-full bg-transparent outline-none pointer-events-none' 
              type="text" 
              value={message || displayValue} 
              readOnly 
              style={{
                fontSize: message ? '1.5rem' : displayValue.length > 15 ? '2rem' : '3rem',
                color: message ? '#f87171' : 'white'
              }}
            />
          </div>
        </div>
        
        <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(0, 1fr))` }}>
          {allKeys.map((key) => {
            let action: () => void;
            if (key.value === 'equals') {
              action = equals;
            } else if (key.value === 'clear') {
              action = clearDisplay;
            } else if (key.value === 'del') {
              action = deleteLast;
            } else if (!isNaN(Number(key.value)) || key.value === '.' || key.value === 'e' || key.value === 'pi') {
              action = () => setDigit(key.value);
            } else {
              action = () => selectOperation(key.value);
            }
            
            return (
              <Keyboard 
                key={key.label}
                className={`
                  text-white font-medium text-lg rounded-xl p-3 h-14 w-full
                  ${key.style}
                `}
                onClick={action}
                style={{ gridColumn: key.span ? `span ${key.span} / span ${key.span}` : 'span 1 / span 1' }}
              >
                {key.label}
              </Keyboard>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};

export default Calculator;
