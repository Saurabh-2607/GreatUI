import { ImageResponse } from "next/og";
import { promises as fs } from "fs";
import { join } from "path";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawTitle = searchParams.get("title") || "Great UI";
    const title = rawTitle.replace(/\s*component$/i, "");
    const breadcrumbs = searchParams.get("breadcrumbs");

    const imagePath = join(process.cwd(), "app/opengraph-image-base.png");
    let base64Image = "";
    try {
      const imageData = await fs.readFile(imagePath);
      base64Image = `data:image/png;base64,${imageData.toString("base64")}`;
    } catch (e) {
      console.error("Failed to read base OG image:", e);
    }

    const fontPath = join(process.cwd(), "public/fonts/TT Commons Medium.ttf");
    let fontData: ArrayBuffer | undefined;
    try {
      const file = await fs.readFile(fontPath);
      fontData = file.buffer.slice(
        file.byteOffset,
        file.byteOffset + file.byteLength,
      );
    } catch (e) {
      console.error("Failed to read font:", e);
    }

    return new ImageResponse(
      <div tw="flex w-full h-full relative overflow-hidden bg-black">
        {base64Image && (
          <img
            src={base64Image}
            alt=""
            tw="absolute top-0 left-0 w-full h-full"
          />
        )}
        <div tw="absolute bottom-[70px] left-[70px] right-[70px] flex flex-col">
          {breadcrumbs && (
            <div
              tw="text-white/60 text-[28px] mb-1"
              style={{ fontFamily: '"TT Commons"', fontWeight: 500 }}
            >
              {breadcrumbs}
            </div>
          )}
          <div
            tw="text-white text-[88px]"
            style={{ fontFamily: '"TT Commons"', fontWeight: 500 }}
          >
            {title}
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: {
          "Cache-Control": "public, max-age=7776000, immutable",
        },
        fonts: fontData
          ? [
              {
                name: "TT Commons",
                data: fontData,
                weight: 500,
                style: "normal",
              },
            ]
          : undefined,
      },
    );
  } catch (e) {
    const error = e as Error;
    console.error(`OG Generation Error: ${error.message}`);

    try {
      const fallbackPath = join(process.cwd(), "app/opengraph-image.png");
      const fallbackImage = await fs.readFile(fallbackPath);
      return new Response(fallbackImage, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=7776000, immutable",
        },
      });
    } catch {
      return new Response(`Failed to generate the image`, {
        status: 500,
      });
    }
  }
}
