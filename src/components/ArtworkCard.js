import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  if (error) return <Error statusCode={404} />;

  if (!data) return null;

  const imageUrl =
    data.primaryImageSmall ||
    "https://placehold.co/375?text=Image+Not+Avaliable&font=roboto";
  const title = data.title || "N/A";
  const objectDate = data.objectDate || "N/A";
  const classification = data.classification || "N/A";
  const medium = data.medium || "N/A";
  console.log(title, objectDate, classification, medium);

  return (
    <>
      <Card>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {objectDate}
            <br />
            <strong>Classification: </strong>
            {classification}
            <br />
            <strong>Medium: </strong>
            {medium}
            <br />
            <Link href={`/artwork/${objectID}`} passHref legacyBehaviour>
              <Button variant="primary">{objectID}</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
