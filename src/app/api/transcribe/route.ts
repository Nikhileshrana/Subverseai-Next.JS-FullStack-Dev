import { NextApiRequest, NextApiResponse } from 'next';
import { Deepgram, TranscriptionOptions } from '@deepgram/sdk';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const readFile = promisify(fs.readFile);

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const deepgram = new Deepgram(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || '');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = new IncomingForm();

  form.uploadDir = path.resolve('./public/uploads');
  form.keepExtensions = true;

  form.parse(req, async (err: any, fields: any, files: { file: any[]; }) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing the file' });
    }

    const file = files.file[0];

    try {
      const buffer = await readFile(file.filepath);

      const options: TranscriptionOptions = {
        buffer: buffer,
        mimetype: file.mimetype,
      };

      const response = await deepgram.transcription.preRecorded(options, {
        model: 'nova-2',
        smart_format: true,
        language: 'en-IN',
        diarize: true,
        paragraphs: true,
        punctuate: true,
        utterances: true,
        numerals: true,
      });

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Error transcribing the file', error });
    } finally {
      fs.unlinkSync(file.filepath); // Remove the uploaded file
    }
  });
};

export default handler;
