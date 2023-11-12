"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ContainerImage from "../ContainerImage";
import { useRouter } from "next/navigation";

const CityPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const { id, token } = userData;

        const urlParams = new URLSearchParams(window.location.search);
        const cityName = urlParams.get("cityName");

        if (!cityName) {
          console.error("O nome da cidade não está definido");
          return;
        }

        const response = await axios.post(
          `http://192.168.10.4:3001/clima/city/${id}`,
          {
            city: cityName,
          },
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );

        if (response.data) {
          setWeatherData(response.data);
        }
      } catch (error) {
        console.error("Erro ao obter dados do clima por cidade:", error);
      }
    };

    fetchData();
  }, []);

  const fetchWeatherDataByCity = async () => {
    router.back();
  };

  return (
    <div className="h-screen w-auto flex sm flex-col items-center justify-evenly bg-slate-100 dark:bg-slate-950">
      {weatherData ? (
        <div className="h-screen w-screen flex sm flex-col items-center justify-around">
          <div className="h-screen w-screen flex sm flex-col items-center justify-center">
            {weatherData ? (
              <div className="w-screen flex sm flex-col items-center justify-evenly h-3/4">
                <div className="w-screen flex sm flex-row items-start justify-center">
                  <div className="text-3xl">
                    Resultados para{" "}
                    <span className="text-black font-extrabold">
                      {weatherData?.weatherForecast?.name ??
                        weatherData?.formattedData?.city?.name}
                    </span>
                  </div>
                  <div className="ml-8">
                    <button
                      onClick={fetchWeatherDataByCity}
                      className="bg-blue-700 text-white font-medium rounded-md h-10 w-36"
                    >
                      Buscar novamente
                    </button>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="flex w-auto items-center justify-center flex-row p-14">
                    <ContainerImage
                      width={80}
                      height={80}
                      src={"/images/sol.png"}
                      alt={
                        weatherData?.weatherForecast?.Current_Conditions[0]
                          ?.description ||
                        weatherData?.formattedData?.weatherForecastData[0]
                          ?.weather?.description
                      }
                    />

                    <p className="text-3xl m-6">
                      {weatherData?.weatherForecast?.Current_Conditions[0]
                        ?.max ||
                        weatherData?.formattedData?.weatherForecastData[0]
                          ?.temperature?.max}
                      |°F
                    </p>
                  </div>

                  <div className="flex w-auto items-center justify-center flex-col p-14">
                    <p className="text-3xl font-bold text-gray-950 pb-2">
                      Clima
                    </p>
                    <p className="text-3xl font-bold text-gray-950 pb-2">
                      {weatherData?.weatherForecast?.Current_Conditions[0]
                        ?.day ||
                        weatherData?.formattedData?.weatherForecastData[0]?.day}
                      ,{" "}
                      {weatherData?.weatherForecast?.Current_Conditions[0]?.hour?.slice(
                        0,
                        -3
                      ) ||
                        weatherData?.formattedData?.weatherForecastData[0]?.hour?.slice(
                          0,
                          -3
                        )}
                    </p>
                    <p className="text-3xl font-bold text-gray-950 pb-2">
                      {weatherData?.weatherForecast?.Current_Conditions[0]?.description.toUpperCase() ||
                        weatherData?.formattedData?.weatherForecastData[0]?.weather.description.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <h1>b</h1>
            )}
          </div>
          <div className="h-auto w-auto flex sm flex-row items-center justify-center bg-slate-100 dark:bg-slate-950">
            {weatherData.formattedData ? (
              weatherData.formattedData.weatherForecastData.map(
                (forecast, index) => (
                  <div
                    className="flex-col p-2 flex justify-evenly items-center w-full"
                    key={index}
                  >
                    <p className="text-gray-400 pb-6">
                      {forecast.hour.slice(0, -3)}
                    </p>
                    <h2>{forecast.day.slice(0, 3)}</h2>
                    <ContainerImage
                      width={50}
                      height={50}
                      src={"/images/sol.png"}
                      alt={forecast.weather.description}
                    />
                    <div className="flex md flex-row p-6">
                      <p className="flex md flex-row pr-3">
                        {forecast.temperature.max}
                      </p>
                      <p className="text-gray-400">
                        {forecast.temperature.min}
                      </p>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="h-auto w-auto flex sm flex-row items-center justify-center bg-slate-100 dark:bg-slate-950">
                {weatherData.weatherForecast.Current_Conditions.map(
                  (forecast, index) => (
                    <div
                      className="flex-col p-2 flex justify-evenly items-center w-full"
                      key={index}
                    >
                      <p className="text-gray-400 pb-6">
                        {forecast.hour.slice(0, -3)}
                      </p>
                      <h2>{forecast.day.slice(0, 3)}</h2>
                      <ContainerImage
                        width={50}
                        height={50}
                        src={"/images/sol.png"}
                        alt={forecast.description}
                      />
                      <div className="flex md flex-row p-6">
                        <p className="flex md flex-row pr-3">{forecast.max}</p>
                        <p className="text-gray-400">{forecast.min}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Carregando dados do clima...</p>
      )}
    </div>
  );
};

export default CityPage;
