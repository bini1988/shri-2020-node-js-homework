const asyncHandler = require('express-async-handler');

/**
 * Добавление сборки в очередь
 */
module.exports = asyncHandler(async (req, res) => {
  const data = await req.app.locals.ci.run(req.params.commitHash);

  res.status(200).json({ data });
});
