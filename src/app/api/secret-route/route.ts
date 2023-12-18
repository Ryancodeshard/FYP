export async function GET(request: Request) {
  return Response.json({ secret: 'some secret resource' })
}