import * as Koa from 'koa';
import * as compress from 'koa-compress';
import * as logger from 'koa-logger';
import * as serve from 'koa-static';
import * as views from 'koa-views';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

import { config } from './config';
import { routes } from './routes';

const app = new Koa();

app.on('error', (err) => {
    console.log(err);
});

app.use(logger());

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join('src', 'views')));

app.use(
    views(path.join('src', 'views'), {
        map: { html: 'nunjucks' },
        extension: 'html',
        options: {
            nunjucksEnv: env
        }
    })
);

app.use(routes);

app.use(serve('public'));

// Compress
app.use(compress());

app.listen(config.port);

console.log(`Server running on port ${config.port}`);
