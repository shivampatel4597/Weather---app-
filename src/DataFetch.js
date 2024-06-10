import React, { Component } from 'react';
import temp from './pngtree-thermometer-of-heat-for-measure-temperature-hot-summer-png-image_3807144.png';

class DataFetch extends Component {
    constructor(props) {
        super(props);

        this.state = { users: null, location: "" };
    }

    componentDidMount() {
        // Fetch data for a default city when the component mounts
        this.fetching('New York');
    }

    componentDidUpdate(prevProps, prevState) {
        // Only fetch new data if the location state has changed
        if (prevState.location !== this.state.location) {
            this.fetching(this.state.location);
        }
    }

    fetching = async (city) => {
        try {
            const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c2a623add98448cfa4272716240806&q=${city}&days=3&aqi=no`);
            const response = await data.json();
            this.setState({ users: response }, () => {
                // This callback runs after the state has been updated
                console.log("users are", this.state.users);
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <>
                <div className='w-full flex flex-col items-center justify-center bg-violet-400 p-4'>
                    <input className='bg-black text-white w-full max-w-lg px-6 py-2 mt-6 border-2 border-black rounded-full placeholder-white' placeholder='Enter your city' onChange={(e) => this.setState({ location: e.target.value })} />

                    {this.state.users && this.state.users.location && this.state.users.current && (
                        <div className='bg-gray-900 flex flex-col items-center mx-auto my-10 w-full max-w-lg border-2 border-black rounded-lg p-4'>
                            <h3 className='text-4xl py-7 text-white text-bold'>{this.state.users.location.country}</h3>
                            <p className='text-lg text-blue-500'>{this.state.users.location.name}</p>
                            <img className='w-20 py-1 px-1 my-6 bg-blue-300 rounded-full' src={this.state.users.current.condition.icon} alt="Temperature" />
                            <p className='text-2xl text-white'>{this.state.users.current.temp_c} °C  <span className='ml-2'>{this.state.users.current.condition.text}</span>   </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 my-4 w-full border-2 border-black">
                                <div className="bg-gray-600 px-4 py-2 flex flex-col items-start justify-center rounded-md w-full">
                                    <p className='text-lg text-gray-300'>Humidity</p>
                                    <p className='text-xl text-white font-extrabold'>{this.state.users.current.humidity}</p>
                                </div>
                                <div className="bg-gray-600 px-4 py-2 flex flex-col items-start justify-center rounded-md w-full">
                                    <p className='text-lg text-gray-300'>Wind Speed</p>
                                    <p className='text-xl text-white font-extrabold'>{this.state.users.current.wind_kph}</p>
                                </div>
                                <div className="bg-gray-600 px-4 py-2 flex flex-col items-start justify-center rounded-md w-full">
                                    <p className='text-lg text-gray-300'>Pressure</p>
                                    <p className='text-xl text-white font-extrabold'>{this.state.users.current.pressure_mb}</p>
                                </div>
                                <div className="bg-gray-600 px-4 py-2 flex flex-col items-start justify-center rounded-md w-full">
                                    <p className='text-lg text-gray-300'>Heat index</p>
                                    <p className='text-xl text-white font-extrabold'>{this.state.users.current.heatindex_c}</p>
                                </div>
                            </div>

                            <h3 className='text-2xl py-4 text-white text-bold'>3-Day Forecast</h3>
                            <div className='grid grid-cols-1 gap-4 w-full'>
                                {this.state.users.forecast.forecastday.map((day, index) => (
                                    <div key={index} className="bg-gray-600 px-4 py-2 flex flex-col items-start justify-center rounded-md w-full">
                                        <p className='text-lg text-gray-300'>{day.date}</p>
                                        <p className='text-xl text-white font-extrabold'>{day.day.avgtemp_c} °C</p>
                                        <p className='text-lg text-gray-300'>Condition: {day.day.condition.text}</p>
                                        <img src={day.day.condition.icon} alt="weather condition" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default DataFetch;
