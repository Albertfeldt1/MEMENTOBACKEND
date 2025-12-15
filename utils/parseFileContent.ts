// import * as fs from 'fs';
// import pdfParse from 'pdf-parse';
// import { parse } from 'csv-parse/sync';
// import * as mammoth from 'mammoth';

// export const parseFileContent = async (filePath: string, mimetype: string) => {
//   const buffer = fs.readFileSync(filePath);

//   if (mimetype.includes('pdf')) {
//     const data = await pdfParse(buffer);
//     return data.text;
//   } else if (
//     mimetype.includes('word') ||
//     mimetype.includes('docx') ||
//     filePath.endsWith('.docx')
//   ) {
//     const result = await mammoth.extractRawText({ buffer });
//     return result.value;
//   } else if (mimetype.includes('csv')) {
//     const csvData = parse(buffer.toString(), { columns: false });
//     return csvData.map((row: any) => row.join(' ')).join('\n');
//   } else if (mimetype.includes('text/plain')) {
//     return buffer.toString();
//   }

//   throw new Error('Unsupported file type');
// };
