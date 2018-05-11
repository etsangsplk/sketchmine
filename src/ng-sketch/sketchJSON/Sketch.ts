import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';
import { createDir, writeJSON, delFolder, parseArchive } from './helpers/util';
import { Page } from "./models/Page";
import { Document } from "./models/Document";
import { Meta } from "./models/Meta";
import { IPage } from './interfaces/Page';
import { IDocument } from './interfaces/Document';
import { IMeta } from './interfaces/Meta';
import { SymbolMaster } from './models/SymbolMaster';
import { Group } from './models/Group';
import { IBounding } from './interfaces/Base';
import { Rectangle } from './models/Rectangle';
import { ShapeGroup } from './models/ShapeGroup';
import { Style } from './models/Style';
import { Text } from './models/Text';
export class Sketch {
  private static _folder = 'dt-asset-lib';

  write(pages: Page[]) {
    // const size: IBounding = {height: 32, width: 136, x: 0, y: 0};
    // const pages = [new Page(size)];
    // const symbols = new SymbolMaster(size);
    // const group = new Group(size, 'dt-button');
    // const shapeGroup = new ShapeGroup(size);
    // const rect = new Rectangle({height: size.height, width: size.width, cornerRadius: 3});
    // const text = new Text(size, 'aölskdjfölkajsdf', 'button--text');

    // const size2: IBounding = {height: 32, width: 136, x: 150, y: 0};
    // const symbols2 = new SymbolMaster(size2);
    // const group2 = new Group(size, 'dt-button2');
    // const shapeGroup2 = new ShapeGroup(size2);
    // const rect2 = new Rectangle({height: size.height, width: size.width, cornerRadius: 15});


    // const style2 = new Style();
    // style2.addBorder('#454545', 3);
    // style2.addColorFill('#00a1b2');
    // shapeGroup2.style = style2.generateObject();

    // shapeGroup.name = 'Background';

    // const style = new Style();
    // style.addBorder('#454545', 3);
    // style.addColorFill('#00a1b2');
    // shapeGroup.style = style.generateObject();

    // const b64 = 'YnBsaXN0MDDUAQIDBAUGa2xYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoK8QHQcIDxAeHyAhIi4xNzs\/R0hJSktPU19gYWJjZGZnVSRudWxs0wkKCwwNDlhOU1N0cmluZ1YkY2xhc3NcTlNBdHRyaWJ1dGVzgAKAHIADXlByaW1hcnkgYnV0dG9u0xESChMYHVdOUy5rZXlzWk5TLm9iamVjdHOkFBUWF4AEgAWABoAHpBkaGxyACIAMgBSAG4AaXxAQTlNQYXJhZ3JhcGhTdHlsZV8QH01TQXR0cmlidXRlZFN0cmluZ0ZvbnRBdHRyaWJ1dGVfECpNU0F0dHJpYnV0ZWRTdHJpbmdDb2xvckRpY3Rpb25hcnlBdHRyaWJ1dGVWTlNLZXJu1iMkJSYKJygpKissK18QEk5TUGFyYWdyYXBoU3BhY2luZ1pOU1RhYlN0b3BzW05TQWxpZ25tZW50XE5TVGV4dEJsb2Nrc1tOU1RleHRMaXN0cyNAIAAAAAAAAIAAEAKACYALgAnSEgovMKCACtIyMzQ1WiRjbGFzc25hbWVYJGNsYXNzZXNXTlNBcnJheaI0NlhOU09iamVjdNIyMzg5XxAXTlNNdXRhYmxlUGFyYWdyYXBoU3R5bGWjODo2XxAQTlNQYXJhZ3JhcGhTdHlsZdIKPD0+XxAaTlNGb250RGVzY3JpcHRvckF0dHJpYnV0ZXOAE4AN0xESCkBDRqJBQoAOgA+iREWAEIARgBJfEBNOU0ZvbnRTaXplQXR0cmlidXRlXxATTlNGb250TmFtZUF0dHJpYnV0ZSNALAAAAAAAAF8QE0Jlcm5pbmFTYW5zLVJlZ3VsYXLSMjNMTV8QE05TTXV0YWJsZURpY3Rpb25hcnmjTE42XE5TRGljdGlvbmFyedIyM1BRXxAQTlNGb250RGVzY3JpcHRvcqJSNl8QEE5TRm9udERlc2NyaXB0b3LTERIKVFkdpFVWV1iAFYAWgBeAGKRaWlpagBmAGYAZgBmAGlNyZWRVYWxwaGFUYmx1ZVVncmVlbiM\/8AAAAAAAANIyM05lok42IwAAAAAAAAAA0jIzaGlfEBJOU0F0dHJpYnV0ZWRTdHJpbmeiajZfEBJOU0F0dHJpYnV0ZWRTdHJpbmdfEA9OU0tleWVkQXJjaGl2ZXLRbW5Ucm9vdIABAAgAEQAaACMALQAyADcAVwBdAGQAbQB0AIEAgwCFAIcAlgCdAKUAsAC1ALcAuQC7AL0AwgDEAMYAyADKAMwA3wEBAS4BNQFCAVcBYgFuAXsBhwGQAZIBlAGWAZgBmgGfAaABogGnAbIBuwHDAcYBzwHUAe4B8gIFAgoCJwIpAisCMgI1AjcCOQI8Aj4CQAJCAlgCbgJ3Ao0CkgKoAqwCuQK+AtEC1ALnAu4C8wL1AvcC+QL7AwADAgMEAwYDCAMKAw4DFAMZAx8DKAMtAzADOQM+A1MDVgNrA30DgAOFAAAAAAAAAgEAAAAAAAAAbwAAAAAAAAAAAAAAAAAAA4c=';
    // console.log(JSON.stringify(parseArchive(b64)));

    // shapeGroup2.addLayer(rect2.generateObject());
    // group2.addLayer(shapeGroup2.generateObject());
    // symbols2.addLayer(group2.generateObject());


    // shapeGroup.addLayer(rect.generateObject());
    // group.addLayer(shapeGroup.generateObject());
    // group.addLayer(text.generateObject());
    // symbols.addLayer(group.generateObject());
    // pages[0].addLayer(symbols.generateObject());
    // pages[0].addLayer(symbols2.generateObject());



    const doc = new Document(pages);
    const meta = new Meta(pages);

    this.generateFolder(pages, doc, meta);
    this.generateFile();
  }

  private generateFolder (pages: Page[], doc: Document, meta: Meta) {
    try {
      delFolder(Sketch._folder);
      createDir(Sketch._folder);
      createDir(path.join(Sketch._folder, 'pages'));
      createDir(path.join(Sketch._folder, 'previews'));

      writeJSON(path.join(Sketch._folder, 'document'), doc.generateObject());
      writeJSON(path.join(Sketch._folder, 'meta'), meta.generateObject());
      writeJSON(path.join(Sketch._folder, 'user'), {});

      pages.forEach(page => {
        writeJSON(path.join(Sketch._folder, 'pages', page.objectID), page.generateObject())
      })

      const image = 'data:image/png;base64,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';
      let data = image.replace(/^data:image\/png;base64,/, "");
      data  +=  data.replace('+', ' ');
      
      var buff = new Buffer(data,'base64');
      
      const stream = fs.createWriteStream(path.join(Sketch._folder, 'previews', 'preview.png'));
      stream.write(buff);
      stream.on("end", () => {
        stream.end();
      });

    } catch(error) {
      console.error(error);
    }
  }


  private generateFile() {
    const output = fs.createWriteStream(`${Sketch._folder}.sketch`);
    const archive = archiver('zip');
    
    output.on('close',  () => {
        console.log(`\n✅ Sketch file was successfully generated with: ${archive.pointer()} total bytes\n`);
    });

    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });
    
    archive.on('error', (err) =>{
        throw err;
    });
    
    archive.pipe(output);
    archive.directory(path.join(Sketch._folder), false);
    archive.finalize();}

}