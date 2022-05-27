import { Pipe, PipeTransform } from '@angular/core';
import {JobFilterInputs} from "../models/job-filter-inputs.model";
import {Job} from "../models/job.model";

@Pipe({
  name: 'filterJobs',
  pure: false
})
export class FilterJobsPipe implements PipeTransform {

  transform(value: Job[], filterInputs: JobFilterInputs): Job[] {
    if(value.length === 0 || !filterInputs) {
      return value;
    }

    let resultArray: Job[] = [];
    let valueCopy: Job[] = value;
    let wasFilteredOnce: boolean = false;

    if(filterInputs.industry.length !== 0){
      for(let job of valueCopy){
        if(filterInputs.industry.includes(job.industry))
          resultArray.push(job);
      }
      valueCopy = resultArray;
      wasFilteredOnce = true;
    }

    if (filterInputs.experience.length !== 0) {
      if(!wasFilteredOnce) {
        for (let job of valueCopy) {
          if (filterInputs.experience.includes(job.experience) && !resultArray.includes(job))
            resultArray.push(job);
        }
        wasFilteredOnce = true;
      }
      else {
        for (let job of valueCopy) {
          if (!filterInputs.experience.includes(job.experience))
            resultArray.splice(resultArray.indexOf(job), 1);
        }
      }
      valueCopy = resultArray;
    }

    if (filterInputs.program.length !== 0) {
      if(!wasFilteredOnce) {
        for (let job of valueCopy) {
          if (filterInputs.program.includes(job.program) && !resultArray.includes(job))
            resultArray.push(job);
        }
        wasFilteredOnce = true;
      }
      else {
        for (let job of valueCopy) {
          if (!filterInputs.program.includes(job.program))
            resultArray.splice(resultArray.indexOf(job), 1);
        }
      }
      valueCopy = resultArray;
    }

    if (filterInputs.location.length !== 0) {
      if(!wasFilteredOnce) {
        for (let job of valueCopy) {
          if (filterInputs.location.includes(job.location) && !resultArray.includes(job))
            resultArray.push(job);
        }
        wasFilteredOnce = true;
      }
      else {
        for (let job of valueCopy) {
          if (!filterInputs.location.includes(job.location))
            resultArray.splice(resultArray.indexOf(job), 1);
        }
      }
      valueCopy = resultArray;
    }

    if (filterInputs.undefinedPeriod) {
      if(!wasFilteredOnce) {
        for (let job of valueCopy) {
          if (job.undefinedPeriod)
            resultArray.push(job);
        }
        wasFilteredOnce = true;
      }
      else {
        for (let job of valueCopy) {
          if (!job.undefinedPeriod)
            resultArray.splice(resultArray.indexOf(job), 1);
        }
      }
      valueCopy = resultArray;
    }

    else {
      if(!wasFilteredOnce) {
        for (let job of valueCopy) {
          if (job.period === filterInputs.period)
            resultArray.push(job);
        }
        wasFilteredOnce = true;
      }
      else {
        for (let job of valueCopy) {
          if (job.period !== filterInputs.period)
            resultArray.splice(resultArray.indexOf(job), 1);
        }
      }
      valueCopy = resultArray;
    }

    if (filterInputs.currency.valueOf() !== 2) {
      if(!wasFilteredOnce) {
        for (let job of valueCopy) {
          if (job.currency === filterInputs.currency)
            resultArray.push(job);
        }
        wasFilteredOnce = true;
      }
      else {
        for (let job of valueCopy) {
          if (job.currency !== filterInputs.currency)
            resultArray.splice(resultArray.indexOf(job), 1);
        }
      }
      valueCopy = resultArray;
    }

    if (filterInputs.salaryLowerRange !== null) {
      if(!wasFilteredOnce) {
        for (let job of valueCopy) {
          if (job.salaryLowerRange >= filterInputs.salaryLowerRange)
            resultArray.push(job);
        }
        wasFilteredOnce = true;
      }
      else {
        for (let job of valueCopy) {
          if (job.salaryLowerRange < filterInputs.salaryLowerRange)
            resultArray.splice(resultArray.indexOf(job), 1);
        }
      }
      valueCopy = resultArray;
    }

    return resultArray;
  }

}
