const redisClient = require('../../libs/redis');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path')

const userData = () => {
    return new Promise(async(resolve, reject)=> {
        const response = await redisClient.get('users');
        let users = JSON.parse(response)
        const gpFavTeam = groupByFavTeam(users)
        const telecom = await filterByTelecom(await convertToName(users))
        const country = await filterByCountry(users)
        console.log(country)
        const gpCountry = await groupByCountry(country)
        let favTeamLength ={};
        let gpByCountry={}
        for(const team in gpFavTeam){
            if(gpFavTeam.hasOwnProperty(team)){
                favTeamLength[team] = gpFavTeam[team].length
            }
        }
        for(const item in gpCountry){
            if(gpCountry.hasOwnProperty(item)){
                gpByCountry[item] = gpCountry[item].length
            }
        }
        if(users.length > 0){
            resolve({
                favTeam: favTeamLength,
                telecom: {
                    ATOM: telecom.ATOM.length,
                    OOREDOO: telecom.OOREDOO.length,
                    MYTEL: telecom.MYTEL.length,
                    MPT: telecom.MPT.length,
                    OTHER: telecom.OTHER.length
                },
                country: gpByCountry
            })
        }else{
            reject('There no users.')
        }
    })
}
const convertToName = (data) => {
    return new Promise(async(resolve, reject) => {
        resolve(data.map(item=> {
            return {
                name: item['5751'],
                phone: item['5752'],
                favTeam: item.operator,
            }
        }))
    })
}
const filterByTelecom = (data) => {
    return new Promise(async(resolve, reject) => {
        const groupNumbers = {
            'ATOM':[],
            "OOREDOO":[],
            "MYTEL": [], 
            "MPT": [],
            "OTHER":[]
        }
        for(const user of data){
            if(typeof user.phone === "string"){
                if(user.phone.startsWith('9597') || user.phone.startsWith('097')){
                    groupNumbers['ATOM'].push({ phone: user.phone, operator: 'ATOM' })
                }else  if(user.phone.startsWith('9599') || user.phone.startsWith('099')){
                    groupNumbers["OOREDOO"].push({ phone: user.phone, operator: 'OOREDOO' })
                } if(user.phone.startsWith('9596') || user.phone.startsWith('096')){
                    groupNumbers['MYTEL'].push({ phone: user.phone, operator: 'MYTEL' })
                } if((user.phone.startsWith('9594') || user.phone.startsWith('094')) || user.phone.startsWith('9592') || user.phone.startsWith('092') || user.phone.startsWith('9598') || user.phone.startsWith('098')){
                    groupNumbers['MPT'].push({ phone: user.phone, operator: 'MPT' })
                }else{
                    groupNumbers['OTHER'].push({ phone: user.phone, operator: 'OTHER' })
                }
            }
        }
        resolve(groupNumbers)
    })
}

const groupByFavTeam = (data) => {
    return data.reduce((acc, item) => {
        // Check if the username key exists in the accumulator
        if (!acc[item['5753']]) {
            acc[item['5753']] = [];
        }
        // Push the current item into the array for that username
        acc[item[5753]].push(item);
        return acc;
        }, {});
}
const filterByCountry = (data) => {
    return new Promise(async(resolve, reject)=> {
        let countries = [];
        for(const item of data){
            const countryByPh = await getCountryByPhoneNumber(item['5752'])
            countries.push({name: item['5751'], phone: item['5752'], country: countryByPh})
        }
        resolve(countries)
    })
}
// Function to get country name by phone number
function getCountryByPhoneNumber(phoneNumber) {
    return new Promise(async(resolve, reject) => {
        const countryCodeMap = {
            "1": "United States/Canada",
            "7": "Russia/Kazakhstan",
            "20": "Egypt",
            "27": "South Africa",
            "30": "Greece",
            "31": "Netherlands",
            "32": "Belgium",
            "33": "France",
            "34": "Spain",
            "36": "Hungary",
            "39": "Italy",
            "40": "Romania",
            "41": "Switzerland",
            "43": "Austria",
            "44": "United Kingdom",
            "45": "Denmark",
            "46": "Sweden",
            "47": "Norway",
            "48": "Poland",
            "49": "Germany",
            "51": "Peru",
            "52": "Mexico",
            "53": "Cuba",
            "54": "Argentina",
            "55": "Brazil",
            "56": "Chile",
            "57": "Colombia",
            "58": "Venezuela",
            "60": "Malaysia",
            "61": "Australia",
            "62": "Indonesia",
            "63": "Philippines",
            "64": "New Zealand",
            "65": "Singapore",
            "66": "Thailand",
            "81": "Japan",
            "82": "South Korea",
            "84": "Vietnam",
            "86": "China",
            "90": "Turkey",
            "91": "India",
            "92": "Pakistan",
            "93": "Afghanistan",
            "94": "Sri Lanka",
            "95": "Myanmar",
            "211": "South Sudan",
            "212": "Morocco",
            "213": "Algeria",
            "216": "Tunisia",
            "218": "Libya",
            "220": "Gambia",
            "221": "Senegal",
            "222": "Mauritania",
            "223": "Mali",
            "224": "Guinea",
            "225": "Ivory Coast",
            "226": "Burkina Faso",
            "227": "Niger",
            "228": "Togo",
            "229": "Benin",
            "230": "Mauritius",
            "231": "Liberia",
            "232": "Sierra Leone",
            "233": "Ghana",
            "234": "Nigeria",
            "235": "Chad",
            "236": "Central African Republic",
            "237": "Cameroon",
            "238": "Cape Verde",
            "239": "Sao Tome and Principe",
            "240": "Equatorial Guinea",
            "241": "Gabon",
            "242": "Republic of the Congo",
            "243": "Democratic Republic of the Congo",
            "244": "Angola",
            "245": "Guinea-Bissau",
            "246": "British Indian Ocean Territory",
            "247": "Ascension Island",
            "248": "Seychelles",
            "249": "Sudan",
            "250": "Rwanda",
            "251": "Ethiopia",
            "252": "Somalia",
            "253": "Djibouti",
            "254": "Kenya",
            "255": "Tanzania",
            "256": "Uganda",
            "257": "Burundi",
            "258": "Mozambique",
            "260": "Zambia",
            "261": "Madagascar",
            "262": "Reunion",
            "263": "Zimbabwe",
            "264": "Namibia",
            "265": "Malawi",
            "266": "Lesotho",
            "267": "Botswana",
            "268": "Swaziland",
            "269": "Comoros",
            "290": "Saint Helena",
            "291": "Eritrea",
            "297": "Aruba",
            "298": "Faroe Islands",
            "299": "Greenland",
            "350": "Gibraltar",
            "351": "Portugal",
            "352": "Luxembourg",
            "353": "Ireland",
            "354": "Iceland",
            "355": "Albania",
            "356": "Malta",
            "357": "Cyprus",
            "358": "Finland",
            "359": "Bulgaria",
            "370": "Lithuania",
            "371": "Latvia",
            "372": "Estonia",
            "373": "Moldova",
            "374": "Armenia",
            "375": "Belarus",
            "376": "Andorra",
            "377": "Monaco",
            "378": "San Marino",
            "379": "Vatican City",
            "380": "Ukraine",
            "381": "Serbia",
            "382": "Montenegro",
            "383": "Kosovo",
            "385": "Croatia",
            "386": "Slovenia",
            "387": "Bosnia and Herzegovina",
            "389": "North Macedonia",
            "420": "Czech Republic",
            "421": "Slovakia",
            "423": "Liechtenstein",
            "500": "Falkland Islands",
            "501": "Belize",
            "502": "Guatemala",
            "503": "El Salvador",
            "504": "Honduras",
            "505": "Nicaragua",
            "506": "Costa Rica",
            "507": "Panama",
            "508": "Saint Pierre and Miquelon",
            "509": "Haiti",
            "590": "Saint Barthélemy",
            "591": "Bolivia",
            "592": "Guyana",
            "593": "Ecuador",
            "594": "French Guiana",
            "595": "Paraguay",
            "596": "Martinique",
            "597": "Suriname",
            "598": "Uruguay",
            "599": "Curaçao",
            "670": "East Timor",
            "672": "Australian External Territories",
            "673": "Brunei",
            "674": "Nauru",
            "675": "Papua New Guinea",
            "676": "Tonga",
            "677": "Solomon Islands",
            "678": "Vanuatu",
            "679": "Fiji",
            "680": "Palau",
            "681": "Wallis and Futuna",
            "682": "Cook Islands",
            "683": "Niue",
            "685": "Samoa",
            "686": "Kiribati",
            "687": "New Caledonia",
            "688": "Tuvalu",
            "689": "French Polynesia",
            "690": "Tokelau",
            "691": "Micronesia",
            "692": "Marshall Islands",
            "850": "North Korea",
            "852": "Hong Kong",
            "853": "Macau",
            "855": "Cambodia",
            "856": "Laos",
            "880": "Bangladesh",
            "886": "Taiwan",
            "960": "Maldives",
            "961": "Lebanon",
            "962": "Jordan",
            "963": "Syria",
            "964": "Iraq",
            "965": "Kuwait",
            "966": "Saudi Arabia",
            "967": "Yemen",
            "968": "Oman",
            "970": "Palestine",
            "971": "United Arab Emirates",
            "972": "Israel",
            "973": "Bahrain",
            "974": "Qatar",
            "975": "Bhutan",
            "976": "Mongolia",
            "977": "Nepal",
            "992": "Tajikistan",
            "993": "Turkmenistan",
            "994": "Azerbaijan",
            "995": "Georgia",
            "996": "Kyrgyzstan",
            "998": "Uzbekistan"
        };
        // Remove non-numeric characters
        if(typeof phoneNumber === 'string'){
            // const cleanedNumber = phoneNumber.replace(/\D/g, '');
            for (let code in countryCodeMap) {
                if(phoneNumber.startsWith(code)){
                    resolve(countryCodeMap[code])
                }
            }
        }
        resolve(countryCodeMap['95'])
    })
}
const groupByCountry = (data) => {
    return new Promise(async(resolve, reject) => {
        resolve(data.reduce((acc, item) => {
            // Check if the username key exists in the accumulator
            if (!acc[item.country]) {
                acc[item.country] = [];
            }
            // Push the current item into the array for that username
            acc[item.country].push(item);
            return acc;
            }, {}))
    })
}

const importCustomerCSV = (req, res) => {
    const results = [];
        if(!req.file){
            return res.status(400).json({
                status: false,
                message: "No file uploaded."
            })
        }
        const filePath = path.join(__dirname, '../../' ,req.file.path);
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('headers', (headers) => {
          })
          .on('data', (row) => {
            // Process each row here
            const combinedObject = {};
            Object.keys(row).forEach(key => {
              combinedObject[key.trim()] = row[key].trim();
            });
            results.push(combinedObject);
          })
          .on('end', () => {
            // Optionally remove the file after processing
            fs.unlinkSync(filePath);
            console.log(results.length)
            res.json(results);
          })
          .on('error', (error) => {
            console.error('Error while reading the CSV file:', error);
            res.status(500).send('Error while processing the file.');
          });
}

module.exports = {
    userData,
    importCustomerCSV
}