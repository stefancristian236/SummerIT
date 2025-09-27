import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home.tsx";
import Calculator from "../components/calculator.tsx";
import Calculator2 from "../components/calculator_2.tsx";
import Weather from "../components/weather_app.tsx";
import Weather_2 from "../components/weather_app_2.tsx"

export const Allroutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },{
        path: "/calculator",
        element: <Calculator />
    }, {
        path: "/calculator_2",
        element: <Calculator2 />
    }, {
        path: "/weather_app",
        element: <Weather />
    }, {
        path: "/weather_app_2",
        element: <Weather_2 />
    }
]);