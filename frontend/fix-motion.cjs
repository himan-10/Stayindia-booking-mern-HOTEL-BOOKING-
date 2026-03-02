const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src').filter(f => f.endsWith('.jsx'));
let fixed = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Check if motion is used but not imported
    if (content.match(/<motion\./) && !content.match(/import\s+\{.*motion.*\}\s+from\s+['"]framer-motion['"]/)) {

        // If AnimatePresence is already imported, replace it to include motion
        if (content.match(/import\s+\{\s*AnimatePresence\s*\}\s+from\s+['"]framer-motion['"]/)) {
            content = content.replace(
                /import\s+\{\s*AnimatePresence\s*\}\s+from\s+['"]framer-motion['"];?/,
                '/* eslint-disable-next-line no-unused-vars */\nimport { motion, AnimatePresence } from \'framer-motion\';'
            );
        } else {
            // Find the last import and add it after
            const lastImportIndex = content.lastIndexOf('import ');
            const endOfLine = content.indexOf('\n', lastImportIndex);

            if (endOfLine !== -1) {
                const before = content.slice(0, endOfLine + 1);
                const after = content.slice(endOfLine + 1);
                content = before + "/* eslint-disable-next-line no-unused-vars */\nimport { motion } from 'framer-motion';\n" + after;
            } else {
                content = "/* eslint-disable-next-line no-unused-vars */\nimport { motion } from 'framer-motion';\n" + content;
            }
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed ' + file);
        fixed++;
    }
});

console.log(`Fixed ${fixed} files.`);
