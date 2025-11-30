import { db } from '../firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';

// Box-Muller transform to generate normally distributed random numbers
function boxMullerTransform() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function generateNormalData(mean, stdDev, count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        const value = boxMullerTransform() * stdDev + mean;
        data.push(Math.round(value));
    }
    return data;
}

export const seedDatabase = async () => {
    const batch = writeBatch(db);
    const guessesCollection = collection(db, 'guesses');

    try {
        console.log('Seeding database...');

        // Generate 50 'independent' guesses
        const independentGuesses = generateNormalData(1355, 200, 50);
        independentGuesses.forEach(guess => {
            const newDocRef = doc(guessesCollection);
            batch.set(newDocRef, {
                guess: guess,
                group: 'independent',
                timestamp: new Date() // Using client-side timestamp for seeding
            });
        });

        // Generate 50 'social' guesses
        const socialGuesses = generateNormalData(1700, 150, 50);
        socialGuesses.forEach(guess => {
            const newDocRef = doc(guessesCollection);
            batch.set(newDocRef, {
                guess: guess,
                group: 'social',
                timestamp: new Date()
            });
        });

        await batch.commit();
        console.log('Seeding complete. 100 documents written.');

    } catch (error) {
        console.error("Error seeding database: ", error);
    }
};
