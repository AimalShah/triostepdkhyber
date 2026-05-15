import fs from 'fs';
import path from 'path';

const imagesDir = 'd:/Triostrepdkhyber/triostepdkhyber/src/assets/images';
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg.jpeg'));

let imports = '';
let imgMap = 'const ALL_IMAGES = {\n';
let products = 'export const PRODUCTS: Product[] = [\n';

const categories = ['Chelsea Boots', 'Ankle Boots', 'Derby', 'Loafers', 'Sneakers'];
const colors = ['Black', 'Brown', 'Tan', 'White', 'Olive', 'Grey'];
const badges = ['New', 'Bestseller', 'Sale', 'Hot', null];

files.forEach((file, index) => {
    const varName = `img_${file.split('.')[0]}`;
    imports += `import ${varName} from '../assets/images/${file}';\n`;
    imgMap += `  '${file}': (${varName} as any).src || ${varName},\n`;

    const id = index + 1;
    const cat = categories[index % categories.length];
    const col = colors[index % colors.length];
    const badge = badges[index % badges.length];
    const price = 15000 + (index * 500);
    const origPrice = price + (index % 3 === 0 ? 5000 : 0);
    const rating = (4.0 + (index % 10) / 10).toFixed(1);
    const reviews = 20 + (index * 3);
    
    products += `  { id:${id}, name:'Premium ${col} ${cat.slice(0,-1)}', category:'${cat}', color:'${col}', price:${price}, originalPrice:${origPrice}, rating:${rating}, reviews:${reviews}, sizes:[39,40,41,42,43], badge:${badge === null ? 'null' : `'${badge}'`}, sku:'TR-${id.toString().padStart(3, '0')}', inStock:true, image:ALL_IMAGES['${file}'] },\n`;
});

imgMap += '};\n';
products += '];\n';

console.log(imports);
console.log('\n---\n');
console.log(imgMap);
console.log('\n---\n');
console.log(products);
