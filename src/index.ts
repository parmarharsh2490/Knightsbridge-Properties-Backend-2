import app from './app';
import { PORT } from './constants';
import logger from './utils/logger';

app.listen(PORT, () => {
  logger.info(`dialoft-ai-backend running on port ${PORT}`);
});
