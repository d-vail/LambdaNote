const path = require('path');
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');

const { attachmentsRouter } = require('../api/routes/attachments');
const { commentsRouter } = require('../api/routes/comments');
const { projectsRouter } = require('../api/routes/projects');
const { subtasksRouter } = require('../api/routes/subtasks');
const { tagsRouter } = require('../api/routes/tags');
const { tasksRouter } = require('../api/routes/tasks');
const { usersRouter } = require('../api/routes/users');

module.exports = function(server) {
  server.use('/api/attachments', attachmentsRouter);
  server.use('/api/comments', commentsRouter);
  server.use('/api/projects', projectsRouter);
  server.use('/api/subtasks', subtasksRouter);
  server.use('/api/tags', tagsRouter);
  server.use('/api/tasks', tasksRouter);
  server.use('/api/users', usersRouter);
  server.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(
      yamljs.load(path.join(__dirname, '../api/docs/index.yaml')),
      {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Lambda Notes API Documentation'
      }
    )
  );

  server.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Lambda Notes API"}');
  });

  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
};
