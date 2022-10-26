const validInputs = ['gal', 'L', 'mi', 'km', 'kg', 'lbs']

const unitConversion = {
  'gal': 'L', 'l': 'gal',
  'mi': 'km', 'km': 'mi',
  'kg': 'lbs', 'lbs': 'kg'
}

const spell = { 'gal': 'gallons', 'l': 'liters', 'mi': 'miles', 'km': 'kilometers', 'lbs': 'pounds', 'kg': 'kilograms' }

module.exports = { validInputs, unitConversion, spell }