import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getCmsPages, saveCmsPages, type CmsPageContent } from "@/lib/cms-pages"

export async function GET() {
  return NextResponse.json({ pages: await getCmsPages() }, {
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  })
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { pages?: CmsPageContent[] }

  if (!Array.isArray(body.pages)) {
    return NextResponse.json({ message: "Format data halaman tidak valid." }, { status: 400 })
  }

  await saveCmsPages(body.pages)

  // Instantly revalidate all public pages cache so CMS edits reflect in real-time
  try {
    revalidatePath("/", "layout")
  } catch (err) {
    console.error("Revalidation error:", err)
  }

  return NextResponse.json({ pages: await getCmsPages() }, {
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  })
}
