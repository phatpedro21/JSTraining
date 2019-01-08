/////////////////////////////////////////////////
//  ES6 MODULES CURRENTLY NOT SUPPORTED BY DEFAULT
//  MUST CALL WITH THE --experimental-modules arg
//  AND FILES MUST END WITH .mjs
/////////////////////////////////////////////////


//Import 'fetches' the exposed variables
//we can assign alias to imported var
import {projectID as ID, projectName} from './module1.mjs';


console.log(`${ID} : ${projectName}`);