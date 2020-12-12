/*

Welcome to Sanatan Time!

JS module that converts the 
currently used christian system 
time to the historic and vedic
sanatan system time.

All the conversion formulas and 
explanation of the conversion system
can be found in the "README.md" file
present with this file.

To use this module, simply add a script
tag with src as "https://sntntime.ga/api.js".

For guidance regarding the module,
kindly read the "README.md" file present with this
file.

Jai Shree Ram!

*/

class SanatanTime
{
    
    constructor(sanatan_time_start)
    {
        if (sanatan_time_start)
        {
            if (sanatan_time_start[0] > 23 || sanatan_time_start[1] > 59)
            {
                return "Invalid Sun Rise (Day Start) Time.";
            }
            this.sanatan_time_start = sanatan_time_start;
        }
        else
        {
            this.sanatan_time_start = [3, 30];
        }
        var christian_current_time = new Date();
        var milliseconds = christian_current_time.getMilliseconds();
        var seconds = christian_current_time.getSeconds() + (milliseconds / 1000);
        var sanatan_converted_time = this.christian_to_sanatan_time(christian_current_time.getHours(), christian_current_time.getMinutes(), seconds);
        this.sanatan_ghadis = sanatan_converted_time[0];
        this.sanatan_pals = sanatan_converted_time[1];
        this.sanatan_lipts = sanatan_converted_time[2];
        this.sanatan_vilipts = sanatan_converted_time[3];
        this.current_sanatan_time = this.sanatan_ghadis + " Ghadis, " + this.sanatan_pals + " Pals, " + this.sanatan_lipts + " Lipts, " + this.sanatan_vilipts + " Vilipts";
    }
    
    hours_difference(start_hour, end_hour)
    {
        if (end_hour >= start_hour)
        {
            return (end_hour - start_hour);
        }
        else
        {
            return (24 - (start_hour - end_hour));
        }
    }
    
    christian_to_sanatan_time(hours, minutes, seconds)
    {
        var minutes_from_day_start = 0;
        if (hours == this.sanatan_time_start[0] && minutes >= this.sanatan_time_start[1])
        {
            minutes_from_day_start = minutes - this.sanatan_time_start[1];
        }
        else
        {
            minutes_from_day_start = (60 - this.sanatan_time_start[1]) + (this.hours_difference(this.sanatan_time_start[0] + 1, hours) * 60) + minutes;
        }
        var ghadis = parseInt(minutes_from_day_start / 24);
        var minutes_from_ghadi_start = minutes_from_day_start % 24;
        var pals = parseInt(((minutes_from_ghadi_start * 60) + seconds) / 24);
        var lipts = parseInt((((minutes_from_ghadi_start * 60) + seconds) % 24) / 0.4);
        var vilipts = parseInt(((((minutes_from_ghadi_start * 60) + seconds) % 24) % 0.4) * 150);
        return [ghadis, pals, lipts, vilipts];
    }
    
    convert(christian_time)
    {
        var milliseconds = christian_time.getMilliseconds();
        var seconds = christian_time.getSeconds() + (milliseconds / 1000);
        var sanatan_converted_time = this.christian_to_sanatan_time(christian_time.getHours(), christian_time.getMinutes(), seconds);
        return sanatan_converted_time[0] + " Ghadis, " + sanatan_converted_time[1] + " Pals, " + sanatan_converted_time[2] + " Lipts, " + sanatan_converted_time[3] + " Vilipts";
    }
    
    toString()
    {
        return this.current_sanatan_time;
    }
    
    getGhadis()
    {
        return this.sanatan_ghadis; 
    }
    
    getPals()
    {
        return this.sanatan_pals; 
    }
    
    getLipts()
    {
        return this.sanatan_lipts; 
    }
    
    getVilipts()
    {
        return this.sanatan_vilipts; 
    }
    
}