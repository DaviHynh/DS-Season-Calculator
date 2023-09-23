import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function Calculator() {


    const [message, setMessage] = useState("");
    const [nextSeason, setNextSeason] = useState("");

    const handleSubmit = (event) =>
    {
        event.preventDefault();

        let startSeason = event.target.startSeason.value;
        let currDay = event.target.currDay.value;

        let regex = /^[\d]{1,}$/;
        
        if (!regex.test(currDay))
        {
            setMessage("Invalid Date Specified");
            setNextSeason("");
            return;
        }

        currDay = parseInt(currDay);

        if (currDay < 1)
        {
            setMessage("Invalid Date Specified");
            setNextSeason("");
            return;
        }

        let calcDay = currDay % 72;

        let calcSeason;
        let daysToNext;

        if (calcDay >= 1 && calcDay <= 20)
        {
            calcSeason = (startSeason == "Fall" ? "Fall" : "Spring");
            daysToNext = 20 - calcDay + 1;
        }
        else if (calcDay >= 21 && calcDay <= 36)
        {
            calcSeason = (startSeason == "Fall" ? "Winter" : "Summer");
            daysToNext = 36 - calcDay + 1;
        }
        else if (calcDay >= 37 && calcDay <= 56)
        {
            calcSeason = (startSeason == "Fall" ? "Spring" : "Fall");
            daysToNext = 56 - calcDay + 1;
        }
        else
        {
            calcSeason = (startSeason == "Fall" ? "Summer" : "Winter");
            daysToNext = 72 - calcDay + 1;

            if (calcDay == 0)
            {
                daysToNext = 1;
            }
        }

        setMessage(`The current season is ${calcSeason}.`);

        setNextSeason(`There ${daysToNext == 1 ? "is" : "are"} ${daysToNext} ${daysToNext == 1 ? "day" : "days"} until the next season.
        (Day ${currDay + daysToNext})`);
    }




    return (
        <>
        <div className='calcForm'>
            <form onSubmit={handleSubmit}>
                <h4 style={{paddingTop: "10px"}}>Select the starting season</h4>
            <label className="seasonRadio" ><input type="radio" name="startSeason" value="Fall" defaultChecked={true} />Autumn</label>
            <label className="seasonRadio" ><input type="radio" name="startSeason" value="Spring" />Spring</label>
            <br />

            <label className="seasonRadio" >
                Current Day: <input style={{outline:"none", boxShadow:"none"}}className="dayInput" name="currDay" />
            </label>
            <br />
            <Button variant="outline-danger" className="formButton" type="reset" onClick={() => {setMessage(""); setNextSeason("");}}>Reset</Button>
            <Button variant="success" className="formButton" type="submit">Calculate</Button>


            </form>
            <div className='finalBox'>
                <span className='finalMessage'>{message}</span>
                <br />
                <span className='finalMessage'>{nextSeason}</span>
            </div>
        </div>
        </>
    )
}
