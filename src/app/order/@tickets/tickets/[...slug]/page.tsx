export default async function TicketPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket Details for {slug[0]}</h1>
      <p>Details for ticket with slug: {slug[1]}</p>
    </div>
  );
}