import { nanoid } from 'nanoid';
import fs from 'fs';

const dbPath = 'scores.txt';

export function addScore(interestId) {
    const epoch = Date.now();
    const id = nanoid(10);
    const data = { id: id, interestId: interestId, epoch: epoch };
    fs.writeFile(dbPath, `${JSON.stringify(data)}\n`, { flag: 'a' }, (err) => { if(err) console.log(err) } );
    return { message: "success" }
}

async function getScores() {
    try {
        const data = await fs.readFileSync(dbPath);
        const resultData = [];
        if(!data) throw new Error(err);
    
        data.toString().split('\n').filter(dt => dt && dt !== '').forEach(dt => resultData.push(JSON.parse(dt)));
        return resultData;
    }
    catch(err) { 
        // throw new Error(err);
    }
}

export async function getAllScores() {
    try {
        const data = await getScores();
        return data;
    }
    catch(e) {
        throw new Error(err);
    }
}

export async function getScoresByDate(dateType) {
    try {
        const data = await getScores();
        const date = new Date();
        switch(dateType) {
            case 'week': date.setDate(date.getDay() - 7); break;
            case 'month': date.setMonth(date.getMonth() - 1); break;
            case 'year': date.setFullYear(date.getFullYear() - 1); break;
        }
    
        return data.filter(dt => dt.epoch > date.getTime());
    }
    catch(err) {
        throw new Error(err);
    }
}
