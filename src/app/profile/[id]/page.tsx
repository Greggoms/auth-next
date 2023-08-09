type Props = {
  params: { id: string };
};

export default function UserProfile({ params }: Props) {
  return (
    <section className="container mt-5 mb-10">
      <h1>Dynamic Profile: {params.id}</h1>
    </section>
  );
}
