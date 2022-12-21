import { Container } from "../common";

export default function Video({data}) {
  return (
    <Container className="py-16">
      <div className="w-10/12 lg:w-9/12">
        <iframe
          className="w-full rounded-3xl h-96 lg:h-[600px]"
          src={data.VideoObject}
          title="Riverside Towing Service near me"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Container>
  );
}
