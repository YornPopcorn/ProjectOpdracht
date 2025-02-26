import * as readline from 'readline';
import { readFile } from 'fs/promises';
import { guitars } from './interfaces';

// Functie om JSON data asynchroon te laden
async function loadData(): Promise<guitars[]> {
    const rawData = await readFile('gitaren.json', 'utf-8');
    return JSON.parse(rawData).map((guitar: any) => ({
        ...guitar,
        usageDate: new Date(guitar.usageDate)
    })) as guitars[];
}

// Functie om alle gitaren weer te geven
function viewAllData(data: guitars[]): void {
    console.log('\nAvailable Guitars:\n');
    data.forEach(guitar => {
        console.log(`- ${guitar.name} (ID: ${guitar.id})`);
    });
    console.log('');
}

// Functie om gitaren te filteren op ID en details te tonen
function filterById(data: guitars[], id: number): void {
    const guitar = data.find(item => item.id === id);
    if (guitar) {
        console.log(`\n- ${guitar.name} (ID: ${guitar.id})`);
        console.log(`  - Description: ${guitar.description}`);
        console.log(`  - Age: ${guitar.age}`);
        console.log(`  - Active: ${guitar.active}`);
        console.log(`  - Usage Date: ${guitar.usageDate.toDateString()}`);
        console.log(`  - Image URL: ${guitar.imageURL}`);
        console.log(`  - Type: ${guitar.type}`);
        console.log(`  - Genre: ${guitar.genre.join(', ')}`);
        console.log('  - Brand Details: ');
        console.log(`    - Name: ${guitar.brand.brandName}`);
        console.log(`    - Website: ${guitar.brand.website}`);
        console.log(`    - Country: ${guitar.brand.country}`);
        console.log(`    - ID: ${guitar.brand.id}`);
        console.log(`    - Year Founded: ${guitar.brand.yearFounded}\n`);
    } else {
        console.log('\nNo guitar found with the given ID.\n');
    }
}

// Functie om menu weer te geven
function showMenu(): void {
    console.log('Welcome to the Guitars JSON Viewer!');
    console.log('\n1. View all guitars');
    console.log('2. Filter by ID');
    console.log('3. Exit\n');
}

// Hoofdprogramma UI
async function main() {
    const data = await loadData();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function promptUser(): void {
        showMenu();
        rl.question('Please select an option: ', choice => {
            switch (choice) {
                case '1':
                    viewAllData(data);
                    promptUser();
                    break;
                case '2':
                    rl.question('Enter the ID of the guitar you want to filter by: ', inputId => {
                        const id = parseInt(inputId, 10);
                        if (isNaN(id)) {
                            console.log('\nInvalid input. Please enter a valid number.\n');
                        } else {
                            filterById(data, id);
                        }
                        promptUser();
                    });
                    break;
                case '3':
                    console.log('Goodbye!');
                    rl.close();
                    break;
                default:
                    console.log('Invalid choice. Please pick 1, 2, or 3.\n');
                    promptUser();
                    break;
            }
        });
    }

    promptUser();
}

// Start de applicatie
main().catch(error => {
    console.error('An error occurred:', error);
});