// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler (req : NextApiRequest, res: NextApiResponse) {
//   fetch(req.query.image as string)
//   .then((response) => response.blob())
//   .then(async (blob) => {
//     const buffer = Buffer.from(await blob.arrayBuffer())
//     res.status(200).send(buffer)
//   })
// }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const image = searchParams.get("image");
  const res = await fetch(image as string);
  const product = await res.blob();
  const buffer = Buffer.from(await product.arrayBuffer());

  return new Response(buffer);
}
