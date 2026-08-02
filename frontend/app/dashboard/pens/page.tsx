import { DasshboardNavbar } from "@/components/dashboard/dashbaord-navbar";
import { PensTable } from "@/components/pens/pens-table";
import { env } from "@/lib/env";
import { getPens } from "@/lib/modules/pen/pen.api";

export default async function PensPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const pageSize = env.NEXT_PUBLIC_PAGE_SIZE;

  const { data, error } = await getPens();
  if (error || !data) {
    return <div>Failed to get pens</div>;
  }

  const totalItems = data.length;
  const pageCount = Math.ceil(totalItems / pageSize);
  const pageIndex = currentPage - 1;

  const paginatedPens = data.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize,
  );

  return (
    <>
      <DasshboardNavbar title="Pens" />
      <div className="w-full h-full p-6">
        <PensTable
          pens={paginatedPens}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      </div>
    </>
  );
}
