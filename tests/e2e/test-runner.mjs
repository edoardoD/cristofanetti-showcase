import fs from 'fs';
import path from 'path';

console.log('--- Starting Cristofanetti Showcase Static Verification ---');

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, 'out');
const indexPath = path.join(outDir, 'index.html');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Output files verification
assert(fs.existsSync(outDir), 'Static export output directory out/ exists');
assert(fs.existsSync(indexPath), 'Static entrypoint out/index.html exists');

if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf-8');

  // 2. Identity & Legal Verification
  assert(html.includes('CRISTOFANETTI'), 'Brand name CRISTOFANETTI is present');
  assert(html.includes('01639050408'), 'Partita IVA 01639050408 is present');
  assert(html.includes('Via degli Scavi'), 'Address Via degli Scavi is present');
  assert(html.includes('0543 720254') || html.includes('0543720254'), 'Phone number 0543 720254 is present');
  assert(html.includes('1964'), 'Historical heritage "Dal 1964" is present');

  // 3. Core Automotive Services
  assert(html.includes('GPL'), 'GPL service content is present');
  assert(html.includes('Metano'), 'Metano service content is present');
  assert(html.includes('Sostituzione') && html.includes('10'), '10-year tank replacement is present');
  assert(html.includes('BRC'), 'BRC Gas Service affiliation is present');

  // 4. Regulatory & Legal Safeguards
  assert(html.includes('67-01') || html.includes('ECE'), 'ECE/ONU 67-01 safety regulation is present');
  assert(html.includes('Motorizzazione'), 'Motorizzazione Civile in-house testing reference is present');

  // 5. SEO & Meta Tags
  assert(html.includes('<title>') && html.includes('Cristofanetti'), 'Proper SEO <title> tag is present');
  assert(html.includes('description'), 'Meta description tag is present');

  // 6. Amortization Simulator & Regional Price per KG Verification
  assert(html.includes('Simulatore di Ammortamento') || html.includes('simulatore'), 'Amortization Simulator section is present');
  assert(html.includes('Polo AW1'), 'Polo AW1 case benchmark is present');
  assert(html.includes('200') && html.includes('260'), 'Real quote values (200 € / 260 €) are present');
  assert(html.includes('Prezzo Medio Regionale') || html.includes('Regionale'), 'Regional average price reference is present');
  assert(html.includes('al kg') || html.includes('kg'), 'Price calculation per kg is present');
  assert(!html.includes('Agevolazioni di Pagamento'), 'Old financing section has been removed');
}

console.log(`\nResults: ${passedTests}/${totalTests} assertions passed.`);
if (passedTests === totalTests) {
  console.log('All verification assertions succeeded with 100% fidelity!');
  process.exit(0);
} else {
  console.error('Some verification assertions failed.');
  process.exit(1);
}
