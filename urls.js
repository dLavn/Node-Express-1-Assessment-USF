//run these installs in ubuntu first:
//npm init -y
//npm install axios

const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Read command line arguments
const [,, filename] = process.argv;

if (!filename) {
  console.error("Error: No filename provided");
  process.exit(1);
}

// Read the contents of the file
fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }

  const urls = data.trim().split('\n');
  const downloadPromises = urls.map(downloadUrl);

//Handle the download and write to files concurrently:
  Promise.all(downloadPromises)
    .then(results => {
      results.forEach(result => {
        if (result.error) {
          console.error(`Couldn't download ${result.url}: ${result.error.message}`);
        } else {
          console.log(`Wrote to ${result.hostname}`);
        }
      });
    })
    .catch(err => {
      console.error(`Error during download process: ${err.message}`);
    });
});

//Define the downloadUrl function:
async function downloadUrl(url) {
  try {
    const response = await axios.get(url);
    const hostname = new URL(url).hostname;
    const filePath = path.join(__dirname, hostname);

    await fs.promises.writeFile(filePath, response.data);
    return { url, hostname };
  } catch (error) {
    return { url, error };
  }
}

//run this in ubuntu to run the whole script
//node urls.js urls.txt

