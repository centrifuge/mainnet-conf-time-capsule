import { HttpFunction } from '@google-cloud/functions-framework';
import getCronJobStatus from './getCronJobStatus';
import getQueuedTimeCapsules from './getQueuedTimeCapsules';
import handleMint from './handleMint';
import toggleCronJobStatus from './toggleCronJobStatus';
import updateFirestore from './updateFirestore';

/* eslint-disable no-await-in-loop */
export const mintTimeCapsules: HttpFunction = async (request, response) => {
  console.log('Running!');

  try {
    const cronJobStatus = await getCronJobStatus();

    if (!cronJobStatus) {
      await toggleCronJobStatus(true);
      const queuedTimeCapsules = await getQueuedTimeCapsules();

      // eslint-disable-next-line no-restricted-syntax
      for (const timeCapsule of queuedTimeCapsules) {
        const { id, polygonAddress } = timeCapsule;

        console.log(`minting ${id}`);

        const { hash, wait } = await handleMint(polygonAddress, id);

        await updateFirestore(id, null, hash);

        const { status } = await wait();

        await updateFirestore(id, status);
        console.log(`minted ${id}`);
      }

      await toggleCronJobStatus(false);
    }

    response.send('Success').sendStatus(200);
  } catch (error) {
    await toggleCronJobStatus(false);
    console.log('Error:', error);
    response.send('Error').sendStatus(200);
  }
};
