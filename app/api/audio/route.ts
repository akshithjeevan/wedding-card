import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    // Search for available audio files in priority order
    const candidateFiles = [
      path.join(process.cwd(), "public", "audio", "bg-music.mp3"),
      path.join(process.cwd(), "public", "audio", "vaibhavam.mp3"),
      path.join(
        process.cwd(),
        "public",
        "audio",
        "Vaibhavam Lyrical Video Walk of the Bride Agam.mp3"
      ),
    ];

    let foundFile: string | null = null;
    for (const f of candidateFiles) {
      if (fs.existsSync(f)) {
        foundFile = f;
        break;
      }
    }

    if (!foundFile) {
      return new NextResponse("Audio file not found", { status: 404 });
    }

    const stat = fs.statSync(foundFile);
    const fileSize = stat.size;

    // Handle range requests (for seeking & mobile browser streaming)
    const range = request.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      const fileStream = fs.createReadStream(foundFile, { start, end });
      let isClosed = false;
      const readableStream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => {
            if (!isClosed) {
              try {
                controller.enqueue(chunk);
              } catch {
                isClosed = true;
                fileStream.destroy();
              }
            }
          });
          fileStream.on("end", () => {
            if (!isClosed) {
              try {
                controller.close();
              } catch {}
              isClosed = true;
            }
          });
          fileStream.on("error", (err) => {
            if (!isClosed) {
              try {
                controller.error(err);
              } catch {}
              isClosed = true;
            }
          });
        },
        cancel() {
          isClosed = true;
          fileStream.destroy();
        },
      });

      return new Response(readableStream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": "audio/mpeg",
        },
      });
    }

    const fileBuffer = fs.readFileSync(foundFile);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": fileSize.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error serving audio route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

