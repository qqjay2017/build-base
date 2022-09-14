import * as mime from 'mime';
import React from 'react';
const dwg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAAXNSR0IArs4c6QAAAOpQTFRFAAAATp3/F3f/G3f/XJ7/Gnn/ZKf/caz/erH/g7j/irn/kr//Fnf/Fnj/Fnj/F3f/F3j/Fnf/F3j/F3f/r6vTzeH/1uj/3+z/5vD/Fnf/Po//7PT/8/j/9/v/Fnf/F3j/GXb8GXn/Gnn/HXv/H3z/IHz/JH//JoD/K4P/LYD6MYf/OIv/O4r9O4z/PI3/QI//QJD/QpH/Tpj/UJn/XqH/X6H/YKL/aaf/aqj/bar/frP/irr/pMr/rLnmsNH/vtn/v9n/wtv/zOH/0uT/1dXr1+P62dns4O3/5/H/6fL/6vP/8ff//v7/////ynrlbAAAAB50Uk5TACctLzI7QE1ca3yMw8TQ0tfa7O3z+Pr8/f7+/v7+WtuJFAAAALFJREFUKM+9z9cOwjAMQNGw9yqzDLMpM1BGKHtTVv7/d4BKSIWmkeCB+3pkW0YIOcKgL+1DuiJvBnLOq0P4QJr1cJBm3BykKRcHadLJxvYTacLOQqlw0DRuYWAXGov98VGMia++wMm2Yo67q2KKvdN0A82RZMAWxni+Um4DQgiuGydLl/VSnfWJzFo7PBdhrJrcLFcB8rXf/tTq8BD+giLbRA1DbAxqaAsIUUOC34r43QFB6VAhS0rPeQAAAABJRU5ErkJggg==';
const excel =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAAXNSR0IArs4c6QAAAW5QTFRFAAAA////Var/QID/M5n/KoD/JJL/GoD/F4v/KoD/JID/Inf/HID/G3n/GHn/IID/HYD/HHv/G4D/Gnv/GXv/GHj/F3j/HXz/HHj/GXz/GHn/F3r/G3f/F3n/GXf/GHn/GHj/GHr/F3j/GHn/Fnn/Fnj/GHn/GHr/F3j/F3r/F3f/Fnf/GXn/F3n/F3j/Fnj/Fnj/GHf/F3f/F3n/GHn/GHj/GHn/F3f/F3j/F3f/Fnj/Fnj/GHj/GHn/GHj/F3j/F3j/F3f/Fnf/Fnf/GHf/F3j/Fnf/GHj/F3f/F3j/F3f/F3j/Fnj/Fnj/F3j/F3f/F3j/F3j/F3j/F3j/F3j/F3j/F3f/Fnf/F3f/F3f/F3f/Fnf/F3j/Fnj/Fnf/F3j/F3j/F3f/F3f/Fnj/Fnf/F3f/F3j/F3f/Fnf/Fnj/F3j/F3f/F3f/F3f/Fnj/Fnf/F3j/F3f/F3j/F3f/F3j/Fnf/Fnj/Fnj/Fnf/Fnf/fCo5hwAAAHl0Uk5TAAEDBAUGBwoLDA4PEhMVGBobHB0fICIjJCkqLC83Pj9AQURKUFFUVldYWlxdY2RmaGltbnR1dnp7fH1/gIGChIaHiYuNkZaXmJmcnZ+hpKWmqKqusLO0trq8vsPIzM3R09TW2dre4OHj5Ojp6+3u7/X29/j5+vv9/uGdAwgAAAE4SURBVCjPY2CgHIipOUbkpIihCzOKqztF5lWCgTkzDDCC5fRyK7GBZLBkPrJQlCUURFeCJVHU28DsssEi6acgz8wmIiKMIVkOoUR1gAQ3QrI4s7LSXcANyPJXVGAW0tRUZ0JImjClFfKJlwJZCd5e3DIuLs6sCMl0FlN3hiCQmQWZGfyqOTnZHEh26vJJy4IttMfi2iQGhnCwZEVpiaBGaWkxJ5JkAAuTLVgyxtGBU9LKyoIFIVkmoaLEmQWSDNFQZxUzMNBHcq0HQ0w4gz7UuyLaQIILIWltVFkpzZQEZHlKSTIycXNzoYVQvKUvkEwNC+VRTkpKZMcWtjlxcXyyvr4+bDakxgpc0g4iGYssWZQPBaUVYEle8+A0uGSMKwwYwtMYr5JZYEoFUFILV+LkkjPWYWSgCgAA73WqYHGXWAsAAAAASUVORK5CYII=';
const jpg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAAXNSR0IArs4c6QAAAKJQTFRFAAAA////Var/KoD/IID/Fnr/Gnn/GXz/GHn/Fnr/Gnj/F3n/F3r/GHf/Fnn/F3j/F3n/F3j/Fnj/Fnn/Fnj/GHf/F3n/F3n/Fnn/F3f/Fnf/GHj/GHn/GHj/F3j/F3j/F3j/F3f/F3j/F3f/F3j/Fnf/Fnj/F3f/F3f/Fnf/F3j/F3f/F3j/F3f/Fnj/Fnf/Fnj/Fnf/Fnj/Fnj/Fnf/Fnf/IZTlDAAAADV0Uk5TAAEDBggXKCkqLjE3Q0tQYmNkZmdoa25wcnp+gIGMjpCmp6jHyM/Q0uHn6Ons7e7w8fL7/f5PCWrhAAAApElEQVQoz8XSuRKCMABF0euKouIuyuIuCm6oyf//mgXD4JiExsLbnhSZvMBfsiMhlcTBBiCS2iIAhB4FANKQFi+j4dmIUxgY0YWJEe9z9/qNt535QkmrsjVhYkF9r8fEAmicdBhb2TO3HyrGzXyE3lPKYzf8wMKgE45rsCgwUGeciRx9zcj9VwmyKsMgw3RdVa26SQFYSqFJLrNTjucrec5Pn/YNKcdIZA6bpF4AAAAASUVORK5CYII=';
const mp4 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAAXNSR0IArs4c6QAAALpQTFRFAAAAgID/Var/KoD/GoD/JID/Inf/IID/GoD/HYD/Gnv/Gnf/GHj/Gnn/F3r/Gnj/Gnv/Gnn/GXn/GHr/Fnr/F3n/Fnj/F3j/F3r/F3f/Fnj/Fnf/F3j/F3j/F3f/Fnj/Fnj/GHj/F3n/GHf/F3n/Fnj/Fnj/F3f/F3j/Fnf/F3j/F3j/Fnf/Fnj/Fnj/Fnf/Fnj/Fnf/Fnj/F3f/F3f/Fnj/Fnf/Fnj/F3f/F3j/Fnj/Fnf/Fnj/Fnf/vbHClQAAAD10Uk5TAAIDBgoODxAUGh0eICgsMTo7PUFFTlFXWFpbXHF5en1/gIWNkqCipaarrrK4wcTFzM/Z3uHm7/H09/v8/dBXvggAAADKSURBVCjPxZLHEoIwFEWfvYEVG4qxImLBEgtq/v+3fIQeh3HhON5FFudM8sIlAH8JY2xTZLFIS1w+S9u216JcIAyOFmUgTNMkKO+rRyiHCKMzD1A/JV5oD5DT36Sqqi1XAvQurmwg5FJRlJovobLlsopQONZJapQwkyd9Rmn40rKsWSilnbNzjDBagisH13gJlFLdk3nD+5Q5QmFmkyaVcMxMn0FDwYVkWS47xd8ixZcQckkI6Yt/pYPwy5egaVo3O4ml0Eb4s0f7Ahq2U6Qokb4qAAAAAElFTkSuQmCC';
const pdf =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAAXNSR0IArs4c6QAAAQJQTFRFAAAAHI7/KoD/H3r/Gnv/GH3/F3f/GXv/Fnn/GXr/GHf/F3j/Fnj/GHn/GHj/F3f/GHj/F3j/Fnn/Fnj/F3j/F3f/F3j/F3j/Fnj/Fnj/Fnf/Fnj/Fnj/Fnj/F3j/Fnj/F3j/F3f/Fnf/F3j/F3j/F3j/Fnf/Fnj/Fnf/Fnj/Fnf/Fnf/GXn/HXv/IH3/RJL/RZP/SpX/Vpz/WZ7/a6n/bqv/cKv/c63/dq//ebH/erL/fLP/frP/gLX/g7f/hrn/i7v/jLz/j77/mMP/msT/nMX/ncX/nsb/pcv/psv/sNH/tdT/0OT/5/H/7fT/8ff/9fn/+/z//P3//f3//f7/////G6HdRgAAACt0Uk5TAAkMGR0rLTQ5R0tiZnR1eICQlKKmvr/AwcLDxM7Q09nd6+/19/n6+/z9/pB0FG8AAADcSURBVCjPY2CgHDBz8grLqmqzogkzsnMLiipqQwCapLymNhKQkZKUlJCQEBfjA0tqo4BQGFDGJ6mGXTJIH49kqBGIUIdLmtnYGSN0GnqHIEsGhgaEOsIkPSxMDbxRJHVcfaGS5lZgB2kgSepa+kElfUIwJN39PVG9giQZHOClB5F0dgCDUE2EpBvcK9YmYIBd0skWDEK14JK+LnBJewswQJJECiG8kjBjtbFImkABVkkHKMAqCQ8EFbCkghZKMpGGAEkBSCJi4uARklSCSrJhTZosXPwicuo4JEkFAFJYarI24VsMAAAAAElFTkSuQmCC';

const ppt =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAMAAABBJv+bAAAAAXNSR0IArs4c6QAAATtQTFRFAAAA////gID/Var/KoD/JJL/IID/GoD/KoD/JID/Inf/IID/Hnj/HID/GHn/IID/H3r/HYD/HXz/Gnz/GXz/GH3/G3f/GXj/GHj/F3v/Fnn/Gnn/GHn/Gnj/GXj/GXn/GHr/F3j/F3r/F3f/GXn/GHf/GHn/F3n/GHf/GHj/F3f/GHn/F3j/F3f/F3f/Fnj/F3n/Fnf/Fnj/GHj/F3j/F3f/F3j/Fnf/F3j/F3f/F3f/F3f/Fnj/Fnj/F3j/F3f/F3j/Fnj/F3f/Fnj/F3f/F3j/F3f/F3j/F3f/F3j/F3j/Fnj/F3j/Fnf/F3f/Fnf/F3j/F3f/Fnf/F3j/F3f/F3j/F3j/F3f/Fnj/Fnf/Fnf/Fnj/Fnf/Fnj/F3f/F3j/F3f/F3f/F3j/Fnf/Fnj/Fnf/Fnj/Fnf/Fnf/RIY1owAAAGh0Uk5TAAECAwYHCAoMDg8QERIVGBkaIycpKy8zNTg5Oz9GSFJWV1haXV5hY2lqbXR5enx9g4mKjI6PkZaZmpyeoKGkp6qstLe6u7y9vr/AxMjP1Njg4eXo6ers7e7v8PHy8/T19vj5+vv8/f6XgWreAAABGElEQVQoz33SZ0/DMBCA4QsNIwlQKHsUym6hrELZtOwNZQQ6aELY/v+/AFuXOI7l8kr+ED3R6RQHgNcxOr9945BVkNP7p3PHjwSTeLF490WENtotyzJNwzDaGBMp94l3pmBheOV/rqrYGDwcR64p2PlNEbIZ5b1cduU6eGGSngnGrwF3s6c1n6foOZG4MAedn8hDmUx6hnE95B9PBxu5Vi6/9En8UW+KVfl+tsbYCTmfhLFw/SxIDNBzH6C3rEW5C3aPXLT1xLDpfzWXsybcGBZTcxDd/U3BhRGsVeBKifNWAtMBPMWVCMNVvNOLNatZ+B1UHKxGsxX8cHFJu6KdpikvHZS+Gwz3axmYzZ8/N2QsnlzYv32P8h9Mu8O8w96kLgAAAABJRU5ErkJggg==';

const text =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAAXNSR0IArs4c6QAAASZQTFRFAAAA////gID/Var/QID/JJL/Inf/IID/HID/G3n/GoD/GHn/F4D/Fnr/IID/G4D/F3z/HHj/HHz/Gnn/GXz/GHn/GH3/G3f/GHn/GHr/F3r/GHr/GHn/GHf/F3f/Fnn/Fnj/GXn/GXj/GHj/GHr/F3j/F3r/F3j/F3f/GXn/GHn/GHj/F3j/F3n/GHj/GHf/GHj/F3f/F3n/F3f/F3n/F3j/GHj/F3f/F3f/Fnj/Fnf/F3n/F3n/F3j/Fnj/GHf/F3j/Fnf/Fnj/Fnj/F3f/F3j/Fnf/Fnj/F3f/Fnj/F3f/F3j/F3j/Fnf/Fnf/F3j/Fnf/Fnf/F3j/F3f/F3f/F3j/Fnj/Fnf/Fnj/Fnj/F3j/F3j/Fnf/Fnj/Fnf/Fnj/Fnf/Fnf/ru6g4wAAAGF0Uk5TAAECAwQHDxASExQVFhcYHCEkJSgpKisvP0FDSUpLT1BRUlNVVldYWVpdX2BiZWprbG1ub3Bxd3h6fX6DhYaKjZCWoKKnqLa5usLJytXY3N3l5+jp6+zu8PHz9fn6+/z9/n1IyhMAAAD8SURBVCjPldLXUgJBFATQnlUkiCKgmBUwgKJiBEygomJcYREMbOD+/084lFosOzNW2Y99Hm5N1wA86Ra5cwl36jSYCzcO0qNFZSWerVh0qkSs2XSswHMg61BBjje82XDoSIrmHK9yDkmRqK7rekeF3xHQtqn78i7HRiL5lMDQiQyNOCuMhkrTuBfRmGSH4dBV+xYVAY0pdhAO7rPiKu682OQ2FtjTYvPIeG92Z7n5d3uWsrxYw+b4SF6LLiBpCU8pYwupni2b4gjX2NEQXeybG98i/lx6BkumdL6HCYDlTcW2n7Xq85/D/xdfZdb8we2OaB/rvz/MFxQyzOsvJke0ajE8l2oAAAAASUVORK5CYII=';

const word =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAblQTFRFAAAAJJL/GoD/GHn/H3r/HYD/GXz/G3r/GHj/F3j/GXr/F3f/GHf/GHn/GHj/GHn/F3j/F3n/GHf/F3n/GHn/F3f/Fnj/Fnf/GHj/F3j/F3f/Fnj/F3f/Fnj/Fnj/Fnj/F3j/F3f/Fnj/Fnf/F3j/F3f/Fnf/F3j/Fnf/F3f/F3f/F3j/F3f/F3j/Fnf/Fnj/Fnf/Fnj/Fnf/Fnf/F3j/GHj/GXn/Gnn/HHr/HXv/Hnv/IX3/I3//KIH/KoL/LYT/M4j/NIj/N4r/O4z/Po7/P4//QJD/QpH/R5P/SpX/TZf/VZz/WZ7/Wp//XaD/YKL/ZKT/ZaX/ZqX/bar/cqz/c63/da7/da//dq//fbP/frP/gbX/hLf/hrj/h7n/irv/jLz/jr3/kb//kr//lcH/lsL/ncX/oMj/ocj/osn/pMr/pcr/psv/qcz/qs3/r9D/ttT/utf/vtn/v9n/v9r/xd3/xt3/yN//yuD/y+H/zOH/z+P/0OP/0eT/0+X/1ef/1uf/2Oj/3Or/4e3/4u7/5vD/6vP/7PT/8Pb/8ff/8vf/9Pn/9fn/9vr/+Pv/+fv/+vz//f3/////Fs1VXwAAADN0Uk5TAAcKFRkaKTA1QkdaXl9gYWJjaXB0en+JjJCeoqest7m9vszP1dba3efr9vf4+fr7/P3+x3IxLwAAAVhJREFUOMut0+VTAkEYx/G1CwOxu1sRfyJ2YHcnKqjYndh6dqDi8xf7Yj24wTuZcfy+3c/M7uzuw9h/5hOkScgoQKzMkleAKi41D7wfIDopSwtJKWp1RHhYWKhKFeLHGGMMbg2ZxSayZcEOiQmFssB6xrsjoUgWiI0ogfV73hMJxe6gshrA3CHvxgV6LXos2NpgolGJHiWh5BvMkBGPNI5NagGw/cr7cIEe6msiWsP5SzmA2V3elQs0kGnQcXkJ+z4A6Ct4YyRoxUM+bCxeLDmayex2UU6wd2JbGSYLdQPA5BbvlIRSEcw/20da6fazFgAMVbwJCRggate/0bX7W+hEYKR3A45pFQAwvsw7kgB0dgH91g4AQE0db0oKFJ67TBYMW3kHSqC+kTdNAjxt4RHoPH3aXMYYYzHJOTopSNOIRfqLo+EdqI5Pz1caHGe+wVGJmUW/gL/1BZEF0os5sSznAAAAAElFTkSuQmCC';

export const fileIconData: Record<string, string> = {
  dwg,
  'image/vnd.dwg': dwg,
  excel,
  'application/vnd.ms-excel': excel,
  xls: excel,
  xlsx: excel,

  jpg,
  'image/jpeg': jpg,
  mp4,
  'video/mp4': mp4,
  pdf,
  'application/pdf': 'pdf',
  ppt,

  'application/vnd.ms-powerpoint': ppt,
  text,
  'text/plain': text,

  word,
  doc: word,
  docx: word,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': word,
  'application/msword': word,
  usually:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAnlJREFUSEu9lU9IFHEUxz9vdmlbkbCcne51rU5BWCSF4iGioEOIGAZFB/GUOmuX9BLtrl47qB1C6hBBSOYlC4I6FASdsiArunSYmd0WssWcdl7MorL5d9eN3u8w8OP9vp/3Z3hPWLL6a5qoC3gGHABk+X6zr0KAcMlNyZ2N/FaEzAHtNZSRSoTLfVQpKnR5Gbm33tsVgGXrIMJQNQBVbovQrrATocNNyYPV72sCAF1BwFfDYFqVHQLnnYxMlkNqBjhpmTBtPWkIj4FoAOe8tEwvQ2oCaECPOyy3QrFGW1siMIWUzlknJU/C+9oA8JY4ze6QzIdie/q1LWowiYKTkbqaAUtl8FA+I6FsyfYDppOWUvA1ZbDZH7ctgMJ3gffAUYRZlBcohxCaVsO2A8guQks0giMBN91XXOa5/A6FLVszCP3lkGoB2cWA1qjwyRA6nDjjiQLdCDcUOn3hZUzJbReQ1YBWLRO3CpwpwjdDuA5MLAozMSVb3tPKMlByatCqAXPhKPDijJsFTovP7IJBPh6h2cnIw4StKRGSVWWg4AcGx40Y76RAp1PHmPmTUxLhw4JPPhalyUvLlDWg/Sjp1RN4ywxUue9mpN2ytdv5wmhiH20EzC1EycWKHPMy8shKah9K2OA1431LQKAMeXmGzd20EOGN+NRXKh6WaksAcNdJy4WErT1unlGzgQRwuBS5rb3A8HqRL/ehEsAvfI5E5/noN3Ii8MlmR+S1ldSrhItpnbJU1eQl55wqg0GEp1qkISJcEbhYyUqtJINqltsa3/8PMJPaZ4SN+wem8MNNy66/xvXePrXUYAbhYCU13igOhXkVer2UjIU+fwD8uzAopPUWUgAAAABJRU5ErkJggg==',
};
// ...
export function getFileType(fileName: string): string {
  if (!fileName) {
    return 'usually';
  }

  const fileNameSplit = fileName.split('.');
  const fileNameEx = fileNameSplit[fileNameSplit.length - 1].toLowerCase();

  if (fileIconData[fileNameEx]) {
    return fileNameEx;
  }

  const mimeType = mime.getType(fileNameEx);

  if (!mimeType) {
    return 'usually';
  }

  // 图片都走jpg
  if (mimeType.startsWith('image')) {
    return 'jpg';
  }

  // 视频都走mp4
  if (mimeType.startsWith('video')) {
    return 'mp4';
  }

  // 文字类都走text
  if (mimeType.startsWith('text')) {
    return 'text';
  }

  if (fileIconData[mimeType]) {
    return mimeType;
  }

  const mimeExtension = mime.getExtension(mimeType);

  if (!mimeExtension) {
    return 'usually';
  }

  if (fileIconData[mimeExtension]) {
    return mimeExtension;
  }

  return 'usually';
}

function FileTypeIcon({ fileName }: { fileName: string }) {
  if (!fileName) {
    return null;
  }
  const type = getFileType(fileName);
  const src = fileIconData[type];
  return (
    <img
      className="img"
      style={{ width: '16px', height: '16px', marginRight: '4px' }}
      src={src}
      alt=""
    />
  );
}

export default FileTypeIcon;
