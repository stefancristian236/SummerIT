import { Button } from '../UI/Button.tsx'

const home = () => {
  return (
    <div className = "flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Button onClick= {() => window.location.href = '/calculator'}>
        Calculator
      </Button>
      <Button onClick= {() => window.location.href = '/calculator_2'}>
        Scientific Calculator
      </Button>
      <Button onClick= {() => window.location.href = '/weather_app'}>
        Weather App
      </Button>
      <Button onClick= {() => window.location.href = '/weather_app_2'}>
        Weather 3 days in advance
      </Button>
    </div>
  )
}

export default home