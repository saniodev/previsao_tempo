"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ContainerImage from "../ContainerImage";
import { useRouter } from "next/navigation";

function Page() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { id, token } = userData;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetchWeatherData(id, token, latitude, longitude);
        },
        (error) => {
          console.error("Erro ao obter a localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não é suportada pelo navegador.");
    }
  }, []);

  const fetchWeatherData = async (id, token, latitude, longitude) => {
    try {
      const response = await axios.post(
        `http://192.168.10.4:3001/clima/weather/${id}`,
        {
          latitude,
          longitude,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      const responseCurrent = await axios.post(
        `http://192.168.10.4:3001/clima/current/${id}`,
        {
          latitude,
          longitude,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      console.log(responseCurrent);

      if (response.data && response.data.weatherForecast) {
        setWeatherData(response.data.weatherForecast);
      }

      if (responseCurrent.data && responseCurrent.data.city) {
        setCurrentData(responseCurrent);
      }
    } catch (error) {
      console.error("Erro ao obter dados do clima:", error);
    }
  };

  const fetchWeatherDataByCity = async () => {
    router.push(`/components/city?cityName=${cityInput}`);
  };

  return (
    <div className="h-screen w-auto flex sm flex-col items-center justify-evenly bg-slate-100 dark:bg-slate-950">
      {weatherData ? (
        <div className="h-screen w-screen flex sm flex-col items-center justify-around">
          <div className="h-screen w-screen flex sm flex-col items-center justify-center">
            {currentData ? (
              <div className="w-screen flex sm flex-col items-center justify-evenly h-3/4">
                <div className="w-screen flex sm flex-row items-start justify-center">
                  <div className="text-3xl">
                    Resultados para{" "}
                    <span className="text-black font-extrabold">
                      {currentData.data.city.name}
                    </span>
                  </div>
                  <div className="ml-8">
                    <input
                      type="text"
                      className="text-white font-light mt-0 mb-6 bg-slate-800 w-26 mr-3 h-10 rounded-md focus:border-2 focus:border-solid focus:border-slate-900 p-2"
                      placeholder="Digite o nome da cidade"
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                    />
                    <button
                      onClick={fetchWeatherDataByCity}
                      className="bg-blue-700 text-white font-medium rounded-md h-10 w-36"
                    >
                      Buscar por cidade
                    </button>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="flex w-auto items-center justify-center flex-row p-14">
                    <ContainerImage
                      width={80}
                      height={80}
                      src={"/images/sol.png"}
                      alt={currentData.data.city.description}
                    />

                    <p className="text-3xl m-6">
                      {currentData.data.city.current}|°F
                    </p>

                    <div className="flex sm items-center justify-center flex-col">
                      <p className="text-3xl font-bold text-gray-500 pb-2">
                        Umidade: {currentData.data.city.humidity}
                      </p>
                      <p className="text-3xl font-bold text-gray-500">
                        Vento: {currentData.data.city.speed}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-auto items-center justify-center flex-col p-14">
                    <p className="text-3xl font-bold text-gray-950 pb-2">
                      Clima
                    </p>
                    <p className="text-3xl font-bold text-gray-950 pb-2">
                      {currentData.data.city.day},{" "}
                      {currentData.data.city.sunrise.slice(0, -3)}
                    </p>
                    <p className="text-3xl font-bold text-gray-950 pb-2">
                      {currentData.data.city.description.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <h1>b</h1>
            )}
          </div>
          <div className="h-auto w-auto flex sm flex-row items-center justify-center bg-slate-100 dark:bg-slate-950">
            {weatherData.Current_Conditions.map((forecast, index) => (
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
            ))}
          </div>
        </div>
      ) : (
        <p>Carregando dados do clima...</p>
      )}
    </div>
  );
}

export default Page;
