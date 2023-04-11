import { nanoid } from 'nanoid';
import fs from 'fs';
import { getScoresByDate } from './scores_service';

const dbPath = 'interests.json';
const interests = ['football', 'rally', 'spa', 'hbo', 'kumpir', 'eevee', 'angora_cat', 'taco'];
const descriptions = {
    'football': 'Football is played with 2 teams',
    'rally': 'Rally is a cool motorsport',
    'spa': 'A nice tech for frontend',
    'hbo': 'Good shows are here!',
    'kumpir': 'Delicious Turkish meal',
    'eevee': 'A cute pokemon',
    'angora_cat': 'White cat breed from Ankara',
    'taco': 'Mexican food'
};

export function initDatabase() {
    if(!fs.existsSync(dbPath)) {
        const initDb = [];
        interests.forEach(key => {
            const id = nanoid(5);
            initDb.push( { id: id, name: key, description: descriptions[key], path: `${process.cwd()}/static/images/${key}.jpg` } );
        });
        fs.writeFile(dbPath, JSON.stringify(initDb), (err) => {
            console.log(err);
        });
    }    
}

export async function getInterests() {
    const data = await fs.readFileSync(dbPath);
    if(!data) throw new Error(err);
        
    return JSON.parse(data);
}

export async function getPopularityReport(dateType) {
    try {
        const interests = await getInterests();
        const scores = await getScoresByDate(dateType);
        const scoreMap = {};
        
        scores.forEach(score => {
            if(!scoreMap[score.interestId]) scoreMap[score.interestId] = 1;
            else scoreMap[score.interestId] += 1; 
        });
    
        return interests.map(interest => {
            return { ...interest, score: scoreMap[interest.id] ?? 0 };
        });
    }
    catch(err) {
        throw new Error(err);
    }
}



