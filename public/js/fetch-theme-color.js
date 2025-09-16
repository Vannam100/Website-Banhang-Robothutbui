const fs = require('fs');
// read theme color from _data/site.json
fs.readFile('./data/theme.json', 'utf8', function (err, dataFile) {
  if (err) {
    console.log(err);
    return;
  }

  // parse file to JSON so that the variables can be accessed
  dataFile = JSON.parse(dataFile);

  // TODO: Check if dataFile.primary_theme_color is set
  // Open variables.scss and search/replace "$theme: ..." with color from data file
  fs.readFile(
    './assets/style/_variables.scss',
    'utf-8',
    function (err, scssFile) {
      if (err) {
        console.log(err);
        return;
      }

      var replaced = scssFile;

      // Change the variables to whatever was set in the data file

      if (dataFile.color_main) {
        const replacementString = dataFile.color_main;
        replaced = replaced.replace(
          /\--color-main: .*/g,
          '--color-main: ' + replacementString + ';'
        );
      }
      if (dataFile.color_main_300) {
        const replacementString = dataFile.color_main_300;
        replaced = replaced.replace(
          /\--color-main-300: .*/g,
          '--color-main-300: ' + replacementString + ';'
        );
      }
      if (dataFile.color_secondary) {
        const replacementString = dataFile.color_secondary;
        replaced = replaced.replace(
          /\--color-secondary: .*/g,
          '--color-secondary: ' + replacementString + ';'
        );
      }
      if (dataFile.color_white) {
        const replacementString = dataFile.color_white;
        replaced = replaced.replace(
          /\--color-white: .*/g,
          '--color-white: ' + replacementString + ';'
        );
      }

      // Write result back to variables.scss
      fs.writeFile(
        './assets/style/_variables.scss',
        replaced,
        'utf-8',
        function (err) {
          console.log(replaced);
          if (err) {
            console.log(err);
          }
        }
      );
    }
  );
});