import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "../../store.js";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));
  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList((current) => current.filter((fav) => fav !== objectID));
      setShowAdded(false);
    } else {
      setFavouritesList((current) => [...current, objectID]);
      setShowAdded(true);
    }
  };
  if (error) return <Error statusCode={404} />;

  if (!data) return null;

  const imageUrl = data.primaryImage || null;
  const title = data.title || "N/A";
  const objectDate = data.objectDate || "N/A";
  const classification = data.classification || "N/A";
  const medium = data.medium || "N/A";
  const creditLine = data.creditLine || "N/A";
  const dimensions = data.dimensions || "N/A";
  const artistName = data.artistDisplayName || "N/A";
  const artistWikidata_URL = data.artistWikidata_URL || "";

  return (
    <>
      <Card style={{ width: "18rem" }}>
        {data.primaryImage ? <Card.Img variant="top" src={imageUrl} /> : ""}
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
            <br />
            <strong>Credit Line: </strong>
            {creditLine}
            <br />
            <strong>Dimensions: </strong>
            {dimensions}
            <br />
            <strong>Artist: </strong>
            {artistName}
            <br />
            {artistWikidata_URL && (
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                Wiki
              </a>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <Button
        variant={showAdded ? "primary" : "outline-primary"}
        onClick={favouritesClicked}
      >
        {showAdded ? "+ Favourite (added)" : "+ Favourite"}
      </Button>
    </>
  );
}
