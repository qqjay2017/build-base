import SparkMD5 from "spark-md5";

export function computedHash(
  file: File,
  {
    chunkSize = 6 * 1024 * 1024,
  }: {
    chunkSize?: number;
  }
): Promise<{
  hash: string;
  chunkSize: number;
  blobArr: {
    currentChunk: number;
    startPercent?: number;
    endPercent?: number;
    chunkPercent?: number;
    start: number;
    end: number;
    chunks: number;
    blob: Blob;
  }[];
}> {
  return new Promise((resolve, reject) => {
    const blobSlice = File.prototype.slice;
    const FileSize = file.size;
    const SIZE = [
      8,
      16,
      32,
      64,
      128,
      256,
      512,
      1024,
      1024 * 2,
      1024 * 4,
      1024 * 5,
    ];

    let AutoChunkSize = 1024 * 1024;

    const MaxPartNumber = 25;

    for (let i = 0; i < SIZE.length; i++) {
      AutoChunkSize = SIZE[i] * 1024 * 1024;

      if (FileSize / AutoChunkSize <= MaxPartNumber) {
        break;
      }
    }

    // 算出一块多大
    chunkSize = AutoChunkSize;
    console.log(chunkSize / 1024 / 1024, "一块MB");

    // 一共这么可多块
    const chunks = Math.floor(file.size / chunkSize);

    let currentChunk = 0;

    const blobArr = [];

    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      spark.append(e?.target?.result as ArrayBuffer);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        const hash = spark.end();

        resolve({
          hash,
          blobArr,
          chunkSize,
        });
      }
    };

    function loadNext() {
      const start = currentChunk * chunkSize;

      let end = start + chunkSize >= file.size ? file.size : start + chunkSize;

      // 最后一块,拉满
      if (currentChunk === chunks - 1) {
        end = file.size;
      }

      const currentBuffer: Blob = blobSlice.call(file, start, end);
      const startPercent: number = Number(
        ((start / file.size) * 100).toFixed(0)
      );
      const endPercent: number = Number(((end / file.size) * 100).toFixed(0));
      const chunkPercent = parseInt(`${(endPercent - startPercent) / 100}`, 10);

      (blobArr as any).push({
        currentChunk: currentChunk + 1,
        startPercent,
        endPercent,
        chunkPercent,
        start,
        end,
        chunks,
        blob: currentBuffer,
      });

      fileReader.readAsArrayBuffer(currentBuffer);
    }

    loadNext();
  });
}
