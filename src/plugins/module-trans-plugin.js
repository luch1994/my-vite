const path = require('path');
module.exports = {
    transform(ctx, code) {
        return code.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
            if (s1[0] !== "." && s1[1] !== "/") {
                const module = require(path.join(ctx.root, 'node_modules', s1, 'package.json')).module;
                return ` from '/node_modules/${s1}/${module}'`;
            } else {
                return s0;
            }
        });
    }
}