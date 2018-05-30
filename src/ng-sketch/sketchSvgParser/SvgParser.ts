import chalk from 'chalk';
import { DOMParser } from 'xmldom';
import { parseSVG, makeAbsolute } from 'svg-path-parser';
import {  ISvgPoint } from './interfaces/ISvgPoint';
import { SvgPointsToSketch } from './SvgPointsToSketch';

interface IViewBox {
  width: number;
  height: number;
}

export class SvgParser {
  static parse(svg: string, width: number, height: number) {
    return new SvgParser(svg, width, height);
  }

  private _paths: ISvgPoint[][] = [];
  private _viewBox: IViewBox;

  constructor(
    private _svg: string, 
    private _width: number, 
    private _height: number) {
    this.getPaths();
    this.groupPathsToShapes();
    // this.pathToSketchPoints();
  }

  private getPaths() {
    try {
      const svg = new DOMParser().parseFromString(this._svg.trim(), 'application/xml').childNodes[0] as SVGElement;
      if (svg.tagName !== 'svg') {
        throw new Error(chalk`No SVG element provided for parsing!\nyou provided:{grey \n${this._svg}\n\n}`);
      }

      this._viewBox = this.getSize(svg);

      [].slice.call(svg.childNodes).forEach((child: Node) => {
        if (child.nodeName !== 'path') {
          return;
        } 
        const pathData = (child as SVGPathElement).getAttribute('d');
        const path = parseSVG(pathData) as ISvgPoint[];
        this._paths.push(makeAbsolute(path));
      });

    } catch(error) {
      throw new Error(chalk`\n\n🚨 {bgRed Failed to parse the SVG DOM:} 🖼\n${error}`)
    }
  }

  private pathToSketchPoints() {
    
    console.log(this._paths)



    this._paths.forEach(path => {
      const resized = this.resizeCoordinates(path);
      SvgPointsToSketch.parse(resized);
    })
  }

  private groupPathsToShapes() {
    const shapeGroups = [];
    this._paths.forEach(path => {
      
    })
  }

  /**
   * SVGO puts multiple Movetos and Closepaths in one path element.
   * so this function is to ungroup the path element if it is compressed
   * 
   * @param path ISvgPoint[]
   * @returns ISvgPointGroup[]
   */
  private splitPathInGroups(path: ISvgPoint[]) {

  }

  /**
   * Extract the svg Size from the view box and the width and height coordinates
   * and returns { width, height } Object
   *
   * @returns IViewBox{ width: number, height:number }
   * @param svg SVGElement
   */
  private getSize(svg: SVGElement): IViewBox {
    const w = svg.getAttribute('width');
    const h = svg.getAttribute('height');
    const v = svg.getAttribute('viewBox').split(' ');
    if (w.includes('%') && h.includes('%')) {
      return { 
        width: parseInt(v[2], 10), 
        height: parseInt(v[3], 10),
      };
    }
    return { 
      width: parseInt(w, 10), 
      height: parseInt(h, 10),
    };
  }

  /**
   * Takes an Array of points and resizes the coordinates that the max width is 1 and the beginning is 0
   * Sketch SVGs reach from 0 to 1 (like percentage)
   * 
   * @returns ISvgPoint[]
   * @param path ISvgPoint[] Array of Svg Points
   */
  private resizeCoordinates(path: ISvgPoint[]): ISvgPoint[] {
    const resized = [];
    const factor: IViewBox = {...this._viewBox};
    path.forEach(point => {
      const p = {
        ...point,
        x: point.x/factor.width,
        y: point.y/factor.height,
      }
      if (point.x0) { p.x0 = point.x0/factor.width; }
      if (point.x1) { p.x1 = point.x1/factor.width; }
      if (point.x2) { p.x2 = point.x2/factor.width; }
      if (point.y0) { p.y0 = point.y0/factor.height; }
      if (point.y1) { p.y1 = point.y1/factor.height; }
      if (point.y2) { p.y2 = point.y2/factor.height; }

      resized.push(p);
    });
    return resized;
  }
}