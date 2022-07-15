
const fs = require('fs');
const yaml = require('js-yaml');

config = {
    data:{},
    init: function() {
        try {
            let fileContents = fs.readFileSync('./config/config.yaml', 'utf8');
            this.data = yaml.load(fileContents);
        } catch (e) {
            console.log(e);
        }
    }
};

module.exports = config;